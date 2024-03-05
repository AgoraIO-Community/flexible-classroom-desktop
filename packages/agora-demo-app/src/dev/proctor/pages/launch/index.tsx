import { GlobalStoreContext } from '@app/stores';
import type { AgoraEduClassroomEvent } from 'agora-edu-core';
import isEmpty from 'lodash/isEmpty';
import { observer } from 'mobx-react';
import { useContext, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useProctorSdk } from '@app/hooks/useProctorSdk';
import { useProctorWidgets } from '@app/hooks/useProctorWidgets';

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

export const LaunchPage = observer(() => {
  const homeStore = useContext(GlobalStoreContext);
  const appRef = useRef<HTMLDivElement | null>(null);
  const history = useHistory();
  const launchOption = homeStore.launchOption;

  const { ready: widgetsReady, widgets } = useProctorWidgets(['FcrWebviewWidget']);
  const { ready: sdkReady, sdk } = useProctorSdk();

  useEffect(() => {
    if (isEmpty(launchOption)) {
      console.log('Invalid launch option, nav to /');
      history.push('/');
      return;
    }

    if (sdkReady && widgetsReady && sdk && appRef.current) {
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

      const unmount = sdk.launch(appRef.current, {
        ...(launchOption as any),
        language: homeStore.language,
        widgets,
        listener: (evt: AgoraEduClassroomEvent, type) => {
          console.log('launch#listener ', evt);
          if (evt === 2) {
            history.push(`/?reason=${type}`);
          }
        },
      });

      return unmount;
    }
  }, [sdkReady, widgetsReady]);

  return <div ref={appRef} className="fcr-bg-background fcr-w-full fcr-h-full"></div>;
});
