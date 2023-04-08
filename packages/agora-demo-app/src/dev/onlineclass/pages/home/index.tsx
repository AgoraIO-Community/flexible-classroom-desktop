import { roomApi } from '@app/api';
import { GlobalStoreContext } from '@app/stores';
import { getBrowserLanguage } from '@app/utils';
import { RtmRole, RtmTokenBuilder } from 'agora-access-token';
import md5 from 'js-md5';
import { Fragment, useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { REACT_APP_AGORA_APP_SDK_DOMAIN } from '@app/utils/env';
import { v4 as uuidv4 } from 'uuid';
import { LoginForm } from './login-form';
import { MessageDialog } from './message-dialog';
import './style.css';
import { transI18n, useI18n } from 'agora-common-libs/lib/i18n';
import { Layout } from '@app/components/layout';
import { isElectron } from 'agora-onlineclass-sdk';
import { SettingsButton } from './setting-button';
import { GlobalLaunchOption } from '@app/stores/global';

const REACT_APP_AGORA_APP_ID = process.env.REACT_APP_AGORA_APP_ID;
const REACT_APP_AGORA_APP_CERTIFICATE = process.env.REACT_APP_AGORA_APP_CERTIFICATE;

const regionByLang = {
  zh: 'CN',
  en: 'NA',
};

export const HomePage = () => {
  const globalStore = useContext(GlobalStoreContext);

  const history = useHistory();

  const [duration] = useState<string>(`${30}`);

  const [loading, setLoading] = useState<boolean>(false);

  const t = useI18n();

  const defaultScenes = [{ text: t('home.roomType_interactiveSmallClass'), value: `${4}` }];

  const handleSubmit = async ({
    roleType,
    roomType: rt,
    roomName,
    userName,
  }: {
    roleType: string;
    roomType: string;
    roomName: string;
    userName: string;
  }) => {
    if (loading) {
      return;
    }
    const language = globalStore.language || getBrowserLanguage();
    const region = globalStore.region || regionByLang[getBrowserLanguage()];

    const userRole = parseInt(roleType);

    const roomType = parseInt(rt);

    const userUuid = `${md5(userName)}${userRole}`;

    const roomUuid = `${md5(roomName)}${roomType}`;

    try {
      setLoading(true);

      const sdkDomain = `${REACT_APP_AGORA_APP_SDK_DOMAIN}`;

      const { token, appId } = await roomApi.getCredentialNoAuth({
        userUuid,
        roomUuid,
        role: userRole,
      });

      const shareUrl = isElectron()
        ? ''
        : `${location.origin}${location.pathname}?roomName=${roomName}&roomType=${roomType}&region=${region}&language=${language}&roleType=2#/share`;

      console.log('## get rtm Token from demo server', token);

      const config: GlobalLaunchOption = {
        appId,
        sdkDomain,
        pretest: true,
        courseWareList: [],
        language: language,
        userUuid: `${userUuid}`,
        rtmToken: token,
        roomUuid: `${roomUuid}`,
        roomType: roomType,
        roomName: `${roomName}`,
        userName: userName,
        roleType: userRole,
        region: region,
        duration: +duration * 60,
        latencyLevel: 2,
        shareUrl,
        recordUrl: `https://solutions-apaas.agora.io/apaas/record/dev/2.8.21/record_page.html`,
      };

      config.appId = REACT_APP_AGORA_APP_ID || config.appId;
      // this is for DEBUG PURPOSE only. please do not store certificate in client, it's not safe.
      // 此处仅为开发调试使用, token应该通过服务端生成, 请确保不要把证书保存在客户端
      if (REACT_APP_AGORA_APP_CERTIFICATE) {
        config.rtmToken = RtmTokenBuilder.buildToken(
          config.appId,
          REACT_APP_AGORA_APP_CERTIFICATE,
          config.userUuid,
          RtmRole.Rtm_User,
          0,
        );

        console.log(`## build rtm Token ${config.rtmToken} by using RtmTokenBuilder`);
      }
      globalStore.setLaunchConfig(config);
      history.push('/launch');
    } catch (e) {
      globalStore.addToast({
        id: uuidv4(),
        desc:
          (e as Error).message === 'Network Error'
            ? transI18n('home.network_error')
            : (e as Error).message,
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <MessageDialog />
      <div className="app-home fcr-h-screen">
        <nav className="fcr-absolute fcr-left-0 fcr-top-0 w-full fcr-text-white fcr-z-10" style={{ padding: 32 }}>
          <Layout className="fcr-justify-between fcr-items-center">
            <Layout className="nav-header fcr-flex fcr-items-center">
              <span className="product-logo" />
              <span className="product-name">{t('home_product_name')}</span>
            </Layout>
            <Layout>
              <span className="about-btn fcr-cursor-pointer">
                <SettingsButton />
              </span>
            </Layout>
          </Layout>
        </nav>
        <div
          className="form-section fcr-fixed animated-form"
          style={{
            top: 'calc((100% - 540px) * 0.5)',
            left: 'calc((100% - 477px) * 0.81)',
            padding: '36px 54px 26px',
          }}>
          <LoginForm onSubmit={handleSubmit} sceneOptions={defaultScenes} />
        </div>
      </div>
    </Fragment>
  );
};
