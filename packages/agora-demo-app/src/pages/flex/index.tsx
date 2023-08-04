import { HomePage as BasePage } from '@app/dev/_common/pages/home';
import { SdkType } from '@app/type';
import { useI18n } from 'agora-common-libs';

export const FlexPage = () => {
  const t = useI18n();

  const defaultScenes = [
    {
      text: t('fcr_home_label_1on1'),
      value: `${0}`,
      sdkType: SdkType.AgoraEduSdk,
    },
    {
      text: t('fcr_home_label_small_classroom'),
      value: `${4}`,
      sdkType: SdkType.AgoraEduSdk,
    },
    {
      text: t('fcr_home_label_lecture_hall'),
      value: `${2}`,
      sdkType: SdkType.AgoraEduSdk,
    },
    {
      text: t('fcr_home_label_proctoring'),
      value: `${6}`,
      sdkType: SdkType.AgoraProctorSdk,
    },
    {
      text: t('fcr_home_label_onlineclass'),
      value: `${4}`,
      sdkType: SdkType.AgoraOnlineclassSdk,
    },
  ];

  return <BasePage scenes={defaultScenes} />;
};
