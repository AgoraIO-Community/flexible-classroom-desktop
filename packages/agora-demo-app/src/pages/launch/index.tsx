import { GlobalStoreContext, UserStoreContext } from '@app/stores';
import { AgoraEduClassroomEvent, EduRoomTypeEnum } from 'agora-edu-core';

import { isEmpty } from 'lodash';
import { observer } from 'mobx-react';
import { useContext, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import courseWareList from './courseware-list';
import { REACT_APP_RECORDING_LINK_PREFIX, getAssetURL, shareLink } from '@app/utils';
import { setTailwindConfig } from '@ui-kit-utils/tailwindcss';
import tailwindConfig from '../../../tailwind.config';
import {
  useClassroomWidgets,
  useOnlineclassWidgets,
  useProctorWidgets,
} from '@app/hooks/useWidgets';
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

  if (roomType === EduRoomTypeEnum.RoomProctor) {
    return <AgoraProctorApp />;
  }

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

  const { ready, widgets } = useClassroomWidgets([
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
    const launch = async () => {
      if (ready && appRef.current) {
        const { AgoraEduSDK } = await import(/* webpackPrefetch: true */ 'agora-classroom-sdk');
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

        const recordUrl = `${REACT_APP_RECORDING_LINK_PREFIX}/record_page.html`;
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
    };
    launch();
  }, [ready]);

  return <div ref={appRef} id="app" className="fcr-w-screen fcr-h-screen"></div>;
};

export const AgoraProctorApp = () => {
  const homeStore = useContext(GlobalStoreContext);
  const history = useHistory();
  const launchOption = homeStore.launchOption;
  const appRef = useRef<HTMLDivElement | null>(null);

  const { ready, widgets } = useProctorWidgets(['FcrWebviewWidget']);

  useEffect(() => {
    const launch = async () => {
      if (ready && appRef.current) {
        const { AgoraProctorSDK } = await import(/* webpackPrefetch: true */ 'agora-proctor-sdk');
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

        AgoraProctorSDK.launch(appRef.current, {
          ...launchOption,
          widgets,
          listener: (evt: AgoraEduClassroomEvent, type: any) => {
            console.log('launch#listener ', evt);
            if (evt === AgoraEduClassroomEvent.Destroyed) {
              history.push(`/?reason=${type}`);
            }
          },
        });
      }
    };
    launch();
  }, [ready]);

  return <div ref={appRef} id="app" className="fcr-w-screen fcr-h-screen"></div>;
};

export const AgoraOnlineClassApp = () => {
  const homeStore = useContext(GlobalStoreContext);
  const userStore = useContext(UserStoreContext);
  const launchOption = homeStore.launchOption;
  const appRef = useRef<HTMLDivElement | null>(null);
  const history = useHistory();
  const { ready, widgets } = useOnlineclassWidgets([
    'FcrBoardWidget',
    'FcrPolling',
    'AgoraChatroomWidget',
    'FcrWebviewWidget',
    'FcrStreamMediaPlayerWidget',
  ]);

  useEffect(() => {
    const launch = async () => {
      const { AgoraOnlineclassSDK } = await import(
        /* webpackPrefetch: true */ 'agora-onlineclass-sdk'
      );
      if (ready && appRef.current) {
        const shareUrl = shareLink.generateUrl({
          roomId: launchOption.roomUuid,
          owner: userStore.nickName,
          region: homeStore.region,
          role: 2,
        });
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
          coursewareList: courseWareList,
          virtualBackgroundImages,
          virtualBackgroundVideos,
          uiMode: homeStore.theme,
          token: launchOption.rtmToken,
          devicePretest: true,
          mediaOptions: {
            cameraEncoderConfiguration: { width: 735, height: 417, frameRate: 15, bitrate: 800 },
          },
          recordUrl: `${REACT_APP_RECORDING_LINK_PREFIX}/onlineclass_record_page.html`,
          listener: (evt: AgoraEduClassroomEvent, type: any) => {
            console.log('launch#listener ', evt);
            if (evt === AgoraEduClassroomEvent.Destroyed) {
              unmount();
              history.push(`/?reason=${type}`);
            }
          },
        });
        return unmount;
      }
    };
    launch();
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
