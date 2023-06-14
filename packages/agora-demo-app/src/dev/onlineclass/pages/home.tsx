import { HomePage as BasePage } from '@app/dev/_common/pages/home';
import { useI18n } from 'agora-common-libs';
import { EduRoomTypeEnum } from 'agora-edu-core';

export const HomePage = () => {
  const t = useI18n();

  const defaultScenes = [
    { text: t('home.roomType_interactiveSmallClass'), value: `${EduRoomTypeEnum.RoomSmallClass}` },
  ];

  return <BasePage scenes={defaultScenes} />;
};
