import { HomePage as BasePage } from '@app/dev/_common/pages/home';
import { SdkType } from '@app/type';
import { useI18n } from 'agora-common-libs';

export const HomePage = () => {
  const t = useI18n();

  const defaultScenes = [
    {
      text: t('home.roomType_1v1'),
      value: `0`,
      sdkType: SdkType.AgoraEduSdk,
    },
    {
      text: t('home.roomType_interactiveSmallClass'),
      value: `4`,
      sdkType: SdkType.AgoraEduSdk,
    },
    {
      text: t('home.roomType_interactiveBigClass'),
      value: `2`,
      sdkType: SdkType.AgoraEduSdk,
    },
    {
      text: t('fcr_home_label_proctoring'),
      value: `6`,
      sdkType: SdkType.AgoraEduSdk,
    },
  ];

  return <BasePage scenes={defaultScenes} />;
};
