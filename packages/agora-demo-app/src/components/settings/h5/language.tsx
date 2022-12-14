import { GlobalStoreContext } from '@app/stores';
import { useI18n } from 'agora-common-libs';
import { observer } from 'mobx-react';
import { FC, useContext, useMemo } from 'react';
import { SettingsMenuEnum } from '.';
import { Menu } from './components/menu';
import { CheckIcon, MenuItemProps } from './components/menu-item';
import { PageLayout } from './components/page-layout';

interface LanguageMenuProps {
  removeMenuPopup: (menu: SettingsMenuEnum) => void;
}

export const LanguageMenu: FC<LanguageMenuProps> = observer(({ removeMenuPopup }) => {
  const { language, setLanguage } = useContext(GlobalStoreContext);
  const transI18n = useI18n();

  const menus: MenuItemProps[] = useMemo(() => {
    return [
      {
        text: transI18n('fcr_settings_option_general_language_simplified'),
        onClick: () => {
          setLanguage('zh');
        },
        rightContent: <CheckIcon checked={language === 'zh'} />,
      },
      {
        text: transI18n('fcr_settings_option_general_language_english'),
        onClick: () => {
          setLanguage('en');
        },
        rightContent: <CheckIcon checked={language === 'en'} />,
      },
    ];
  }, [language]);

  return (
    <PageLayout
      title={transI18n('fcr_settings_label_language')}
      onBack={() => {
        removeMenuPopup(SettingsMenuEnum.Language);
      }}>
      <Menu data={menus} />
    </PageLayout>
  );
});
