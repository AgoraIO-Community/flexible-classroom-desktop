declare module '*.css';
declare module '*.svga';
declare module '*.svg';
declare module '*.json';
declare module '*.mp3';
declare module '*.mp4';
declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare const DEMO_VERSION: string;

interface Window {
  __launchRegion: string;
  __launchLanguage: string;
  __launchRoomName: string;
  __launchUserName: string;
  __launchRoleType: string;
  __launchRoomType: string;
  __launchCompanyId: string;
  __launchProjectId: string;
  __launchWindowID: string;
  __launchArgs: any;
  __launchUIMode: string;
}

declare module 'agora-plugin-gallery/scene' {
  declare class FcrWebviewWidget extends (await import('agora-common-libs'))
    .FcrUISceneWidget {}
  declare class FcrBoardWidget extends (await import('agora-common-libs'))
    .FcrUISceneWidget {}
  declare class FcrPollingWidget extends (await import('agora-common-libs'))
    .FcrUISceneWidget {}
  declare class FcrChatroom extends (await import('agora-common-libs')).FcrUISceneWidget {}
  declare class FcrStreamMediaPlayerWidget extends (await import('agora-common-libs'))
    .FcrUISceneWidget {}
  declare class FcrPopupQuizWidget extends (await import('agora-common-libs'))
    .FcrUISceneWidget {}
  declare class FcrCountdownWidget extends (await import('agora-common-libs'))
    .FcrUISceneWidget {}
}

declare module 'agora-plugin-gallery/classroom' {
  declare class FcrWebviewWidget extends (await import('agora-common-libs'))
    .AgoraCloudClassWidget {}
  declare class FcrBoardWidget extends (await import('agora-common-libs')).AgoraCloudClassWidget {}
  declare class AgoraSelector extends (await import('agora-common-libs')).AgoraCloudClassWidget {}
  declare class AgoraCountdown extends (await import('agora-common-libs')).AgoraCloudClassWidget {}
  declare class AgoraHXChatWidget extends (await import('agora-common-libs'))
    .AgoraCloudClassWidget {}
  declare class FcrStreamMediaPlayerWidget extends (await import('agora-common-libs'))
    .AgoraCloudClassWidget {}
  declare class AgoraPolling extends (await import('agora-common-libs')).AgoraCloudClassWidget {}
  declare class FcrWatermarkWidget extends (await import('agora-common-libs'))
    .AgoraCloudClassWidget {}
}

declare module 'agora-plugin-gallery/proctor' {
  declare class FcrWebviewWidget extends (await import('agora-common-libs'))
    .AgoraCloudClassWidget {}
}
