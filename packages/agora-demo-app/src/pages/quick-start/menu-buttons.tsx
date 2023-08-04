import { Button } from '@app/components/button';
import { AModal } from '@app/components/modal';
import { Settings } from '@app/components/settings';
import { SvgIconEnum, SvgImg } from '@app/components/svg-img';
import { useI18n } from 'agora-common-libs';
import React, { FC, PropsWithChildren, useState } from 'react';

export const LoginButon: FC<{ onClick: () => void }> = ({ onClick }) => {
  const t = useI18n();
  return (
    <BaseButton onClick={onClick} className="fcr-quick-menu__login-button">
      {t('fcr_login_free_button_login_sign')}
    </BaseButton>
  );
};

export const SettingButton = () => {
  const t = useI18n();
  const [settingModal, setSettingModal] = useState(false);

  return (
    <React.Fragment>
      <BaseButton
        onClick={() => setSettingModal(true)}
        icon={SvgIconEnum.FCR_GEAR}
        className="fcr-quick-menu__setting-button">
        {t('fcr_login_free_button_setting')}
      </BaseButton>

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
    </React.Fragment>
  );
};

const BaseButton: FC<
  PropsWithChildren<{ onClick: () => void; icon?: SvgIconEnum; className: string }>
> = ({ children, onClick, icon, className }) => {
  return (
    <Button
      className={className}
      type="primary"
      icon={
        icon ? (
          <SvgImg
            type={icon}
            size={24}
            colors={{ iconPrimary: '#000' }}
            style={{ marginRight: 10 }}
          />
        ) : undefined
      }
      onClick={onClick}>
      {children}
    </Button>
  );
};
