import React, { FC, PropsWithChildren, useContext, useMemo } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { AuthLayout } from '../layout/auth-layout';
import { BasicLayout } from '../layout/basic-layout';
import { routesMap, commonRoutesMap } from './maps';
import { PageRouter } from './type';
import { isH5Browser } from '@app/utils/browser';
import { GlobalStoreContext } from '@app/stores';
import { LoginTypeEnum } from '@app/stores/global';

export const RouteContainer = () => {
  const globalStore = useContext(GlobalStoreContext);
  const browserPlatformRedirectPaths = useMemo(() => {
    const list = [
      PageRouter.Index,
      PageRouter.IndexMobileWeb,
      PageRouter.InviteMobileWeb,
      PageRouter.JoinRoomMobileWeb,
    ];
    return list.map((v) => routesMap[v].path);
  }, []);

  const authIncludes = useMemo(() => {
    const list = [PageRouter.CreateRoom, PageRouter.Detail];
    if (globalStore.loginType === LoginTypeEnum.NeedLogin) {
      list.push(PageRouter.JoinRoom);
    }
    return list.map((v) => routesMap[v].path);
  }, []);

  return (
    <HashRouter>
      <PlatformRedirect browserPlatformRedirectPaths={browserPlatformRedirectPaths}>
        <BasicLayout>
          <AuthLayout includes={authIncludes} platformRedirectPaths={browserPlatformRedirectPaths}>
            <Switch>
              {Object.keys(commonRoutesMap).map((item, index) => {
                const route = routesMap[item];
                return (
                  <Route
                    key={item + index}
                    exact={!!route.exact}
                    path={route.path}
                    component={route.component}
                  />
                );
              })}
            </Switch>
          </AuthLayout>
        </BasicLayout>
      </PlatformRedirect>
    </HashRouter>
  );
};

const PlatformRedirect: FC<PropsWithChildren<{ browserPlatformRedirectPaths: string[] }>> = ({
  children,
  browserPlatformRedirectPaths,
}) => {
  const history = useHistory();
  const location = useLocation();
  if (browserPlatformRedirectPaths.includes(location.pathname)) {
    const isH5 = isH5Browser();
    // redirect to mobile web page
    if (isH5 && !location.pathname.match('/mobile')) {
      const url = window.location.hash.replace('#/', '/mobile/');

      history.push(url);
      return null;
    }
    // redirect to desktop web page
    if (!isH5 && location.pathname.match('/mobile')) {
      const url = window.location.hash.replace('#/mobile', '');

      history.push(url);
      return null;
    }
  }

  return <React.Fragment>{children}</React.Fragment>;
};
