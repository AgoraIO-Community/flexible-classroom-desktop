import { CheckBox } from '@app/components/checkbox';
import { useLogout } from '@app/hooks';
import { useI18n } from 'agora-common-libs';
import { observer } from 'mobx-react';
import { FC, useState } from 'react';
import { SettingsMenuEnum } from '.';
import { ConfirmDialogH5 } from './components/confirm-dialog';
import { PageLayout } from './components/page-layout';

interface CloseAccountProps {
  removeMenuPopup: (menu: SettingsMenuEnum) => void;
}

export const CloseAccount: FC<CloseAccountProps> = observer(({ removeMenuPopup }) => {
  const transI18n = useI18n();
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [checked, setChecked] = useState(false);
  const { logout } = useLogout();

  return (
    <PageLayout
      title={transI18n('settings_close_account')}
      onBack={() => {
        removeMenuPopup(SettingsMenuEnum.CloseAccount);
      }}>
      <div className="fcr-leading-6 fcr-px-6 fcr-py-6">
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
      <div
        className={`close-account-submit-btn fcr-px-6 fcr-rounded-md fcr-border fcr-border-slate-200 fcr-text-slate-900 fcr-absolute fcr-inset-x-0 fcr-flex fcr-justify-center fcr-items-center ${
          checked ? '' : 'disabled'
        }`}
        onClick={() => {
          checked && setConfirmDialog(true);
        }}>
        {transI18n('settings_logoff_submit')}
      </div>
      {confirmDialog ? (
        <ConfirmDialogH5
          title={transI18n('fcr_alert_title')}
          okText={transI18n('settings_logoff_submit')}
          context={transI18n('settings_logoff_alert')}
          onOk={logout}
          onCancel={() => {
            setConfirmDialog(false);
          }}
        />
      ) : null}
    </PageLayout>
  );
});
