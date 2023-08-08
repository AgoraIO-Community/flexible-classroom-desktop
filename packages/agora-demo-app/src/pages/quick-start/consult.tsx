import { SvgImg, SvgIconEnum } from '@app/components/svg-img';
import { FC, PropsWithChildren, useState } from 'react';
import _ToolTip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';
import { useI18n } from 'agora-common-libs';

export const Consult = () => {
  const t = useI18n();
  const [pmCardVisible, setPmCardVisible] = useState(false);

  const handleOpenLink = () => {
    window.open('https://doc.shengwang.cn/doc/flexible-classroom/homepage', '_blank');
  };

  return (
    <div className="fcr-quick-intro">
      <Tooltip
        disabled={pmCardVisible}
        content={
          <Panel
            title={t('fcr_help_button_feedback')}
            content={t('fcr_help_tips_feedback_content')}
          />
        }>
        <div className="fcr-quick-intro__part" onClick={() => setPmCardVisible(true)}>
          <SvgImg
            type={SvgIconEnum.FCR_HOME_SEEKADVICCEFROM}
            size={32}
            colors={{ iconPrimary: 'currentColor' }}
          />
          <div style={{ width: 32 }}>{t('fcr_help_button_feedback')}</div>
        </div>
      </Tooltip>
      <div className="fcr-quick-intro-divider" />
      <Tooltip
        disabled={pmCardVisible}
        content={
          <Panel
            title={t('fcr_help_tips_download_title')}
            content={t('fcr_help_tips_download_content')}
          />
        }>
        <div className="fcr-quick-intro__part" onClick={handleOpenLink}>
          <SvgImg
            type={SvgIconEnum.FCR_DOWNLOADAPP}
            size={32}
            colors={{ iconPrimary: 'currentColor' }}
          />
        </div>
      </Tooltip>
      <div className="fcr-quick-intro-divider" />
      <Tooltip
        disabled={pmCardVisible}
        content={
          <Panel
            title={t('fcr_help_tips_documentation_title')}
            content={t('fcr_help_tips_documentation_content')}
          />
        }>
        <div className="fcr-quick-intro__part" onClick={handleOpenLink}>
          <SvgImg
            type={SvgIconEnum.FCR_QUESTION}
            size={32}
            colors={{ iconPrimary: 'currentColor' }}
          />
        </div>
      </Tooltip>
      {pmCardVisible && <PMCard onClose={() => setPmCardVisible(false)} />}
    </div>
  );
};

const PMCard: FC<{ onClose: () => void }> = ({ onClose }) => {
  const t = useI18n();
  return (
    <div className="fcr-quick-intro__pm-card">
      <div className="fcr-quick-tip__close" onClick={onClose}>
        <SvgImg type={SvgIconEnum.CLOSE} size={18} />
      </div>
      <p className="fcr-quick-intro__consult-info">{t('fcr_feedback_label_feedback_title')}</p>
      <div className="fcr-quick-intro__main">
        <div className="fcr-quick-intro__left">
          <div className="fcr-quick-intro__info1">
            <div>
              <div className="fcr-quick-intro__avatar-wrap">
                <img src={require('../../assets/pm-avatar.png')} />
              </div>
            </div>
            <div className="fcr-quick-intro__info1__name">
              <div>{t('fcr_feedback_label_pm_name')}</div>
              <div className="fcr-quick-intro__info1__name-title">
                <span>{t('fcr_feedback_label_fcr')}</span>
                <span>{t('fcr_feedback_label_pm')}</span>
              </div>
            </div>
          </div>
          <div className="fcr-quick-intro__info2">{t('fcr_feedback_label_content1')}</div>
          <div className="fcr-quick-intro__info3">{t('fcr_feedback_label_content2')}</div>
          <div className="fcr-quick-intro__info4">
            <span>E-mail:</span> <span>{t('fcr_feedback_label_email')}</span>
          </div>
        </div>
        <div className="fcr-quick-intro__right">
          <div className="fcr-quick-intro__qrcode-wrap">
            <img src={require('../../assets/pm-qrcode.png')} />
            <span>{t('fcr_feedback_label_wecom')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Tooltip: FC<PropsWithChildren<{ content: React.ReactElement; disabled: boolean }>> = ({
  children,
  content,
  disabled,
}) => {
  return disabled ? (
    (children as any)
  ) : (
    <_ToolTip
      overlay={content}
      trigger={'hover'}
      overlayClassName="fcr-quick-tooltip-overlay"
      align={{
        offset: [20],
      }}>
      {children as any}
    </_ToolTip>
  );
};

const Panel: FC<{ title: string; content: string }> = ({ title, content }) => {
  return (
    <div className="fcr-quick-intro__panel">
      <div className="fcr-quick-intro__panel-title">{title}</div>
      <div className="fcr-quick-intro__panel-content">{content}</div>
    </div>
  );
};