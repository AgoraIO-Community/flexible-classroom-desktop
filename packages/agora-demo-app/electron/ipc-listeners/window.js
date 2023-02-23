const electron = require('electron');
const { mainWindow, startUrl } = require('../main');
const IPCDelegate = require('./base');

const { URLSearchParams } = require('url');
const { Mutex } = require('./mutex');

const windowStateMap = {};
const windowMap = {};
const windowMutex = new Mutex();

function getWindow(id) {
  return windowMap[id];
}

function createBrowserWindow(windowID, queryStr, options) {
  console.log('start create window', windowID);
  const display =
    electron.screen.getAllDisplays()[options.openAtScreenIndex] ||
    electron.screen.getPrimaryDisplay();

  const offsetX = (display.workAreaSize.width - options.width) / 2;
  const offsetY = (display.workAreaSize.height - options.height) / 2;
  const x = display.bounds.x + offsetX;
  const y = display.bounds.y + offsetY;

  const allowRendererProcessReuse = options.allowRendererProcessReuse ?? true;

  if (allowRendererProcessReuse) {
    electron.app.allowRendererProcessReuse = true;
  }

  const window = new electron.BrowserWindow({
    x: options.x ?? x,
    y: options.y ?? y,
    width: options.width,
    height: options.height,
    backgroundColor: options.backgroundColor,
    transparent: options.transparent ?? false,
    alwaysOnTop: options.alwaysOnTop ?? false,
    frame: options.frame ?? true,
    resizable: options.resizable ?? true,
    fullscreen: options.fullscreen ?? false, // Whether the window should show in fullscreen. When explicitly set to false the fullscreen button will be hidden or disabled on macOS. Default is false.
    show: windowStateMap[windowID] ? true : options.show ?? true,
    hasShadow: options.hasShadow ?? true,
    focusable: options.focusable ?? true,
    minWidth: options.minWidth,
    minHeight: options.minHeight,
    maxWidth: options.maxWidth,
    maxHeight: options.maxHeight,
    // useContentSize: options.useContentSize ?? false,
    // center: options.center ?? true,
    webPreferences: {
      autoplayPolicy: 'no-user-gesture-required',
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
      webviewTag: true,
      enableRemoteModule: true,
      nativeWindowOpen: true,
      backgroundThrottling: false,
    },
  });

  delete windowStateMap[windowID];

  if (options.preventClose) {
    window.on('close', (e) => {
      e.preventDefault();
      console.log(`notify alive windows that the user clicked [${windowID}] close`);

      // notify alive windows that the user clicked window close
      Object.entries({ main: mainWindow.current, ...windowMap }).forEach(([, window]) => {
        if (window && !window.isDestroyed()) {
          window.webContents.send('browser-window-message', {
            type: 'BrowserWindowClose',
            payload: windowID,
          });
        }
      });
    });
  }

  window.on('closed', () => {
    delete windowMap[windowID];
    console.log(`notify alive windows that [${windowID}] has just closed`);
    // notify alive windows that there's a window has just closed
    Object.entries({ main: mainWindow.current, ...windowMap }).forEach(([, window]) => {
      if (window && !window.isDestroyed()) {
        window.webContents.send('browser-window-message', {
          type: 'BrowserWindowClosed',
          payload: windowID,
        });
      }
    });
  });

  windowMap[windowID] = window;

  return new Promise((r) => {
    window.loadURL(`${startUrl}?${queryStr}`).finally(() => {
      // restore setting
      if (allowRendererProcessReuse) {
        electron.app.allowRendererProcessReuse = false;
      }
      console.log('window created', windowID);
      r();
    });
  });
}

function transmit(channel) {
  electron.ipcMain.on(channel, (event, toWindowID, payload) => {
    const toWindow = getWindow(toWindowID);
    if (toWindow) {
      toWindow.webContents.send(channel, payload);
    }
  });
}

