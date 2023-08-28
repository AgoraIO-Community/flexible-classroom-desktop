import { useI18n } from 'agora-common-libs';
import { FC, useContext } from 'react';
import { SettingsMenuEnum } from '.';
import { Menu } from './components/menu';
import { MenuItemProps } from './components/menu-item';
import { PageLayout } from './components/page-layout';
import { GlobalStoreContext } from '@app/stores';
import { observer } from 'mobx-react';
import { cnAgreementURL, cnPrivacyPolicyURL, naPrivacyPolicyURL } from '@app/utils';

interface AboutMenuProps {
  addMenuPopup: (menu: SettingsMenuEnum) => void;
  removeMenuPopup: (menu: SettingsMenuEnum) => void;
}

export const AboutMenu: FC<AboutMenuProps> = observer(({ addMenuPopup, removeMenuPopup }) => {
  const transI18n = useI18n();

  const { region } = useContext(GlobalStoreContext);

  const agreement =
    region === 'CN'
      ? [
          {
            text: transI18n('fcr_settings_link_about_us_privacy_policy'),
            onClick: () => {
              window.open(cnPrivacyPolicyURL, '_blank');
            },
          },
          {
            text: transI18n('fcr_settings_link_about_us_user_agreement'),
            onClick: () => {
              window.open(cnAgreementURL, '_blank');
            },
          },
        ]
      : [
          {
            text: transI18n('fcr_settings_link_about_us_privacy_policy'),
            onClick: () => {
              window.open(naPrivacyPolicyURL, '_blank');
            },
          },
        ];

  const menus: MenuItemProps[] = [
    ...agreement,
    {
      text: transI18n('fcr_settings_label_about_us_fcr_ver'),
      onClick: () => {},
      rightContent: <span>{`ver ${DEMO_VERSION}`}</span>,
    },
  ];

  return (
    <PageLayout
      title={transI18n('fcr_settings_label_about_us_about_us')}
      onBack={() => {
        removeMenuPopup(SettingsMenuEnum.About);
      }}>
      <Menu data={menus} />
    </PageLayout>
  );
});
