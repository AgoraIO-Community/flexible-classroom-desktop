import { useState } from 'react';
import { useI18n } from 'agora-common-libs';
import { About } from './about';
import { GeneralSetting } from './general-setting';
import './index.css';

enum SettingTabType {
  GeneralSetting = 'general-setting',
  About = 'about',
}

export const Settings = () => {
  const [tab, setTab] = useState(SettingTabType.GeneralSetting);
  const transI18n = useI18n();

  return (
    <div className="settings-container fcr-flex">
      <div className="left">
        <div
          className={`tab-item ${tab === SettingTabType.GeneralSetting ? 'active' : ''}`}
          onClick={() => {
            setTab(SettingTabType.GeneralSetting);
          }}>
          <div className="icon setting"></div>
          {transI18n('fcr_settings_option_general')}
        </div>
        <div
          className={`tab-item ${tab === SettingTabType.About ? 'active' : ''}`}
          onClick={() => {
            setTab(SettingTabType.About);
          }}>
          <div className="icon about"></div>
          {transI18n('fcr_settings_option_about_us')}
        </div>
      </div>
      <div className="right">
        <div
          key={SettingTabType.GeneralSetting}
          className={`tab-container ${tab === SettingTabType.GeneralSetting ? '' : 'fcr-hidden'}`}>
          <GeneralSetting />
        </div>
        <div
          key={SettingTabType.About}
          className={`tab-container ${tab === SettingTabType.About ? '' : 'fcr-hidden'}`}>
          <About />
        </div>
      </div>
    </div>
  );
};
