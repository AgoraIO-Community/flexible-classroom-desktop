import { useState } from 'react';
import { useI18n } from 'agora-common-libs';
import './index.css';
import { CheckBox } from '@app/components/checkbox';
export const CloseAccount = () => {
  const [checked, setChecked] = useState(false);
  const transI18n = useI18n();
  return (
    <div className="close-account">
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
  );
};
