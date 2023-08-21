import { forwardRef, useContext, useEffect, useImperativeHandle, useState } from 'react';
import { CheckBox } from '../checkbox';
import './index.css';
import { useLangSwitchValue } from '@app/hooks';
import RcTooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';
import classNames from 'classnames';
import { GlobalStoreContext } from '@app/stores';
import { observer } from 'mobx-react';
import { cnAgreementURL, cnPrivacyPolicyURL, naPrivacyPolicyURL } from '@app/utils';

const shakingTime = 2000;
const defaultVisibleTime = 2000;

export const UserAgreement = observer(
  forwardRef<{ check: () => void }>(function UserAgreement(props, ref) {
    const [checked, setChecked] = useState(false);
    const [tooltipVisible, setTooltipVisible] = useState(true);
    const [shaking, setShaking] = useState(false);
    const { region } = useContext(GlobalStoreContext);

    useImperativeHandle(
      ref,
      () => ({
        check: () => {
          if (checked) {
            return true;
          } else {
            setTooltipVisible(true);
            setShaking(true);
            return false;
          }
        },
      }),
      [checked],
    );

    const handleCheck = () => {
      setChecked(!checked);
      setTooltipVisible(false);
    };

    const cnMap = useLangSwitchValue({
      en: {
        agreement: (
          <div style={{ marginLeft: 8, lineHeight: '22px' }} onClick={() => setChecked(!checked)}>
            I have read and agree&nbsp;
            <a rel="noreferrer" href={cnPrivacyPolicyURL} target="_blank">
              privacy policy
            </a>
            &nbsp;and&nbsp;
            <a rel="noreferrer" href={cnAgreementURL} target="_blank">
              term of service
            </a>
          </div>
        ),
        tooltip: 'Please read and agree privacy policy and term of service',
      },
      zh: {
        agreement: (
          <div style={{ marginLeft: 8, lineHeight: '22px' }} onClick={handleCheck}>
            同意
            <a rel="noreferrer" href={cnPrivacyPolicyURL} target="_blank">
              《灵动课堂用户服务协议》
            </a>
            和
            <a rel="noreferrer" href={cnAgreementURL} target="_blank">
              《灵动课堂隐私政策》
            </a>
          </div>
        ),
        tooltip: '请阅读并同意服务协议和隐私政策',
      },
    });

    const naMap = useLangSwitchValue({
      en: {
        agreement: (
          <div style={{ marginLeft: 8 }} onClick={() => setChecked(!checked)}>
            I have read and agree&nbsp;
            <a rel="noreferrer" href={naPrivacyPolicyURL} target="_blank">
              term of service
            </a>
          </div>
        ),
        tooltip: 'Please read and agree term of service',
      },
      zh: {
        agreement: (
          <div style={{ marginLeft: 8 }} onClick={handleCheck}>
            同意
            <a rel="noreferrer" href={naPrivacyPolicyURL} target="_blank">
              《灵动课堂隐私政策》
            </a>
          </div>
        ),
        tooltip: '请阅读并同意隐私政策',
      },
    });

    useEffect(() => {
      const timeout = setTimeout(() => {
        setTooltipVisible(false);
      }, defaultVisibleTime);
      return () => {
        clearTimeout(timeout);
      };
    }, []);

    useEffect(() => {
      if (shaking) {
        const timeout = setTimeout(() => {
          setShaking(false);
        }, shakingTime);

        return () => {
          clearTimeout(timeout);
        };
      }
    }, [shaking]);

    const tooltipCls = classNames('fcr-agreement-tooltip-overlay', {
      'fcr-agreement-shake-horizontal': shaking,
    });

    const map = region === 'CN' ? cnMap : naMap;

    return (
      <div className="fcr-agreement fcr-flex fcr-items-start">
        <RcTooltip
          overlayClassName={tooltipCls}
          overlay={<div>{map?.tooltip}</div>}
          visible={tooltipVisible}
          placement="top"
          align={{
            offset: [0, -10],
          }}>
          <CheckBox checked={checked} onChange={handleCheck} />
        </RcTooltip>
        {map?.agreement}
      </div>
    );
  }),
);
