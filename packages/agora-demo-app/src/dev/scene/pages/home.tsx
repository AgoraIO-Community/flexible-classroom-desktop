import { HomePage as BasePage } from '@app/dev/_common/pages/home';
import { SceneType } from '@app/type';
import { useI18n } from 'agora-common-libs';

export const HomePage = () => {
  const t = useI18n();

  const defaultScenes = [
    {
      text: t('home.roomType_cloudClass'),
      value: SceneType.Scene,
    },
  ];

  return <BasePage scenes={defaultScenes} />;
};
