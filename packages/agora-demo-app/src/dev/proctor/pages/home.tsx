import { HomePage as BasePage } from '@app/dev/_common/pages/home';
import { SdkType } from '@app/type';
import { useI18n } from 'agora-common-libs';

export const HomePage = () => {
  const t = useI18n();

  const defaultScenes = [
    {
      text: t('fcr_home_label_proctoring'),
      value: `6`,
      sdkType: SdkType.AgoraProctorSdk,
    },
  ];

  return <BasePage scenes={defaultScenes} />;
};
