import { CreateRoom } from '../pages/create-room';
import { H5Invite } from '../pages/invite-mobile-web';
import { H5JoinRoom } from '../pages/join-room-mobile-web';
import { InviteRoom } from '../pages/invite';
import { JoinRoom } from '../pages/join-room';
import { LaunchPage } from '../pages/launch';
import { Logout } from '../pages/logout';
import { Welcome } from '../pages/welcome';
import { Frame } from './frame';
import { PageRouter } from './type';
import { RouteComponentProps } from 'react-router';
import { Detail } from '../pages/detail';
// import { FlexPage } from '../pages/flex';
import { QuickStart } from '../pages/quick-start';
import { LaunchWindowPage } from '../pages/window';

export type AppRouteComponent = {
  path: string;
  component: (props: RouteComponentProps) => JSX.Element;
  exact?: boolean;
};

export const nestedRoutesMap = {
  // For Desktop
  [PageRouter.Welcome]: {
    path: '/',
    component: () => <Welcome />,
    exact: true,
  },
  [PageRouter.CreateRoom]: {
    path: '/create-room',
    component: () => <CreateRoom />,
    exact: true,
  },
  [PageRouter.JoinRoom]: {
    path: '/join-room',
    component: () => <JoinRoom />,
    exact: true,
  },
  [PageRouter.Detail]: {
    path: '/detail/:roomId',
    component: (props: RouteComponentProps) => <Detail {...props} />,
    exact: true,
  },
};
export const commonRoutesMap = {
  // Quickly join room, for non-china-mainland users, they can choose to join rooms while not logged in
  [PageRouter.QuickJoin]: {
    path: '/quick-start',
    component: () => <QuickStart />,
    exact: true,
  },
  [PageRouter.Invite]: {
    path: '/invite',
    component: () => <InviteRoom />,
    exact: true,
  },
  [PageRouter.Launch]: {
    path: '/launch',
    component: () => <LaunchPage />,
  },
  [PageRouter.Logout]: {
    path: '/logout',
    component: () => <Logout />,
  },
  // For Mobile Web
  [PageRouter.IndexMobileWeb]: {
    path: '/mobile',
    component: () => <H5JoinRoom />,
    exact: true,
  },
  [PageRouter.JoinRoomMobileWeb]: {
    path: '/mobile/join-room',
    component: () => <H5JoinRoom />,
    exact: true,
  },
  [PageRouter.InviteMobileWeb]: {
    path: '/mobile/invite',
    component: () => <H5Invite />,
    exact: true,
  },
  // Extra window
  [PageRouter.Window]: {
    path: '/window',
    component: () => <LaunchWindowPage />,
    exact: true,
  },
  // Animation container
  [PageRouter.Index]: {
    path: '/',
    component: () => <Frame />,
    exact: false,
  },
};

export const routesMap: Record<string, AppRouteComponent> = {
  // Debug page, no agora account required
  // [PageRouter.FlexHome]: {
  //   path: '/flex',
  //   component: () => <FlexPage />,
  //   exact: true,
  // },
  ...commonRoutesMap,
  ...nestedRoutesMap,
};
