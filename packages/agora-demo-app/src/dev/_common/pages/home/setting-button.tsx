import { Button } from '@app/components/button';
import { useI18n } from 'agora-common-libs';
import { Fragment, useState } from 'react';
import { AModal } from '@app/components/modal';
import { Settings } from '@app/components/settings';

export const SettingsButton = () => {
  const t = useI18n();
  const [hover, setHover] = useState(false);
  const [settingModal, setSettingModal] = useState(false);

  const handleOver = () => {
    setHover(true);
  };

  const handleLeave = () => {
    setHover(false);
  };
  const handleClick = () => {
    setSettingModal(true);
  };

  const textColor = hover ? '#fff' : '#030303';
  const backgroundColor = hover ? '#030303' : '#fff';

  return (
    <Fragment>
      <Button
        animate={false}
        onMouseOver={handleOver}
        onMouseLeave={handleLeave}
        style={{ background: backgroundColor, transition: 'all .2s' }}
        onClick={handleClick}>
        <div className="fcr-flex fcr-items-center">
          <span className="fcr-ml-1" style={{ color: textColor }}>
            {t('fcr_settings_setting')}
          </span>
        </div>
      </Button>
      <AModal
        className="setting-modal-container"
        open={settingModal}
        centered
        bodyStyle={{ padding: 0 }}
        title={t('fcr_settings_setting')}
        width={730}
        onCancel={() => {
          setSettingModal(false);
        }}
        footer={false}>
        <Settings />
      </AModal>
    </Fragment>
  );
};
