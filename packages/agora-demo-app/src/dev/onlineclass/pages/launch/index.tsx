import { GlobalStoreContext } from '@app/stores';
import { getAssetURL } from '@app/utils/url';
import { AgoraOnlineclassSDK, CoursewareList } from 'agora-onlineclass-sdk';
import { isEmpty } from 'lodash';
import { observer } from 'mobx-react';
import { useContext, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '@app/assets/favicon.png';
import { AgoraEduClassroomEvent } from 'agora-edu-core';
import { useOnlineclassWidgets } from '@app/hooks/useWidgets';

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

  const { widgets, ready } = useOnlineclassWidgets([
    'FcrPolling',
    'FcrBoardWidget',
    'FcrWebviewWidget',
    'FcrStreamMediaPlayerWidget',
    'AgoraChatroomWidget',
  ]);

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
      const shareUrl = `${location.origin}${location.pathname}?roomName=${launchOption.roomName}&roomType=${launchOption.roomType}&region=${launchOption.region}&language=${launchOption.language}&roleType=2#/share`;

      AgoraOnlineclassSDK.setParameters(
        JSON.stringify({ logo, shareUrl, host: launchOption.sdkDomain }),
      );

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
        coursewareList,
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

const coursewareList: CoursewareList = [
  {
    resourceUuid: '20c2281deddefa96a97fe16b3628b456',
    resourceName: 'Agora Flexible Classroom v2.1 Demo Instructions.pptx',
    ext: 'pptx',
    size: 8478024,
    url: 'https://agora-adc-artifacts.oss-cn-beijing.aliyuncs.com/cloud-disk/f488493d1886435f963dfb3d95984fd4/test02090054/20c2281deddefa96a97fe16b3628b456.pptx',
    updateTime: 1646988472045,
    taskUuid: 'b81275a0a11711ecb94f39bd66b92986',
    conversion: {
      type: 'dynamic',
      preview: true,
      scale: 1.2,
      outputFormat: 'png',
      canvasVersion: true,
    },
    taskProgress: {
      status: 'Finished',
      totalPageSize: 14,
      convertedPageSize: 14,
      convertedPercentage: 100,
      convertedFileList: [
        {
          ppt: {
            width: 1280,
            height: 720,
            preview:
              'https://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/preview/1.png',
            src: 'pptx://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/1.slide',
          },
          name: '1',
        },
        {
          ppt: {
            width: 1280,
            height: 720,
            preview:
              'https://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/preview/2.png',
            src: 'pptx://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/2.slide',
          },
          name: '2',
        },
        {
          ppt: {
            width: 1280,
            height: 720,
            preview:
              'https://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/preview/3.png',
            src: 'pptx://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/3.slide',
          },
          name: '3',
        },
        {
          ppt: {
            width: 1280,
            height: 720,
            preview:
              'https://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/preview/4.png',
            src: 'pptx://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/4.slide',
          },
          name: '4',
        },
        {
          ppt: {
            width: 1280,
            height: 720,
            preview:
              'https://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/preview/5.png',
            src: 'pptx://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/5.slide',
          },
          name: '5',
        },
        {
          ppt: {
            width: 1280,
            height: 720,
            preview:
              'https://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/preview/6.png',
            src: 'pptx://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/6.slide',
          },
          name: '6',
        },
        {
          ppt: {
            width: 1280,
            height: 720,
            preview:
              'https://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/preview/7.png',
            src: 'pptx://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/7.slide',
          },
          name: '7',
        },
        {
          ppt: {
            width: 1280,
            height: 720,
            preview:
              'https://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/preview/8.png',
            src: 'pptx://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/8.slide',
          },
          name: '8',
        },
        {
          ppt: {
            width: 1280,
            height: 720,
            preview:
              'https://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/preview/9.png',
            src: 'pptx://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/9.slide',
          },
          name: '9',
        },
        {
          ppt: {
            width: 1280,
            height: 720,
            preview:
              'https://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/preview/10.png',
            src: 'pptx://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/10.slide',
          },
          name: '10',
        },
        {
          ppt: {
            width: 1280,
            height: 720,
            preview:
              'https://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/preview/11.png',
            src: 'pptx://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/11.slide',
          },
          name: '11',
        },
        {
          ppt: {
            width: 1280,
            height: 720,
            preview:
              'https://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/preview/12.png',
            src: 'pptx://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/12.slide',
          },
          name: '12',
        },
        {
          ppt: {
            width: 1280,
            height: 720,
            preview:
              'https://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/preview/13.png',
            src: 'pptx://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/13.slide',
          },
          name: '13',
        },
        {
          ppt: {
            width: 1280,
            height: 720,
            preview:
              'https://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/preview/14.png',
            src: 'pptx://convertcdn.netless.link/dynamicConvert/b81275a0a11711ecb94f39bd66b92986/14.slide',
          },
          name: '14',
        },
      ],
      currentStep: 'Packaging',
      prefix: 'https://convertcdn.netless.link/dynamicConvert',
    },
  },

  {
    resourceName: 'youtube - RTE2022',
    resourceUuid: `${Math.floor(Math.random() * 1000) + Date.now()}`,
    ext: 'alf',
    url: 'http://youtube.com/watch?v=p3Bt6rAYIsQ',
    size: 0,
    updateTime: Date.now(),
    initOpen: false,
  },
  {
    resourceName: 'AgoraFlexibleClassroom',
    resourceUuid: `${Math.floor(Math.random() * 1000) + Date.now()}`,
    ext: 'alf',
    url: 'https://docs.google.com/presentation/d/1EbE3km3bIHOyzg49mcC92JRd5OQjw59c/edit?usp=sharing&ouid=109918631701376245075&rtpof=true&sd=true',
    size: 0,
    updateTime: Date.now(),
    initOpen: false,
  },
];
