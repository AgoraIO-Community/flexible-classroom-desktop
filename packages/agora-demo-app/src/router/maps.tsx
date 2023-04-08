import React from 'react';
import { CreateRoom } from '../pages/create-room';
import { H5Invite } from '../pages/h5-invite';
import { H5JoinRoom } from '../pages/h5-join-room';
import { InviteRoom } from '../pages/invite';
import { JoinRoom } from '../pages/join-room';
import { LaunchPage } from '../pages/launch';
import { LaunchWindow } from '../pages/launch-window';
import { Logout } from '../pages/logout';
import { Welcome } from '../pages/welcome';
import { HomeRouteContainer } from './home';
import { PageRouter } from './type';
import { RouteComponentProps } from 'react-router';
import { Detail } from '../pages/detail';

export type AppRouteComponent = {
  path: string;
  component?: any;
  exact?: boolean;
};

export const routesMap: Record<string, AppRouteComponent> = {
  // Animation container
  [PageRouter.Index]: {
    path: '/',
    component: () => <HomeRouteContainer />,
    exact: false,
  },
  // For PC
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
  [PageRouter.Invite]: {
    path: '/invite',
    component: () => <InviteRoom />,
    exact: true,
  },
  [PageRouter.Launch]: {
    path: '/launch',
    component: () => <LaunchPage />,
    exact: true,
  },

  // For H5
  [PageRouter.H5Index]: {
    path: '/h5',
    component: () => <H5JoinRoom />,
    exact: true,
  },
  [PageRouter.H5JoinRoom]: {
    path: '/h5/join-room',
    component: () => <H5JoinRoom />,
    exact: true,
  },
  [PageRouter.H5Invite]: {
    path: '/h5/invite',
    component: () => <H5Invite />,
    exact: true,
  },
  [PageRouter.Window]: {
    path: '/window',
    component: () => <LaunchWindow />,
    exact: true,
  },
  [PageRouter.Logout]: {
    path: '/logout',
    component: () => <Logout />,
    exact: true,
  },
};