function addListeners() {
  const delegate = new IPCDelegate();

  delegate.on(
    'open-browser-window',
    (event, windowID, args, options, language, uiMode, roomType) => {
      const window = getWindow(windowID);

      if (!window) {
        const params = new URLSearchParams({ id: windowID, language, uiMode, roomType });
        if (args) {
          params.append('args', args);
        }
        windowMutex.dispatch(() => createBrowserWindow(windowID, params.toString(), options));
      } else {
        console.log(`window with ID [${windowID}] exists`);
      }
    },
  );

  delegate.on('show-browser-window', (event, windowID) => {
    const window = getWindow(windowID);
    windowStateMap[windowID] = true;
    if (window) {
      window.show();
    } else {
      console.log(`window with ID [${windowID}] not exist`);
    }
  });

  delegate.on('hide-browser-window', (event, windowID) => {
    const window = getWindow(windowID);
    windowStateMap[windowID] = false;
    if (window) {
      window.hide();
    } else {
      console.log(`window with ID [${windowID}] not exist`);
    }
  });

  delegate.on('close-browser-window', (event, windowID) => {
    const window = getWindow(windowID);

    if (window) {
      window.destroy();
    } else {
      console.log(`window with ID [${windowID}] not exist`);
    }
  });

  delegate.on('browser-window-message', (event, payload) => {
    const { channel, to = 'main', args } = payload;
    const from =
      Object.keys(windowMap).find((winKey) => windowMap[winKey].webContents === event.sender) ||
      'main';
    let toWindow = windowMap[to];

    if (to === 'main') {
      toWindow = mainWindow.current;
    }

    if (toWindow) {
      console.log(
        `send [${channel}] message from [${from}] to [${to}] with arguments ${JSON.stringify(
          args,
        )}`,
      );
      toWindow.webContents.send(channel, args);
    } else {
      console.log(`cannot find window with id [${to}], skip`);
    }
  });

  delegate.on('update-browser-window', (event, windowID, bounds) => {
    const window = getWindow(windowID);
    if (window) {
      const { x, y, width, height } = bounds;
      const passIn = {};
      if (x) {
        passIn.x = x;
      }
      if (y) {
        passIn.y = y;
      }
      if (width) {
        passIn.width = width;
      }
      if (height) {
        passIn.height = height;
      }
      window.setBounds(passIn);
      console.log(`set window [${windowID}] bounds to`, bounds);
    } else {
      console.log(`window with ID [${windowID}] not exist`);
    }
  });
  delegate.on('move-window-to-target-screen', (event, windowID, screenId, options) => {
    const window = getWindow(windowID);
    if (window) {
      const display =
        electron.screen.getAllDisplays().find((i) => i.id === screenId) ||
        electron.screen.getPrimaryDisplay();

      const offsetX = (display.workAreaSize.width - options.width) / 2;
      const offsetY = (display.workAreaSize.height - options.height) / 2;
      const x = options.x ?? display.bounds.x + offsetX;
      const y = options.y ?? display.bounds.y;
      window.setBounds({ x: parseInt(x), y: parseInt(y) });

      console.log(`set window [${windowID}] bounds to screen`, screenId);
    } else {
      console.log(`window with ID [${windowID}] not exist`);
    }
  });

  delegate.on('move-window-align-to-window', (event, windowID, windowIDAlignTo, options) => {
    // left, right, top, bottom
    const vertical = options.vertical ?? 'center';
    // start, center, end
    const horizontal = options.horizontal ?? 'center';
    const gap = options.gap ?? 10;

    const window = getWindow(windowID);
    let windowAlignTo = getWindow(windowIDAlignTo);

    if (windowIDAlignTo === 'main') {
      windowAlignTo = mainWindow.current;
    }

    if (window && windowAlignTo) {
      const windowBounds = window.getBounds();
      const windowAlignToBounds = windowAlignTo.getBounds();

      if (vertical === 'top' || vertical === 'bottom') {
        let destY =
        vertical === 'top'
            ? windowAlignToBounds.y - windowBounds.height - gap
            : windowAlignToBounds.y + windowAlignToBounds.height + gap;
        let destX = 0;
        if (horizontal === 'start') {
          destX = windowAlignToBounds.x;
        } else if (horizontal === 'end') {
          destX = windowAlignToBounds.x + (windowAlignToBounds.width - windowBounds.width);
        } /** otherwise center */ else {
          destX = windowAlignToBounds.x + (windowAlignToBounds.width - windowBounds.width) / 2;
        }
        window.setBounds({ x: destX, y: destY });
      } else if (vertical === 'left' || vertical === 'right') {
        let destX =
        vertical === 'left'
            ? windowAlignToBounds.x - windowBounds.width - gap
            : windowAlignToBounds.x + windowAlignToBounds.width + gap;
        let destY = 0;
        if (horizontal === 'start') {
          destY = windowAlignToBounds.y;
        } else if (horizontal === 'end') {
          destY = windowAlignToBounds.y + (windowAlignToBounds.height - windowBounds.height);
        } /** otherwise center */ else {
          destY = windowAlignToBounds.y + (windowAlignToBounds.height - windowBounds.height) / 2;
        }
        window.setBounds({ x: destX, y: destY });
      }
    }
  });

  transmit('rtc-raw-data-transmit');

  mainWindow.current.on('closed', () => {
    Object.keys(windowMap).forEach((k) => {
      windowMap[k].destroy();
    });
  });
}

electron.app.on('ready', () => {
  addListeners();
});
