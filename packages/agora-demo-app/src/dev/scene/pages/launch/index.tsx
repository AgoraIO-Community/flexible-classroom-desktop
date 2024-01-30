import { GlobalStoreContext } from '@app/stores';
import { getAssetURL } from '@app/utils/url';
import isEmpty from 'lodash/isEmpty';
import { observer } from 'mobx-react';
import { useContext, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '@app/assets/favicon.png';
import { useSceneWidgets } from '@app/hooks/useSceneWidgets';
import { useFcrUIScene } from '@app/hooks/useSceneSdk';
import { coursewareList } from './courseware-list';

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
  const { launchOption, region, language } = useContext(GlobalStoreContext);
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
    if (isEmpty(launchOption)) {
      console.log('Invalid launch option, nav to /');
      history.push('/');
      return;
    }

    if (sdkReady && widgetsReady && sdk && appRef.current) {
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
      const shareUrl = `${location.origin}${location.pathname}?roomName=${launchOption.roomName}&roomType=${launchOption.sceneType}&region=${launchOption.region}&language=${launchOption.language}&roleType=2#/share`;

      sdk.setParameters(
        JSON.stringify({ logo, shareUrl, host: launchOption.sdkDomain, fastMode: true }),
      );

      const unmount = sdk.launch(
        appRef.current,
        {
          userUuid: launchOption.userUuid ?? '',
          userName: launchOption.userName ?? '',
          roomUuid: launchOption.roomUuid ?? '',
          roleType: launchOption.roleType ?? 0,
          token: launchOption.rtmToken ?? '',
          appId: launchOption.appId ?? '',
          region: region,
          language: language,
          roomName: launchOption.roomName ?? '',
          roomType: launchOption.roomType ?? 0,
          startTime: launchOption.startTime,
          duration: launchOption.duration,
          devicePretest: true,
          // devicePretest: false,
          virtualBackgroundImages,
          virtualBackgroundVideos,
          widgets,
          coursewareList,
          recordUrl:
            'https://agora-adc-artifacts.s3.cn-north-1.amazonaws.com.cn/apaas/record/dev/onlineclass/1.0.0/onlineclass_record_page.html',
        },
        () => {
          // success
        },
        (err: Error) => {
          // failure
        },
        (type) => {
          history.push(`/?reason=${type}`);
        },
      );
      return unmount;
    }
  }, [sdkReady, widgetsReady]);

  return <div ref={appRef} className="fcr-bg-background fcr-w-full fcr-h-full" />;
});
