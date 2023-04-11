import { HomePage as BasePage } from '@app/dev/_common/pages/home';
import { useI18n } from 'agora-common-libs/lib/i18n';
import { EduRoomTypeEnum } from 'agora-edu-core';

export const HomePage = () => {
  const t = useI18n();

  const defaultScenes = [
    { text: t('home.roomType_1v1'), value: `${EduRoomTypeEnum.Room1v1Class}` },
    { text: t('home.roomType_interactiveSmallClass'), value: `${EduRoomTypeEnum.RoomSmallClass}` },
    { text: t('home.roomType_interactiveBigClass'), value: `${EduRoomTypeEnum.RoomBigClass}` },
    { text: t('fcr_home_label_proctoring'), value: `${EduRoomTypeEnum.RoomProctor}` },
  ];

  return <BasePage scenes={defaultScenes} />;
};
