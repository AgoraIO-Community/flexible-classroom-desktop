import { GlobalStoreContext } from '@app/stores';
import { AgoraEduClassroomEvent, EduRoomTypeEnum } from 'agora-edu-core';
import { AgoraEduSDK } from 'agora-classroom-sdk';
import { AgoraProctorSDK } from 'agora-proctor-sdk';
import { AgoraOnlineclassSDK } from 'agora-onlineclass-sdk';
import { isEmpty } from 'lodash';
import { observer } from 'mobx-react';
import { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import courseWareList from './courseware-list';
import { getAssetURL } from '@app/utils';
import { AgoraWidgetBase } from 'agora-common-libs/lib/widget';
import { setTailwindConfig } from '@ui-kit-utils/tailwindcss';
import tailwindConfig from '../../../tailwind.config';
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

  const roomType = launchOption.roomType;

  switch (roomType) {
    case EduRoomTypeEnum.RoomProctor:
      return <AgoraProctorApp />;
    case EduRoomTypeEnum.RoomSmallClass:
      return <AgoraOnlineClassApp />;
    default:
      return <AgoraClassroomApp />;
  }
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

  return <div ref={appRef} id="app" className="w-screen h-screen"></div>;
};

export const AgoraProctorApp = () => {
  const homeStore = useContext(GlobalStoreContext);
  const history = useHistory();
  const launchOption = homeStore.launchOption;
  const appRef = useRef<HTMLDivElement | null>(null);

  const { ready, widgets } = useWidgets(['FcrWebviewWidget']);

  useEffect(() => {
    if (ready && appRef.current) {
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
        listener: (evt: AgoraEduClassroomEvent, type) => {
          console.log('launch#listener ', evt);
          if (evt === AgoraEduClassroomEvent.Destroyed) {
            history.push(`/?reason=${type}`);
          }
        },
      });
    }
  }, [ready]);

  return <div ref={appRef} id="app" className="w-screen h-screen"></div>;
};

export const AgoraOnlineClassApp = () => {
  const homeStore = useContext(GlobalStoreContext);
  const launchOption = homeStore.launchOption;
  const appRef = useRef<HTMLDivElement | null>(null);

  const { ready, widgets } = useWidgets(['FcrBoardWidgetV2']);

  useEffect(() => {
    if (ready && appRef.current) {
      AgoraOnlineclassSDK.setParameters(
        JSON.stringify({
          host: homeStore.launchOption.sdkDomain,
          uiConfigs: homeStore.launchOption.scenes,
          themes: homeStore.launchOption.themes,
        }),
      );

      AgoraOnlineclassSDK.launch(appRef.current, {
        ...launchOption,
        widgets,
        virtualBackgroundImages,
        virtualBackgroundVideos,
        uiMode: homeStore.theme,
        token: launchOption.rtmToken,
        devicePretest: true,
      });
    }
  }, [ready]);

  return <div ref={appRef} id="app" className="w-screen h-screen"></div>;
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

const getWidgetName = (widgetClass: unknown) => {
  const Clz = widgetClass as typeof AgoraWidgetBase;
  return Object.create(Clz.prototype).widgetName;
};

const useWidgets = (
  ids: (
    | 'FcrWebviewWidget'
    | 'FcrBoardWidget'
    | 'AgoraSelector'
    | 'AgoraCountdown'
    | 'AgoraHXChatWidget'
    | 'FcrStreamMediaPlayerWidget'
    | 'AgoraPolling'
    | 'FcrWatermarkWidget'
    | 'FcrBoardWidgetV2'
  )[],
) => {
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState<Record<string, typeof AgoraWidgetBase>>({});
  useEffect(() => {
    const load = async () => {
      const widgets: Record<string, typeof AgoraWidgetBase> = {};
      if (ids.includes('FcrWebviewWidget')) {
        const { FcrWebviewWidget } = await import('agora-plugin-gallery/gallery/webview');
        widgets[getWidgetName(FcrWebviewWidget)] = FcrWebviewWidget;
      }
      if (ids.includes('FcrBoardWidget')) {
        const { FcrBoardWidget } = await import('agora-plugin-gallery/gallery/whiteboard');
        widgets[getWidgetName(FcrBoardWidget)] = FcrBoardWidget;
      }
      if (ids.includes('AgoraSelector')) {
        const { AgoraSelector } = await import('agora-plugin-gallery/gallery/answer');
        widgets[getWidgetName(AgoraSelector)] = AgoraSelector;
      }
      if (ids.includes('AgoraCountdown')) {
        const { AgoraCountdown } = await import('agora-plugin-gallery/gallery/counter');
        widgets[getWidgetName(AgoraCountdown)] = AgoraCountdown;
      }
      if (ids.includes('AgoraHXChatWidget')) {
        const { AgoraHXChatWidget } = await import('agora-plugin-gallery/gallery/hx-chat');
        widgets[getWidgetName(AgoraHXChatWidget)] = AgoraHXChatWidget;
      }
      if (ids.includes('FcrStreamMediaPlayerWidget')) {
        const { FcrStreamMediaPlayerWidget } = await import(
          'agora-plugin-gallery/gallery/stream-media'
        );
        widgets[getWidgetName(FcrStreamMediaPlayerWidget)] = FcrStreamMediaPlayerWidget;
      }
      if (ids.includes('AgoraPolling')) {
        const { AgoraPolling } = await import('agora-plugin-gallery/gallery/vote');
        widgets[getWidgetName(AgoraPolling)] = AgoraPolling;
      }
      if (ids.includes('FcrWatermarkWidget')) {
        const { FcrWatermarkWidget } = await import('agora-plugin-gallery/gallery/watermark');
        widgets[getWidgetName(FcrWatermarkWidget)] = FcrWatermarkWidget;
      }
      if (ids.includes('FcrBoardWidgetV2')) {
        const { FcrBoardWidget } = await import('agora-plugin-gallery/gallery/whiteboard/v2');
        widgets[getWidgetName(FcrBoardWidget)] = FcrBoardWidget;
      }

      setWidgets(widgets);
      setReady(true);
    };
    load();
  }, []);

  return { ready, widgets };
};
