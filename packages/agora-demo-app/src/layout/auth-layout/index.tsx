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

    useEffect(() => {
      if (isLogin) {
        return;
      }

      // token not exists
      if (!token.accessToken) {
        return;
      }
      setLoading(true);
      // check whether the user token is expired or not
      getUserInfo().finally(() => {
        setLoading(false);
      });
    }, [isLogin, platformRedirectPaths, location.pathname]);

    const handleAccessToken = useCallback(() => {
      setLoading(true);
      getUserInfo().finally(() => {
        setLoading(false);
      });
      history.replace('/');
    }, []);

    const needAuth = !isLogin && !token.accessToken && shouldAuth;

    return needAuth ? <SSOAuth onComplete={handleAccessToken} /> : <>{children}</>;
  },
);
