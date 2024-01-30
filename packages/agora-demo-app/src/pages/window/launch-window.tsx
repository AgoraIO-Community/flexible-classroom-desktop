import { useEduSdk } from '@app/hooks/useClassroomSdk';
import { GlobalStoreContext } from '@app/stores';
import { FcrMultiThemeMode } from 'agora-common-libs';
import type { EduRoomTypeEnum } from 'agora-edu-core';
import { observer } from 'mobx-react';
import { useContext, useEffect, useRef } from 'react';

export const LaunchWindowPage = observer(() => {
  const domRef = useRef<HTMLDivElement>(null);
  const { theme } = useContext(GlobalStoreContext);
  const { ready, sdk } = useEduSdk();

  useEffect(() => {
    if (ready && sdk) {
      sdk.launchWindow(domRef.current!, {
        windowID: window.__launchWindowID as any,
        language: window.__launchLanguage as any,
        args: window.__launchArgs,
        roomType: (parseInt(window.__launchRoomType) as EduRoomTypeEnum) || 0,
        uiMode: (window.__launchUIMode as FcrMultiThemeMode) || theme,
      });
    }
  }, [ready, sdk]);

  return <div ref={domRef} id="app" className="fcr-w-screen fcr-h-screen" />;
});
