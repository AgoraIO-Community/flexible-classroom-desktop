import { HomePage as BasePage } from '@app/dev/_common/pages/home';
import { SceneType } from '@app/type';
import { useI18n } from 'agora-common-libs';

export const FlexPage = () => {
  const t = useI18n();

  const defaultScenes = [
    {
      text: t('fcr_home_label_1on1'),
      value: `${0}`,
      sceneType: SceneType.AgoraEduSdk,
    },
    {
      text: t('fcr_home_label_small_classroom'),
      value: `${4}`,
      sceneType: SceneType.AgoraEduSdk,
    },
    {
      text: t('fcr_home_label_lecture_hall'),
      value: `${2}`,
      sceneType: SceneType.AgoraEduSdk,
    },
    {
      text: t('fcr_home_label_proctoring'),
      value: `${6}`,
      sceneType: SceneType.AgoraProctorSdk,
    },
    {
      text: t('fcr_home_label_onlineclass'),
      value: `${4}`,
      sceneType: SceneType.AgoraOnlineclassSdk,
    },
  ];

  return <BasePage scenes={defaultScenes} />;
};
