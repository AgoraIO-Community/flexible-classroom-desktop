import { GlobalStoreContext } from '@app/stores';
import { AgoraEduSDK } from 'agora-classroom-sdk';
import { AgoraProctorSDK } from 'agora-proctor-sdk';
import { AgoraEduClassroomEvent, EduRoomTypeEnum } from 'agora-edu-core';
import { isEmpty } from 'lodash';
import { observer } from 'mobx-react';
import { useContext, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import courseWareList from './courseware-list';
import { getAssetURL } from '@app/utils';

declare const CLASSROOM_SDK_VERSION: string;

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

  useEffect(() => {
    if (isEmpty(launchOption)) {
      history.push('/');
      return;
    }

    if (appRef.current) {
      const roomType = homeStore.launchOption.roomType;
      let unmount = () => {};
      if (roomType === EduRoomTypeEnum.RoomProctor) {
        AgoraProctorSDK.setParameters(
          JSON.stringify({
            host: homeStore.launchOption.sdkDomain,
            uiConfigs: homeStore.launchOption.scenes,
            themes: homeStore.launchOption.themes,
          }),
        );

        AgoraProctorSDK.config({
          appId: launchOption.appId,
          region: launchOption.region ?? 'CN',
        });

        unmount = AgoraProctorSDK.launch(appRef.current, {
          ...launchOption,
          widgets: {},
          listener: (evt: AgoraEduClassroomEvent, type) => {
            console.log('launch#listener ', evt);
            if (evt === AgoraEduClassroomEvent.Destroyed) {
              history.push(`/?reason=${type}`);
            }
          },
        });
      } else {
        AgoraEduSDK.setParameters(
          JSON.stringify({
            host: homeStore.launchOption.sdkDomain,
            uiConfigs: homeStore.launchOption.scenes,
            themes: homeStore.launchOption.themes,
          }),
        );

        AgoraEduSDK.config({
          appId: launchOption.appId,
          region: launchOption.region ?? 'CN',
        });

        const recordUrl = `https://solutions-apaas.agora.io/apaas/record/dev/${CLASSROOM_SDK_VERSION}_feat_pushing_to_cdn/record_page.html`;
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

        unmount = AgoraEduSDK.launch(appRef.current, {
          ...launchOption,
          // TODO:  Here you need to pass in the address of the recording page posted by the developer himself
          recordUrl,
          courseWareList,
          uiMode: homeStore.theme,
          virtualBackgroundImages,
          virtualBackgroundVideos,
          listener: (evt: AgoraEduClassroomEvent, type) => {
            console.log('launch#listener ', evt);
            if (evt === AgoraEduClassroomEvent.Destroyed) {
              history.push(`/?reason=${type}`);
            }
          },
        });
      }

      return unmount;
    }
  }, []);

  return <div ref={appRef} id="app" className="bg-background w-full h-full"></div>;
});
