import { UserApi } from '@app/api';
import { SSOLogout } from '@app/components/sso-logout';
import { GlobalStoreContext, RoomStoreContext, UserStoreContext } from '@app/stores';
import { indexUrl, token } from '@app/utils';
import { AgoraRteEngineConfig, AgoraRteRuntimePlatform } from 'agora-rte-sdk';
import { FC, useContext, useLayoutEffect } from 'react';
import { useHistory } from 'react-router';

export const Logout = () => {
  const { setLoading } = useContext(GlobalStoreContext);
  const { setLogin, clearUserInfo } = useContext(UserStoreContext);
  const { clearRooms } = useContext(RoomStoreContext);

  const resetLoginState = () => {
    token.clear();
    clearRooms();
    clearUserInfo();
    setLogin(false);
  };

  const logout = () => {
    setLoading(true);
    return UserApi.shared
      .logoutAccount()
      .then(resetLoginState)
      .finally(() => {
        setLoading(false);
      });
  };

  return AgoraRteEngineConfig.platform !== AgoraRteRuntimePlatform.Electron ? (
    <LogoutWeb logout={logout} />
  ) : (
    <LogoutElectron logout={logout} />
  );
};

type Props = {
  logout: () => Promise<void>;
};

const LogoutWeb: FC<Props> = ({ logout }) => {
  const url = `https://sso2.agora.io/api/v0/logout?redirect_uri=${indexUrl}`;

  useLayoutEffect(() => {
    logout().then(() => {
      window.location.href = url;
    });
  }, []);

  return null;
};

const LogoutElectron: FC<Props> = ({ logout }) => {
  const history = useHistory();
  const url = `https://sso2.agora.io/api/v0/logout`;

  const logoutElectron = async () => {
    await logout();
    history.replace('/');
  };

  return <SSOLogout logoutUrl={url} onLoad={logoutElectron} />;
};
