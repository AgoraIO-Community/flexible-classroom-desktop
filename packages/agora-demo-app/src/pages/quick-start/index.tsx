import { useContext, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { SvgIconEnum, SvgImg } from '@app/components/svg-img';
import { ATabs } from '@app/components/tabs';
import { useHistory } from 'react-router';
import './index.css';
import { CreateForm } from './create-form';
import { JoinForm } from './join-form';
import { UserAgreement } from '@app/components/user-agreement';
import { useI18n } from 'agora-common-libs';
import { SceneType } from '@app/type';
import { LoginButon, SettingButton } from './menu-buttons';
import { Consult } from './consult';
import { GlobalStoreContext, UserStoreContext } from '@app/stores';
import { parseHashUrlQuery } from '@app/utils/url';

export const QuickStart = observer(() => {
  const t = useI18n();
  const homeStore = useContext(GlobalStoreContext);
  const agreementRef = useRef<{ check: () => void }>(null);
  const [quickTipVisible, setQuickTipVisible] = useState(true);
  const history = useHistory();
  const { isLogin } = useContext(UserStoreContext);
  const params = useMemo(() => {
    return parseHashUrlQuery(window.location.hash);
  }, []);

  const isInviteUrl = !!params.roomId;

  const defaultScenes = [
    {
      text: t('fcr_home_label_class_mode_1on1'),
      value: SceneType.OneOnOne,
    },
    {
      text: t('fcr_home_label_class_mode_small_classroom'),
      value: SceneType.SmallClass,
    },
    {
      text: t('fcr_home_label_class_mode_lecture_hall'),
      value: SceneType.LectureHall,
    },
    {
      text: t('fcr_home_label_class_mode_proctoring'),
      value: SceneType.Proctoring,
    },
    {
      text: `${t('fcr_home_label_class_mode_cloud_class')}`,
      value: SceneType.Scene,
    },
  ];

  const tabs = [
    {
      id: '2',
      label: t('fcr_login_free_option_join'),
      key: 'join',
      children: (
        <JoinForm
          onSubmit={() => {
            return agreementRef.current?.check() ?? false;
          }}
        />
      ),
    },
  ];

  if (!isInviteUrl) {
    tabs.unshift({
      id: '1',
      label: t('fcr_login_free_option_create'),
      key: 'create',
      children: (
        <CreateForm
          onSubmit={() => {
            return agreementRef.current?.check() ?? false;
          }}
          sceneOptions={defaultScenes}
        />
      ),
    });
  }

  const toCreateRoomPage = () => {
    if (agreementRef.current?.check()) {
      history.push('/create-room');
    }
  };

  const formCls = classNames('fcr-quick-form', {
    'fcr-quick-single-tab': isInviteUrl,
  });

  return (
    <div className={`fcr-quick-start fcr-${homeStore.language}`}>
      {/* header */}
      <div className="fcr-quick-header">
        <div className="fcr-logo">
          <img src={require('../../assets/favicon.png')} width={32} height={32} />
          {t('fcr_feedback_label_fcr')}
        </div>
        <div className="fcr-quick-header__buttons">
          {!isLogin && <LoginButon onClick={toCreateRoomPage} />}
          <SettingButton />
        </div>
      </div>
      <div className="fcr-quick-container">
        {/* quick start form */}
        <div className={formCls}>
          <p>{t('fcr_login_free_label_quick_start')}</p>
          <ATabs items={tabs}></ATabs>
          <UserAgreement ref={agreementRef} />
        </div>
        {/* footer */}
        <div className="fcr-quick-footer">Version: Flexible Classroom_{DEMO_VERSION}</div>
      </div>
      {/* quick tip */}
      {quickTipVisible && (
        <div className="fcr-quick-tip">
          <div className="fcr-quick-tip__close" onClick={() => setQuickTipVisible(false)}>
            <SvgImg type={SvgIconEnum.CLOSE} size={10.6} />
          </div>
          {t('fcr_login_free_tips_login_guide')}
          {/* <p>
            <a className="fcr-quick-tip__sign-in-link" href="/#/" onClick={toCreateRoomPage}>
              {t('fcr_login_free_tips_login_guide_sign_in')}
            </a>
          </p> */}
        </div>
      )}
      {/* product manager introduction */}
      <Consult />
    </div>
  );
});
