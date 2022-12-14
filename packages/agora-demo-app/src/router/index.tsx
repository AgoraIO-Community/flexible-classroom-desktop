import { useMemo } from 'react';
import { Route, Switch } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { AuthLayout } from '../layout/auth-layout';
import { BasicLayout } from '../layout/basic-layout';
import { routesMap } from './maps';
import { PageRouter } from './type';

const routes: PageRouter[] = [
  PageRouter.Logout,
  PageRouter.PretestPage,
  PageRouter.Setting,
  PageRouter.OneToOne,
  PageRouter.MidClass,
  PageRouter.BigClass,
  PageRouter.Launch,
  PageRouter.RecordationSearchPage,
  PageRouter.Window,
  PageRouter.ShareLinkPage,
  PageRouter.FlexH5Home,
  PageRouter.FlexHome,
  PageRouter.VocationalHome,
  PageRouter.VocationalHomeH5Home,
  PageRouter.H5Index,
  PageRouter.H5JoinRoom,
  PageRouter.H5Invite,
  PageRouter.Index,
  PageRouter.Detail,
];

export const RouteContainer = () => {
  const browserPlatformRedirectPaths = useMemo(() => {
    const list = [
      PageRouter.Index,
      PageRouter.Welcome,
      PageRouter.JoinRoom,
      PageRouter.CreateRoom,
      PageRouter.Detail,
      PageRouter.Invite,
      PageRouter.H5Index,
      PageRouter.H5JoinRoom,
      PageRouter.H5Invite,
    ];
    return list.map((v) => routesMap[v].path);
  }, []);

  const authIncludes = useMemo(() => {
    const list = [PageRouter.JoinRoom, PageRouter.CreateRoom, PageRouter.Invite, PageRouter.Detail];
    return list.map((v) => routesMap[v].path);
  }, []);

  return (
    <HashRouter>
      <BasicLayout>
        <AuthLayout includes={authIncludes} platformRedirectPaths={browserPlatformRedirectPaths}>
          <Switch>
            {routes.map((item, index) => {
              const route = routesMap[item];
              if (!route) return null;
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
    </HashRouter>
  );
};
