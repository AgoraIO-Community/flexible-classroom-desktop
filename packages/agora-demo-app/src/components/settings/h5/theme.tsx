import { GlobalStoreContext } from '@app/stores';
import { observer } from 'mobx-react';
import { FC, useContext } from 'react';
import { FcrMultiThemeMode } from 'agora-common-libs';
import { useI18n } from 'agora-common-libs';
import { SettingsMenuEnum } from '.';
import { Menu } from './components/menu';
import { CheckIcon, MenuItemProps } from './components/menu-item';
import { PageLayout } from './components/page-layout';

interface ThemeMenuProps {
  removeMenuPopup: (menu: SettingsMenuEnum) => void;
}

export const ThemeMenu: FC<ThemeMenuProps> = observer(({ removeMenuPopup }) => {
  const transI18n = useI18n();
  const { theme, setTheme } = useContext(GlobalStoreContext);

  const menus: MenuItemProps[] = [
    {
      text: transI18n('fcr_settings_theme_light'),
      onClick: () => {
        setTheme(FcrMultiThemeMode.light);
      },
      rightContent: <CheckIcon checked={theme === FcrMultiThemeMode.light} />,
    },
    {
      text: transI18n('fcr_settings_theme_dark'),
      onClick: () => {
        setTheme(FcrMultiThemeMode.dark);
      },
      rightContent: <CheckIcon checked={theme === FcrMultiThemeMode.dark} />,
    },
  ];

  return (
    <PageLayout
      title={transI18n('fcr_settings_theme')}
      onBack={() => {
        removeMenuPopup(SettingsMenuEnum.Theme);
      }}>
      <Menu data={menus} />
    </PageLayout>
  );
});
