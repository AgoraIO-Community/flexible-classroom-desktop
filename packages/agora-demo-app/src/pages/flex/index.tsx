import { HomePage as BasePage } from '@app/dev/_common/pages/home';
import { SceneType } from '@app/type';
import { useI18n } from 'agora-common-libs';

export const FlexPage = () => {
  const t = useI18n();

  const defaultScenes = [
    {
      text: t('fcr_home_label_1on1'),
      value: SceneType.OneOnOne,
    },
    {
      text: t('fcr_home_label_small_classroom'),
      value: SceneType.SmallClass,
    },
    {
      text: t('fcr_home_label_lecture_hall'),
      value: SceneType.LectureHall,
    },
    {
      text: t('fcr_home_label_proctoring'),
      value: SceneType.Proctoring,
    },
    {
      text: t('fcr_home_label_onlineclass'),
      value: SceneType.Scene,
    },
  ];

  return <BasePage scenes={defaultScenes} />;
};
