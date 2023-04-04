import { Button } from '@app/components/button';
import { useI18n } from 'agora-common-libs/lib/i18n';
import { useState } from 'react';
import { HomeSettingContainer } from './home-setting';

export const SettingsButton = () => {
  const t = useI18n();
  const [hover, setHover] = useState(false);
  const handleOver = () => {
    setHover(true);
  };

  const handleLeave = () => {
    setHover(false);
  };

  const textColor = hover ? '#fff' : '#030303';
  const backgroundColor = hover ? '#030303' : '#fff';

  return (
    <HomeSettingContainer>
      <Button
        animate={false}
        onMouseOver={handleOver}
        onMouseLeave={handleLeave}
        style={{ background: backgroundColor, transition: 'all .2s' }}>
        <div className="flex items-center">
          {/* <SvgImg type={SvgIconEnum.SET_OUTLINE} size={16} colors={{ iconPrimary: textColor }} /> */}
          <span className="ml-1" style={{ color: textColor }}>
            {t('fcr_settings_setting')}
          </span>
        </div>
      </Button>
    </HomeSettingContainer>
  );
};
