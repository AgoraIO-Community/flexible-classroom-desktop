import logo from '@app/assets/logo.svg';
import { useLogout } from '@app/hooks';
import { useI18n } from 'agora-common-libs';
import './index.css';
import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import { GlobalStoreContext } from '@app/stores';
import { cnAgreementURL, cnPrivacyPolicyURL, naPrivacyPolicyURL } from '@app/utils';

declare const DEMO_VERSION: string;

export const About = observer(() => {
  const { logout } = useLogout();
  const transI18n = useI18n();
  const { region } = useContext(GlobalStoreContext);

  const cn = (
    <React.Fragment>
      <p>
        <a href={cnAgreementURL} target="_blank" rel="noreferrer">
          {transI18n('fcr_settings_link_about_us_user_agreement')}
        </a>
      </p>
      <p>
        <a href={cnPrivacyPolicyURL} target="_blank" rel="noreferrer">
          {transI18n('fcr_settings_link_about_us_privacy_policy')}
        </a>
      </p>
    </React.Fragment>
  );

  const na = (
    <React.Fragment>
      <p>
        <a href={naPrivacyPolicyURL} target="_blank" rel="noreferrer">
          {transI18n('fcr_settings_link_about_us_privacy_policy')}
        </a>
      </p>
    </React.Fragment>
  );

  return (
    <div className="about-setting fcr-leading-8">
      <div className="title">{transI18n('fcr_settings_label_about_us_about_us')}</div>
      <p>
        {transI18n('fcr_settings_label_about_us_fcr_ver')}
        {`: ver ${DEMO_VERSION}`}
      </p>
      <p>
        {transI18n('fcr_settings_label_demo_remind')}
      </p>
      {region === 'CN' ? cn : na}
      <div
        className="logout-btn fcr-px-6 fcr-rounded-md fcr-border fcr-inline-block fcr-cursor-pointer"
        onClick={() => {
          logout();
        }}>
        {transI18n('settings_logout')}
      </div>
      <div className="logo">
        <img src={logo} alt="" />
        {transI18n('home.header-left-title')}
      </div>
    </div>
  );
});
