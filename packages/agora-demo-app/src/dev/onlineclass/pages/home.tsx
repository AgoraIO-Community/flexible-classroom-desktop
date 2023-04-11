import { HomePage as BasePage } from '@app/dev/_common/pages/home';
import { useI18n } from 'agora-common-libs/lib/i18n';
import { EduRoomTypeEnum } from 'agora-edu-core';

export const HomePage = () => {
  const t = useI18n();

  const defaultScenes = [
    { text: t('home.roomType_interactiveSmallClass'), value: `${EduRoomTypeEnum.RoomSmallClass}` },
  ];

  return <BasePage scenes={defaultScenes} />;
};
