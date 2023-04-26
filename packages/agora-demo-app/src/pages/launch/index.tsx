import { GlobalStoreContext } from '@app/stores';
import { AgoraEduClassroomEvent, EduRoomTypeEnum } from 'agora-edu-core';
import { AgoraEduSDK } from 'agora-classroom-sdk';
// import { AgoraProctorSDK } from 'agora-proctor-sdk';
import { AgoraOnlineclassSDK } from 'agora-onlineclass-sdk';
import { isEmpty } from 'lodash';
import { observer } from 'mobx-react';
import { useContext, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import courseWareList from './courseware-list';
import { getAssetURL } from '@app/utils';
import { setTailwindConfig } from '@ui-kit-utils/tailwindcss';
import tailwindConfig from '../../../tailwind.config';
import { useWidgets } from '@app/hooks/useWidgets';
import { SdkType } from '@app/type';
import logo from '@app/assets/favicon.png';

setTailwindConfig(tailwindConfig);

export const LaunchPage = observer(() => {
  const homeStore = useContext(GlobalStoreContext);
  const history = useHistory();
  const { setLoading, loading } = useContext(GlobalStoreContext);
  const launchOption = homeStore.launchOption;

  useEffect(() => {
    loading && setLoading(false);
  }, [loading]);

  if (isEmpty(launchOption)) {
    history.push('/');
    return null;
  }

  const { roomType, sdkType } = launchOption;

  // if (roomType === EduRoomTypeEnum.RoomProctor) {
  //   return <AgoraProctorApp />;
  // }

  if (roomType === EduRoomTypeEnum.RoomSmallClass && sdkType === SdkType.AgoraOnlineclassSdk) {
    return <AgoraOnlineClassApp />;
  }
  return <AgoraClassroomApp />;
});

export const AgoraClassroomApp = () => {
  const homeStore = useContext(GlobalStoreContext);
  const history = useHistory();
  const launchOption = homeStore.launchOption;
  const appRef = useRef<HTMLDivElement | null>(null);

  const { ready, widgets } = useWidgets([
    'AgoraCountdown',
    'AgoraHXChatWidget',
    'AgoraPolling',
    'AgoraSelector',
    'FcrBoardWidget',
    'FcrStreamMediaPlayerWidget',
    'FcrWatermarkWidget',
    'FcrWebviewWidget',
  ]);

  useEffect(() => {
    if (ready && appRef.current) {
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

      const recordUrl = `https://solutions-apaas.agora.io/apaas/record/dev/${CLASSROOM_SDK_VERSION}/record_page.html`;
      // const recordUrl = `https://agora-adc-artifacts.s3.cn-north-1.amazonaws.com.cn/apaas/record/dev/${CLASSROOM_SDK_VERSION}/record_page.html`;

      return AgoraEduSDK.launch(appRef.current, {
        ...launchOption,
        widgets,
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
  }, [ready]);

  return <div ref={appRef} id="app" className="fcr-w-screen fcr-h-screen"></div>;
};

// export const AgoraProctorApp = () => {
//   const homeStore = useContext(GlobalStoreContext);
//   const history = useHistory();
//   const launchOption = homeStore.launchOption;
//   const appRef = useRef<HTMLDivElement | null>(null);

//   const { ready, widgets } = useWidgets(['FcrWebviewWidget']);

//   useEffect(() => {
//     if (ready && appRef.current) {
//       AgoraProctorSDK.setParameters(
//         JSON.stringify({
//           host: homeStore.launchOption.sdkDomain,
//           uiConfigs: homeStore.launchOption.scenes,
//           themes: homeStore.launchOption.themes,
//         }),
//       );

//       AgoraProctorSDK.config({
//         appId: launchOption.appId,
//         region: launchOption.region ?? 'CN',
//       });

//       AgoraProctorSDK.launch(appRef.current, {
//         ...launchOption,
//         widgets,
//         listener: (evt: AgoraEduClassroomEvent, type) => {
//           console.log('launch#listener ', evt);
//           if (evt === AgoraEduClassroomEvent.Destroyed) {
//             history.push(`/?reason=${type}`);
//           }
//         },
//       });
//     }
//   }, [ready]);

//   return <div ref={appRef} id="app" className="fcr-w-screen fcr-h-screen"></div>;
// };

export const AgoraOnlineClassApp = () => {
  const homeStore = useContext(GlobalStoreContext);
  const launchOption = homeStore.launchOption;
  const appRef = useRef<HTMLDivElement | null>(null);
  const history = useHistory();

  const { ready, widgets } = useWidgets(['FcrBoardWidgetV2', 'FcrPolling', 'AgoraHXChatWidgetV2']);

  useEffect(() => {
    if (ready && appRef.current) {
      const shareUrl = `${location.origin}${location.pathname}?roomName=${launchOption.roomName}&roomType=${launchOption.roomType}&region=${launchOption.region}&language=${launchOption.language}&roleType=2#/share`;

      AgoraOnlineclassSDK.setParameters(
        JSON.stringify({
          shareUrl,
          logo,
          host: homeStore.launchOption.sdkDomain,
          uiConfigs: homeStore.launchOption.scenes,
          themes: homeStore.launchOption.themes,
        }),
      );

      const unmount = AgoraOnlineclassSDK.launch(appRef.current, {
        ...launchOption,
        widgets,

        virtualBackgroundImages,
        virtualBackgroundVideos,
        uiMode: homeStore.theme,
        token: launchOption.rtmToken,
        devicePretest: true,
        mediaOptions: {
          cameraEncoderConfiguration: { width: 735, height: 417, frameRate: 15, bitrate: 800 },
        },
        recordUrl:
          'https://agora-adc-artifacts.s3.cn-north-1.amazonaws.com.cn/apaas/record/dev/onlineclass/1.0.0/onlineclass_record_page.html',
        listener: (evt: AgoraEduClassroomEvent, type) => {
          console.log('launch#listener ', evt);
          if (evt === AgoraEduClassroomEvent.Destroyed) {
            unmount();
            history.push(`/?reason=${type}`);
          }
        },
      });
    }
  }, [ready]);

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
