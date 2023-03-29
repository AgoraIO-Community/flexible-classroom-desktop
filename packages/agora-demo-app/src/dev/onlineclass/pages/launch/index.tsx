import { GlobalStoreContext } from '@app/stores';
import { getAssetURL } from '@app/utils/url';
import { AgoraOnlineclassSDK } from 'agora-onlineclass-sdk';
import { isEmpty } from 'lodash';
import { observer } from 'mobx-react';
import { useContext, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

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

  useEffect(() => {
    if (isEmpty(launchOption)) {
      console.log('Invalid launch option, nav to /');
      history.push('/');
      return;
    }

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

    if (appRef.current) {
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
        devicePretest: true,
        virtualBackgroundImages,
        virtualBackgroundVideos,
      });
      return unmount;
    }
  }, []);

  return <div ref={appRef} className="bg-background w-full h-full" />;
});
