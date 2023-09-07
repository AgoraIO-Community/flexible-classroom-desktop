import { SSOAuth } from '@app/components/sso-auth';
import { GlobalStoreContext, UserStoreContext } from '@app/stores';
import { token } from '@app/utils';
import { observer } from 'mobx-react';
import { FC, PropsWithChildren, useCallback, useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';

type AuthLayoutProps = {
  includes?: string[];
  platformRedirectPaths?: string[];
};

export const AuthLayout: FC<PropsWithChildren<AuthLayoutProps>> = observer(
  ({ children, includes = [], platformRedirectPaths = [] }) => {
    const { isLogin, getUserInfo } = useContext(UserStoreContext);
    const { setLoading } = useContext(GlobalStoreContext);
    const location = useLocation();
    const history = useHistory();

    const shouldAuth = includes.includes(location.pathname);
    const needAuth = !isLogin && !token.accessToken && shouldAuth;

    useEffect(() => {
      if (isLogin) {
        return;
      }
      // token not exists
      if (!token.accessToken) {
        return;
      }
      // no need auth so no need to get user info
      // Fix: userinfo is always required in index page, so exclude it.
      if (location.pathname !== '/' && !shouldAuth) {
        return;
      }
      // check whether the user token is expired or not
      getUserInfo();
    }, [isLogin, platformRedirectPaths, location.pathname]);

    const handleAccessToken = useCallback(() => {
      setLoading(true);
      getUserInfo().finally(() => {
        setLoading(false);
      });
      history.replace('/');
    }, []);

    return needAuth ? <SSOAuth onComplete={handleAccessToken} /> : <>{children}</>;
  },
);
