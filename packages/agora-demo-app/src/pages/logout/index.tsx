import { UserApi } from '@app/api';
import { SSOLogout } from '@app/components/sso-logout';
import { RoomStoreContext, UserStoreContext } from '@app/stores';
import { indexUrl, token } from '@app/utils';
import { AgoraRteEngineConfig, AgoraRteRuntimePlatform } from 'agora-rte-sdk';
import { useContext, useLayoutEffect } from 'react';
import { useHistory } from 'react-router';

export const Logout = () => {
  const { setLogin, clearUserInfo } = useContext(UserStoreContext);
  const { clearRooms } = useContext(RoomStoreContext);
  const history = useHistory();
  const url = `https://sso2.agora.io/api/v0/logout?redirect_uri=${indexUrl}`;

  useLayoutEffect(() => {
    if (AgoraRteEngineConfig.platform !== AgoraRteRuntimePlatform.Electron) {
      logoutWeb();
    }
  }, []);
  const logoutWeb = () => {
    logout();
    window.location.href = url;
  };
  const logout = () => {
    UserApi.shared.logoutAccount();
    token.clear();
    clearRooms();
    clearUserInfo();
    setLogin(false);
  };
  const logoutElectron = () => {
    logout();
    history.replace('/');
  };

  return <SSOLogout logoutUrl={url} onLoad={logoutElectron} />;
};
