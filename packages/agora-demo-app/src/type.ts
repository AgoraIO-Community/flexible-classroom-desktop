import type { EduRoomTypeEnum } from 'agora-edu-core';

export enum SceneType {
  OneOnOne = 0,
  LectureHall = 2,
  SmallClass = 4,
  Proctoring = 6,
  Onlineclass = 10,
}
export enum FcrUISceneSdk {
  AgoraEduSdk = 'agora-edu-sdk',
  AgoraProctorSdk = 'agora-proctor-sdk',
  AgoraOnlineclassSdk = 'agora-onlineclass-sdk',
}
export enum LoginType {
  NoNeedLogin = 0,
  NeedLogin = 1,
}
export const FcrUISceneSdkMap = {
  [SceneType.OneOnOne | SceneType.LectureHall | SceneType.SmallClass]: FcrUISceneSdk.AgoraEduSdk,
  [SceneType.Proctoring]: FcrUISceneSdk.AgoraProctorSdk,
  [SceneType.Onlineclass]: FcrUISceneSdk.AgoraOnlineclassSdk,
};
export const FcrRoomType: Record<SceneType, EduRoomTypeEnum> = {
  [SceneType.OneOnOne]: 0,
  [SceneType.LectureHall]: 2,
  [SceneType.SmallClass]: 4,
  [SceneType.Proctoring]: 6,
  [SceneType.Onlineclass]: 4,
};
