import { AgoraEduSDK } from 'agora-classroom-sdk';
import { EduRoomTypeEnum } from 'agora-edu-core';
import { useI18n } from 'agora-common-libs';
import { useEffect, useRef, useState } from 'react';
import { homeApi } from '../api/home';

const config = { init: false };
export const useBuilderConfig = () => {
  const t = useI18n();
  const [configReady, setConfigReady] = useState(config.init);

  const builderResource = useRef({
    scenes: {},
    themes: {},
  });

  const defaultScenes = [
    { text: t('home.roomType_1v1'), value: `${EduRoomTypeEnum.Room1v1Class}` },
    { text: t('home.roomType_interactiveSmallClass'), value: `${EduRoomTypeEnum.RoomSmallClass}` },
    { text: t('home.roomType_interactiveBigClass'), value: `${EduRoomTypeEnum.RoomBigClass}` },
  ];

  const [roomTypes, setRoomTypes] = useState<EduRoomTypeEnum[]>([]);

  const sceneOptions = defaultScenes.filter(({ value }) => {
    return roomTypes.some((t) => `${t}` === value);
  });

  useEffect(() => {
    if (config.init) {
      return;
    }
    const companyId = window.__launchCompanyId;
    const projectId = window.__launchProjectId;

    if (companyId && projectId) {
      homeApi.getBuilderResource(companyId, projectId).then(({ scenes, themes }) => {
        builderResource.current = {
          scenes: scenes ?? {},
          themes: themes ? { default: themes } : {},
        };

        AgoraEduSDK.setParameters(
          JSON.stringify({
            uiConfigs: builderResource.current.scenes,
            themes: builderResource.current.themes,
          }),
        );
        config.init = true;
        setRoomTypes(AgoraEduSDK.getLoadedScenes().map(({ roomType }) => roomType));
        setConfigReady(true);
      });
      return;
    }
    config.init = true;
    setConfigReady(true);
    setRoomTypes(AgoraEduSDK.getLoadedScenes().map(({ roomType }) => roomType));
  }, []);

  return {
    builderResource,
    sceneOptions: sceneOptions.length ? sceneOptions : defaultScenes,
    configReady,
  };
};
