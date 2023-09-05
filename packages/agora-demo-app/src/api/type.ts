import { SceneType } from '@app/type';
import type { EduRoleTypeEnum, EduRoomTypeEnum } from 'agora-edu-core';

export enum RoomState {
  NO_STARTED,
  GOING,
  ENDED,
}

export type RoomInfo = {
  roomName: string;
  creatorId: string;
  roomId: string;
  //@deprecated
  roomType?: number;
  roomState: RoomState;
  startTime: number;
  endTime: number;
  industry?: string;
  roleConfig?: Record<number, number>;
  roomProperties: RoomProperties;
  role: EduRoleTypeEnum; // 上次加入房间的角色
  userName: string;
  duration: number;
  sceneType: SceneType;
};

export type RoomListRequest = {
  nextId?: string;
  count?: number;
};

export type RoomListResponse = {
  total: number;
  nextId: string;
  count: number;
  list: RoomInfo[];
};
type RoomProperties = Record<string, any>;
export type RoomCreateRequest = {
  roomName: string;
  //@deprecated
  roomType?: EduRoomTypeEnum;
  startTime: number;
  endTime: number;
  userName?: string;
  roomProperties?: RoomProperties;
  sceneType: SceneType;
  widgets?: Record<string, any>;
  processes?: {
    handsUp?: {
      defaultAcceptRole?: EduRoleTypeEnum | string;
    };
  };

  roleConfigs?: {
    [key: number]: {
      limit: number;
      defaultStream: {
        audioState: 0 | 1;
        videoState: 0 | 1;
      };
    };
  };
};

export type RoomCreateNoAuthRequest = RoomCreateRequest & {
  userUuid: string;
};

export type RoomCreateResponse = {
  roomId: string;
};

export type RoomJoinRequest = {
  roomId: string;
  role: EduRoleTypeEnum;
  userUuid?: string;
  userName?: string;
};

export type RoomJoinNoAuthRequest = RoomJoinRequest & {
  userUuid: string;
};

export type RoomJoinResponse = {
  token: string;
  appId: string;
  roomDetail: RoomInfo;
};

export type RoomCredentialRequest = {
  roomUuid: string;
  userUuid: string;
  role: number;
};

export type RoomCredentialResponse = {
  appId: string;
  token: string;
  roomUuid: string;
  userUuid: string;
  role: number;
};

export type RoomCredentialNoAuthRequest = {
  roomUuid: string;
  userUuid: string;
  role: number;
};

export type RoomCredentialNoAuthResponse = {
  appId: string;
  token: string;
  roomUuid: string;
  userUuid: string;
  role: number;
};
export interface AttendanceTracking {
  joinTime: number;
  sumTime: number;
  userName: string;
}
export interface EngagementTracking {
  pollingCount: number;
  popupQuizCorrectCount: number;
  popupQuizInCorrectCount: number;
  raiseHandCount: number;
  userName: string;
}
export enum RecordState {
  Start = 1,
  End,
}
export interface RecordDetail {
  recordState: RecordState;
  recordUrls: string[];
  sumTime: number;
}
export interface RoomMessage {
  //@deprecated
  roomType?: EduRoomTypeEnum;
  sceneType: SceneType;
  roomUuid: string;
}
export interface AcademicMessage {
  [AcademicMessageKeyEnum.AttendanceTracking]: AttendanceTracking[];
  [AcademicMessageKeyEnum.EngagementTracking]: EngagementTracking[];
}
export interface RoomHistory {
  academicMessageDTO: AcademicMessage;
  recordDetailDTOs: RecordDetail[];
  roomMessageDTO: RoomMessage;
}
export enum AcademicMessageKeyEnum {
  AttendanceTracking = 'attendanceTrackingDTOs',
  EngagementTracking = 'engagementTrackingDTOs',
}
