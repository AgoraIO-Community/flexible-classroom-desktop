import { Route, Switch, useLocation } from 'react-router';
import { SliderAnimation } from '../components/page-animation';
import { HomeLayout } from '../layout/home-layout';
import { routesMap } from './maps';
import { PageRouter } from './type';

// here are the nested routes
const homeRoutes: PageRouter[] = [
  PageRouter.CreateRoom,
  PageRouter.Welcome,
  PageRouter.JoinRoom,
  PageRouter.Invite,
  PageRouter.Detail,
];

export const Frame = () => {
  const location = useLocation();
  return (
    <HomeLayout>
      <SliderAnimation>
        <Switch location={location}>
          {homeRoutes.map((item, index) => {
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
      </SliderAnimation>
    </HomeLayout>
  );
};
