import { GlobalStoreContext } from '@app/stores';
import type { AgoraRegion } from 'agora-rte-sdk';
import { observer } from 'mobx-react';
import { FC, useContext, useMemo } from 'react';
import { useI18n } from 'agora-common-libs';
import { SettingsMenuEnum } from '.';
import { Menu } from './components/menu';
import { CheckIcon, MenuItemProps } from './components/menu-item';
import { PageLayout } from './components/page-layout';

interface RegionMenuProps {
  removeMenuPopup: (menu: SettingsMenuEnum) => void;
}

export const RegionMenu: FC<RegionMenuProps> = observer(({ removeMenuPopup }) => {
  const { region, setRegion } = useContext(GlobalStoreContext);
  const transI18n = useI18n();

  const menus = useMemo(() => {
    const regionMenuItem = (value: AgoraRegion): MenuItemProps => {
      return {
        text: value,
        onClick: () => {
          setRegion(value);
        },
        rightContent: <CheckIcon checked={region === value} />,
      };
    };

    const result: MenuItemProps[] = [
      regionMenuItem('NA' as AgoraRegion),
      regionMenuItem('CN' as AgoraRegion),
    ];
    return result;
  }, [region]);

  return (
    <PageLayout
      title={transI18n('fcr_settings_label_region')}
      onBack={() => {
        removeMenuPopup(SettingsMenuEnum.Region);
      }}>
      <Menu data={menus} />
    </PageLayout>
  );
});
