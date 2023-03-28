import { SvgIconEnum, SvgImg } from '@app/components/svg-img';
import { useI18n } from 'agora-common-libs';
import { FC, useState } from 'react';
import { About } from './about';
import { GeneralSetting } from './general-setting';
import './index.css';

enum HomeSettingTabType {
  GeneralSetting = 'general-setting',
  About = 'about',
}

export const HomeSetting = () => {
  const [tab, setTab] = useState(HomeSettingTabType.GeneralSetting);
  const transI18n = useI18n();
  return (
    <div className="home-setting-content flex">
      <div className="left">
        <div
          className={`tab-item ${tab === HomeSettingTabType.GeneralSetting ? 'active' : ''}`}
          onClick={() => {
            setTab(HomeSettingTabType.GeneralSetting);
          }}>
          <div className="icon setting"></div>
          {transI18n('fcr_settings_option_general')}
        </div>
        <div
          className={`tab-item ${tab === HomeSettingTabType.About ? 'active' : ''}`}
          onClick={() => {
            setTab(HomeSettingTabType.About);
          }}>
          <div className="icon about"></div>
          {transI18n('fcr_settings_option_about_us')}
        </div>
      </div>
      <div className="right">
        <div
          key={HomeSettingTabType.GeneralSetting}
          className={`tab-container ${tab === HomeSettingTabType.GeneralSetting ? '' : 'hidden'}`}>
          <GeneralSetting />
        </div>
        <div
          key={HomeSettingTabType.About}
          className={`tab-container ${tab === HomeSettingTabType.About ? '' : 'hidden'}`}>
          <About />
        </div>
      </div>
    </div>
  );
};

export const HomeSettingContainer: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const t = useI18n();
  return (
    <>
      {children ? (
        <div
          onClick={() => {
            setVisible(true);
          }}>
          {children}
        </div>
      ) : (
        <div
          className="setting-btn inline-block p-0.5 z-50"
          onClick={() => {
            setVisible(true);
          }}>
          {t('fcr_settings_setting')}
        </div>
      )}
      {visible ? (
        <div className={`absolute top-0 left-0 flex justify-center items-center w-screen h-screen`}>
          <div className="home-setting-modal-container">
            <div className="home-setting-title">
              {t('fcr_settings_setting')}
              <div className="btn-pin">
                <SvgImg
                  type={SvgIconEnum.CLOSE}
                  className="cursor-pointer"
                  onClick={() => {
                    setVisible(false);
                  }}
                />
              </div>
            </div>
            <HomeSetting />
          </div>
        </div>
      ) : null}
    </>
  );
};
