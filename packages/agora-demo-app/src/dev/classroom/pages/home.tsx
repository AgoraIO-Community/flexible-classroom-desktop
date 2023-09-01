import { HomePage as BasePage } from '@app/dev/_common/pages/home';
import { SceneType } from '@app/type';
import { useI18n } from 'agora-common-libs';

export const HomePage = () => {
  const t = useI18n();

  const defaultScenes = [
    {
      text: t('home.roomType_1v1'),
      value: `0`,
      sceneType: SceneType.AgoraEduSdk,
    },
    {
      text: t('home.roomType_interactiveSmallClass'),
      value: `4`,
      sceneType: SceneType.AgoraEduSdk,
    },
    {
      text: t('home.roomType_interactiveBigClass'),
      value: `2`,
      sceneType: SceneType.AgoraEduSdk,
    },
    {
      text: t('fcr_home_label_proctoring'),
      value: `6`,
      sceneType: SceneType.AgoraEduSdk,
    },
  ];

  return <BasePage scenes={defaultScenes} />;
};
