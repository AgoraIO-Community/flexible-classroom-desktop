import { GlobalStoreContext } from '@app/stores';
import { getAssetURL } from '@app/utils/url';
import { AgoraOnlineclassSDK } from 'agora-onlineclass-sdk';
import { isEmpty } from 'lodash';
import { observer } from 'mobx-react';
import { useContext, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '@app/assets/favicon.png';
import { AgoraEduClassroomEvent } from 'agora-edu-core';
import { useWidgets } from '@app/hooks/useWidgets';

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
  const { launchOption } = useContext(GlobalStoreContext);
  const appRef = useRef<HTMLDivElement | null>(null);
  const history = useHistory();

  const { widgets, ready } = useWidgets(['FcrPolling', 'FcrBoardWidgetV2', 'AgoraHXChatWidgetV2']);

  useEffect(() => {
    if (isEmpty(launchOption)) {
      console.log('Invalid launch option, nav to /');
      history.push('/');
      return;
    }

    if (!ready) {
      return;
    }

    if (appRef.current) {
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

      AgoraOnlineclassSDK.setParameters(JSON.stringify({ logo, host: launchOption.sdkDomain }));

      const unmount = AgoraOnlineclassSDK.launch(appRef.current, {
        userUuid: launchOption.userUuid,
        userName: launchOption.userName,
        roomUuid: launchOption.roomUuid,
        roleType: launchOption.roleType,
        language: launchOption.language,
        token: launchOption.rtmToken,
        appId: launchOption.appId,
        region: launchOption.region,
        roomName: launchOption.roomName,
        roomType: launchOption.roomType,
        startTime: launchOption.startTime,
        duration: launchOption.duration,
        mediaOptions: {
          cameraEncoderConfiguration: { width: 735, height: 417, frameRate: 15, bitrate: 800 },
        },
        devicePretest: true,
        // devicePretest: false,
        virtualBackgroundImages,
        virtualBackgroundVideos,
        widgets,
        recordUrl:
          'https://agora-adc-artifacts.s3.cn-north-1.amazonaws.com.cn/apaas/record/dev/onlineclass/1.0.0/onlineclass_record_page.html',
        listener: (evt: AgoraEduClassroomEvent, type) => {
          console.log('launch#listener ', evt);
          if (evt === AgoraEduClassroomEvent.Destroyed) {
            history.push(`/?reason=${type}`);
          }
        },
      });
      return unmount;
    }
  }, [ready]);

  return <div ref={appRef} className="fcr-bg-background fcr-w-full fcr-h-full" />;
});
