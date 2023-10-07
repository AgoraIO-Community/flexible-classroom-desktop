import { HomePage as BasePage } from '@app/dev/_common/pages/home';
import { SceneType } from '@app/type';
import { useI18n } from 'agora-common-libs';

export const HomePage = () => {
  const t = useI18n();

  const defaultScenes = [
    {
      text: t('home.roomType_1v1'),
      value: SceneType.OneOnOne,
    },
    {
      text: t('home.roomType_interactiveSmallClass'),
      value: SceneType.SmallClass,
    },
    {
      text: t('home.roomType_interactiveBigClass'),
      value: SceneType.LectureHall,
    },
  ];

  return <BasePage scenes={defaultScenes} />;
};
