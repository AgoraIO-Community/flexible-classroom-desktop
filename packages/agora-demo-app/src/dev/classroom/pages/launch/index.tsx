import { GlobalStoreContext } from '@app/stores';
import type { AgoraEduClassroomEvent } from 'agora-edu-core';
import isEmpty from 'lodash/isEmpty';
import { observer } from 'mobx-react';
import { useContext, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import courseWareList from './courseware-list';
import { getAssetURL, isH5Browser, REACT_APP_RECORDING_LINK_PREFIX } from '@app/utils';
import { useClassroomWidgets } from '@app/hooks/useClassroomWidgets';
import { useEduSdk } from '@app/hooks/useClassroomSdk';

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

  const { ready: widgetsReady, widgets } = useClassroomWidgets([
    'AgoraCountdown',
    'AgoraHXChatWidget',
    'AgoraPolling',
    'AgoraSelector',
    'FcrBoardWidget',
    'FcrStreamMediaPlayerWidget',
    'FcrWatermarkWidget',
    'FcrWebviewWidget',
  ]);

  const { ready: sdkReady, sdk } = useEduSdk();

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

      const recordUrl = `${REACT_APP_RECORDING_LINK_PREFIX}/record_page.html`;
      // const recordUrl = `https://agora-adc-artifacts.s3.cn-north-1.amazonaws.com.cn/apaas/record/dev/${CLASSROOM_SDK_VERSION}/record_page.html`;

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

      const unmount = sdk.launch(appRef.current, {
        ...(launchOption as any),
        // TODO:  Here you need to pass in the address of the recording page posted by the developer himself
        recordUrl,
        courseWareList,
        uiMode: homeStore.theme,
        language: homeStore.language,
        virtualBackgroundImages,
        virtualBackgroundVideos,
        widgets,
        platform: isH5Browser() ? 'H5' : 'PC',
        listener: (evt: AgoraEduClassroomEvent, type: string) => {
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
