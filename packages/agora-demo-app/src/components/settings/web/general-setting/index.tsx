import { GlobalStoreContext } from '@app/stores';
import { observer } from 'mobx-react';
import { useContext } from 'react';
import { FcrMultiThemeMode } from 'agora-common-libs';
import { useI18n } from 'agora-common-libs';
import './index.css';
import { RadioGroup } from '@app/components/radio';

const languageOptions = [
  { label: '中文', value: 'zh' },
  { label: 'English', value: 'en' },
];

const regionOptions = [
  { label: 'NA', value: 'NA' },
  { label: 'CN', value: 'CN' },
  { label: 'EU', value: 'EU' },
  { label: 'AP', value: 'AP' },
];

export const GeneralSetting = observer(() => {
  const { language, setLanguage, region, setRegion, theme, setTheme } =
    useContext(GlobalStoreContext);
  const transI18n = useI18n();

  const themeOptions = [
    { value: FcrMultiThemeMode.light, label: transI18n('fcr_settings_theme_light') },
    { value: FcrMultiThemeMode.dark, label: transI18n('fcr_settings_theme_dark') },
  ];

  return (
    <div className="general-setting fcr-leading-8">
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
    </div>
  );
});
