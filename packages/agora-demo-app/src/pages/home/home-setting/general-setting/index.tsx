import { Button } from '@app/components/button';
import { CheckBox } from '@app/components/checkbox';
import { Modal } from '@app/components/modal';
import { RadioGroup } from '@app/components/radio';
import { useLogout } from '@app/hooks';
import { GlobalStoreContext } from '@app/stores';
import { FcrMultiThemeMode, transI18n } from 'agora-common-libs';
import { observer } from 'mobx-react';
import { useContext, useState } from 'react';
import './index.css';

const languageOptions = [
  { label: '中文', value: 'zh' },
  { label: 'English', value: 'en' },
];

const regionOptions = [
  { label: 'NA', value: 'NA' },
  { label: 'AP', value: 'AP' },
  { label: 'CN', value: 'CN' },
  { label: 'EU', value: 'EU' },
];

export const GeneralSetting = observer(() => {
  const { language, setLanguage, region, setRegion, theme, setTheme } =
    useContext(GlobalStoreContext);
  const [closeAccountModal, setCloseAccountModal] = useState(false);
  const [checked, setChecked] = useState(false);
  const { logout } = useLogout();
  const themeOptions = [
    { value: FcrMultiThemeMode.light, label: transI18n('fcr_settings_theme_light') },
    { value: FcrMultiThemeMode.dark, label: transI18n('fcr_settings_theme_dark') },
  ];

  return (
    <div className="general-setting leading-8">
      <div className="item">
        <div className="title">{transI18n('fcr_settings_label_language')}</div>
        <div className="form">
          <RadioGroup
            name="language"
            radios={languageOptions}
            onChange={setLanguage}
            value={language}
          />
        </div>
      </div>
      <div className="item">
        <div className="title">{transI18n('fcr_settings_label_region')}</div>
        <div className="form">
          <RadioGroup name="region" radios={regionOptions} onChange={setRegion} value={region} />
        </div>
      </div>
      <div className="item">
        <div className="title">{transI18n('fcr_settings_theme')}</div>
        <div className="form">
          <RadioGroup name="theme" radios={themeOptions} onChange={setTheme} value={theme} />
        </div>
      </div>
      <p>
        <button
          className="px-4 rounded-md border border-slate-600 text-slate-600"
          type="button"
          onClick={() => {
            setCloseAccountModal(true);
          }}>
          {transI18n('settings_close_account')}
        </button>
      </p>
      {closeAccountModal && (
        <Modal
          title={transI18n('settings_close_account')}
          hasMask
          closable
          className="close-account-modal"
          maskClosable
          onOk={() => {
            logout().finally(() => {
              setCloseAccountModal(false);
            });
          }}
          onCancel={() => {
            setCloseAccountModal(false);
          }}
          footer={[
            <Button key="ok" type={true ? 'primary' : 'ghost'} disabled={!checked} action="ok">
              {transI18n('settings_logoff_submit')}
            </Button>,
          ]}>
          <div className="close-account-conte">
            <p>{transI18n('settings_logoff_detail.1')}</p>
            <p>{transI18n('settings_logoff_detail.2')}</p>
            <p>{transI18n('settings_logoff_detail.3')}</p>
            <p>{transI18n('settings_logoff_detail.4')}</p>
            <p className="close-account-checkbox">
              <CheckBox
                text={transI18n('settings_logoff_agreenment')}
                onChange={() => {
                  setChecked(!checked);
                }}
                checked={checked}
              />
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
});
