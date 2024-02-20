import { GlobalStoreContext, UserStoreContext } from '@app/stores';
import type { AgoraEduClassroomEvent, EduRoleTypeEnum } from 'agora-edu-core';
import isEmpty from 'lodash/isEmpty';
import { observer } from 'mobx-react';
import { useContext, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import courseWareList from './courseware-list';
import { REACT_APP_RECORDING_LINK_PREFIX, getAssetURL, shareLink } from '@app/utils';
import { useClassroomWidgets, useSceneWidgets } from '@app/hooks/useWidgets';
import { SceneType } from '@app/type';
import logo from '@app/assets/favicon.png';
import { useEduSdk, useFcrUIScene } from '@app/hooks/useSdk';
import { useQuitConfirm } from '@app/hooks/useQuitConfirm';

export const LaunchPage = observer(() => {
  const homeStore = useContext(GlobalStoreContext);
  const history = useHistory();
  const launchOption = homeStore.launchOption;

  if (isEmpty(launchOption)) {
    console.log('Invalid launch option, nav to /');
    history.push('/');
    return null;
  }

  //@ts-ignore
  if (window.__netlessJavaScriptLoader) {
    console.log('Whiteboard widget need a full page reload to work');
    window.location.reload();
    return null;
  }

  useQuitConfirm();

  const { sceneType, platform } = launchOption;

  if (sceneType === SceneType.Scene) {
    if (platform === 'H5') {
      return <AgoraClassroomApp />;
    } else {
      return <FcrUISceneApp />;
    }
  }
  return <FcrUISceneApp />;
});

export const AgoraClassroomApp = () => {
  const homeStore = useContext(GlobalStoreContext);
  const userStore = useContext(UserStoreContext);
  const history = useHistory();
  const launchOption = homeStore.launchOption;
  const appRef = useRef<HTMLDivElement | null>(null);

  const { ready: widgetsReady, widgets } = useClassroomWidgets([
    'AgoraCountdown',
    'AgoraHXChatWidget',
    'AgoraPolling',
    'FcrBoardWidget',
    'FcrWatermarkWidget',
  ]);

  const { ready: sdkReady, sdk } = useEduSdk();

  useEffect(() => {
    if (widgetsReady && sdkReady && sdk && appRef.current) {
      sdk.setParameters(
        JSON.stringify({
          host: homeStore.launchOption.sdkDomain,
          uiConfigs: homeStore.launchOption.scenes,
          themes: homeStore.launchOption.themes,
        }),
      );

      sdk.config({
        appId: launchOption.appId ?? '',
        region: homeStore.region ?? 'CN',
      });

      const shareUrl = shareLink.generateUrl({
        roomId: launchOption.roomUuid ?? '',
        owner: userStore.nickName,
        region: homeStore.region,
        role: 2,
      });

      const unmount = sdk.launch(appRef.current, {
        ...(launchOption as any),
        widgets,
        // TODO:  Here you need to pass in the address of the recording page posted by the developer himself
        shareUrl,
        uiMode: homeStore.theme,
        language: homeStore.language,
        listener: (evt: AgoraEduClassroomEvent, type) => {
          console.log('launch#listener ', evt);
          if (evt === 2) {
            homeStore.blockQuitUnregister();
            history.push(`${launchOption.returnToPath ?? '/'}?reason=${type}`);
          }
        },
      });

      return unmount;
    }
  }, [widgetsReady, sdkReady]);

  return <div ref={appRef} id="app" className="fcr-w-screen fcr-h-screen"></div>;
};

export const FcrUISceneApp = () => {
  const homeStore = useContext(GlobalStoreContext);
  const userStore = useContext(UserStoreContext);
  const launchOption = homeStore.launchOption;
  const appRef = useRef<HTMLDivElement | null>(null);
  const history = useHistory();
  const { ready: widgetsReady, widgets } = useSceneWidgets([
    'FcrBoardWidget',
    'FcrPolling',
    'AgoraChatroomWidget',
    'FcrWebviewWidget',
    'FcrStreamMediaPlayerWidget',
    'FcrCountdownWidget',
    'FcrPopupQuizWidget',
  ]);

  const { ready: sdkReady, sdk } = useFcrUIScene();

  useEffect(() => {
    if (widgetsReady && sdkReady && sdk && appRef.current) {
      const shareUrl = shareLink.generateUrl({
        roomId: launchOption.roomUuid ?? '',
        owner: userStore.nickName,
        region: homeStore.region,
        role: 2,
      });
      sdk.setParameters(
        JSON.stringify({
          shareUrl,
          logo,
          host: homeStore.launchOption.sdkDomain,
          uiConfigs: homeStore.launchOption.scenes,
          themes: homeStore.launchOption.themes,
        }),
      );

      const unmount = sdk.launch(
        appRef.current,
        {
          ...(launchOption as any),
          widgets,
          coursewareList: courseWareList,
          virtualBackgroundImages,
          virtualBackgroundVideos,
          uiMode: homeStore.theme,
          language: homeStore.language,
          token: launchOption.rtmToken,
          devicePretest: true,
          recordUrl: `${REACT_APP_RECORDING_LINK_PREFIX}/scene_record_page.html`,
        },
        () => {
          // success
        },
        (err: Error) => {
          // failure
        },
        (type) => {
          homeStore.blockQuitUnregister();
          console.log('push location');
          history.push(`${launchOption.returnToPath ?? '/'}?reason=${type}`);
        },
      );
      return unmount;
    }
  }, [widgetsReady, sdkReady]);

  return <div ref={appRef} id="app" className="fcr-w-screen fcr-h-screen"></div>;
};

export const assetURLs = {
  // virtual background assets
  virtualBackground1: 'effect/default1.jpg',
  virtualBackground2: 'effect/default2.jpg',
  virtualBackground3: 'effect/default3.jpg',
  virtualBackground4: 'effect/default4.jpg',
  virtualBackground5: 'effect/default5.jpg',
  virtualBackground6: 'effect/default6.jpg',
  virtualBackground7: 'effect/default7.jpg',
  virtualBackground8: 'effect/default8.mp4',
  virtualBackground9: 'effect/default9.mp4',
};

const virtualBackgroundImages = [
  getAssetURL(assetURLs.virtualBackground1),
  getAssetURL(assetURLs.virtualBackground2),
  getAssetURL(assetURLs.virtualBackground3),
  getAssetURL(assetURLs.virtualBackground4),
  getAssetURL(assetURLs.virtualBackground5),
  getAssetURL(assetURLs.virtualBackground6),
  getAssetURL(assetURLs.virtualBackground7),
];
const virtualBackgroundVideos = [
  getAssetURL(assetURLs.virtualBackground8),
  getAssetURL(assetURLs.virtualBackground9),
];
