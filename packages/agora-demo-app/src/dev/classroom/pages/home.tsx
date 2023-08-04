import { HomePage as BasePage } from '@app/dev/_common/pages/home';
import { SdkType } from '@app/type';
import { useI18n } from 'agora-common-libs';
import { EduRoomTypeEnum } from 'agora-edu-core';

export const HomePage = () => {
  const t = useI18n();

  const defaultScenes = [
    {
      text: t('home.roomType_1v1'),
      value: `${EduRoomTypeEnum.Room1v1Class}`,
      sdkType: SdkType.AgoraEduSdk,
    },
    {
      text: t('home.roomType_interactiveSmallClass'),
      value: `${EduRoomTypeEnum.RoomSmallClass}`,
      sdkType: SdkType.AgoraEduSdk,
    },
    {
      text: t('home.roomType_interactiveBigClass'),
      value: `${EduRoomTypeEnum.RoomBigClass}`,
      sdkType: SdkType.AgoraEduSdk,
    },
    {
      text: t('fcr_home_label_proctoring'),
      value: `${EduRoomTypeEnum.RoomProctor}`,
      sdkType: SdkType.AgoraEduSdk,
    },
  ];

  return <BasePage scenes={defaultScenes} />;
};
