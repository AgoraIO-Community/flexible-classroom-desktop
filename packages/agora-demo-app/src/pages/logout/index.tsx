import { UserApi } from '@app/api';
import { SSOLogout } from '@app/components/sso-logout';
import { GlobalStoreContext, RoomStoreContext, UserStoreContext } from '@app/stores';
import { indexUrl, token } from '@app/utils';
import { isElectron } from 'agora-rte-sdk/lib/core/utils/utils';

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

  const logout = async () => {
    if (token.accessToken) {
      setLoading(true);
      return UserApi.shared
        .logoutAccount()
        .then(resetLoginState)
        .catch(() => {})
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return isElectron() ? <LogoutElectron logout={logout} /> : <LogoutWeb logout={logout} />;
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
