import { HomePage as BasePage } from '@app/dev/_common/pages/home';
import { SdkType } from '@app/type';
import { useI18n } from 'agora-common-libs';

export const HomePage = () => {
  const t = useI18n();

  const defaultScenes = [
    {
      text: t('home.roomType_interactiveSmallClass'),
      value: '4',
      sdkType: SdkType.AgoraOnlineclassSdk,
    },
  ];

  return <BasePage scenes={defaultScenes} />;
};
