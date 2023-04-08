import { RtmRole, RtmTokenBuilder } from 'agora-access-token';
import { EduRoleTypeEnum, EduRoomTypeEnum, Platform } from 'agora-edu-core';
import { AgoraLatencyLevel, AgoraRegion } from 'agora-rte-sdk';
import { useCallback, useContext } from 'react';
import { useHistory } from 'react-router';
import { GlobalStoreContext, RoomStoreContext, UserStoreContext } from '../stores';
import { GlobalLaunchOption } from '../stores/global';
import { checkRoomInfoBeforeJoin, ErrorCode, h5ClassModeIsSupport, Status } from '../utils';
import { checkBrowserDevice } from '../utils/browser';
import {
  REACT_APP_AGORA_APP_CERTIFICATE,
  REACT_APP_AGORA_APP_ID,
  REACT_APP_AGORA_APP_SDK_DOMAIN,
} from '../utils/env';
import { shareLink } from '../utils/share';
import { LanguageEnum } from 'agora-classroom-sdk';
import { failResult } from './../utils/result';
import { roomApi } from '@app/api';

type JoinRoomParams = {
  role: EduRoleTypeEnum;
  roomType: EduRoomTypeEnum;
  roomName: string;
  userName: string;
  roomId: string;
  userId: string;
  duration?: number;
  token: string;
  appId: string;
  language: LanguageEnum;
  region: AgoraRegion;
  platform?: Platform;
  latencyLevel: AgoraLatencyLevel;
};
type QuickJoinRoomParams = {
  role: EduRoleTypeEnum;
  roomId: string;
  nickName: string;
  platform: Platform;
  userId: string;
};

type JoinRoomOptions = Pick<GlobalLaunchOption, 'shareUrl' | 'uiMode'> & {
  roomProperties?: Record<string, any>;
};

export const needPreset = (roleType: EduRoleTypeEnum) => {
  if (roleType === EduRoleTypeEnum.invisible) {
    return false;
  }

  return true;
};

type ShareURLParams = {
  region: AgoraRegion;
  roomId: string;
  owner: string;
};

const shareLinkInClass = ({ roomId, owner }: ShareURLParams) => {
  const companyId = window.__launchCompanyId;
  const projectId = window.__launchProjectId;
  const region = window.__launchRegion;
  let url = shareLink.generateUrl({
    owner,
    roomId: roomId,
    role: EduRoleTypeEnum.student,
  });
  if (companyId && projectId) {
    url = url + `&companyId=${companyId}&projectId=${projectId}&region=${region}`;
  }
  return url;
};

const defaultPlatform = checkBrowserDevice();
export const useJoinRoom = () => {
  const history = useHistory();
  const userStore = useContext(UserStoreContext);
  const roomStore = useContext(RoomStoreContext);
  const { language, region, setLaunchConfig } = useContext(GlobalStoreContext);

  const joinRoomHandle = useCallback(
    async (params: JoinRoomParams, options: JoinRoomOptions = {}) => {
      const {
        role,
        roomType,
        roomName,
        userName,
        roomId,
        userId,
        latencyLevel,
        token,
        appId,
        language,
        region,
        duration = 30,
        platform = defaultPlatform,
      } = params;

      if (platform === Platform.H5) {
        const checkResult = h5ClassModeIsSupport(roomType);
        if (checkResult.status === Status.Failed) {
          return Promise.reject(checkResult);
        }
      }

      if (!userId) {
        return Promise.reject(failResult(ErrorCode.USER_ID_EMPTY));
      }

      if (!userName) {
        return Promise.reject(failResult(ErrorCode.USER_NAME_EMPTY));
      }

      const shareUrl = shareLinkInClass({ region, roomId, owner: userStore.nickName });

      console.log('## get rtm Token from demo server', token);

      const needPretest = needPreset(role);

      const isProctoring = roomType === EduRoomTypeEnum.RoomProctor;

      const sdkDomain = `${REACT_APP_AGORA_APP_SDK_DOMAIN}`;

      const webRTCCodec = isProctoring ? 'h264' : 'vp8';
      const config: GlobalLaunchOption = {
        appId: REACT_APP_AGORA_APP_ID || appId,
        sdkDomain,
        pretest: needPretest,
        courseWareList: [],
        userUuid: userId,
        rtmToken: token,
        roomUuid: roomId,
        roomType: roomType,
        roomName: `${roomName}`,
        userName: userName,
        roleType: role,
        region: region,
        language: language,
        duration: +duration * 60,
        latencyLevel,
        userFlexProperties: options.roomProperties || {},
        shareUrl,
        platform,
        mediaOptions: {
          web: {
            codec: webRTCCodec,
          },
          screenShareEncoderConfiguration: isProctoring
            ? {
                width: 1280,
                height: 720,
                frameRate: 15,
                bitrate: 1130,
              }
            : undefined,
        },
      };

      // this is for DEBUG PURPOSE only. please do not store certificate in client, it's not safe.
      // 此处仅为开发调试使用, token应该通过服务端生成, 请确保不要把证书保存在客户端
      if (REACT_APP_AGORA_APP_CERTIFICATE) {
        config.rtmToken = RtmTokenBuilder.buildToken(
          config.appId,
          REACT_APP_AGORA_APP_CERTIFICATE,
          config.userUuid,
          RtmRole.Rtm_User,
          0,
        );
        console.log(`## build rtm Token ${config.rtmToken} by using RtmTokenBuilder`);
      }
      setLaunchConfig(config);
      history.push('/launch');
    },
    [],
  );

  const quickJoinRoom = useCallback(
    async (params: QuickJoinRoomParams) => {
      const { roomId, role, nickName, userId, platform = defaultPlatform } = params;
      const {
        data: { data: roomInfo },
      } = await roomApi.getRoomInfoByID(roomId);

      const isProctoring = roomInfo.roomType === EduRoomTypeEnum.RoomProctor;
      const isStudent = role === EduRoleTypeEnum.student;
      const userUuid = isProctoring && isStudent ? `${userId}-main` : userId;
      return roomStore.joinRoom({ roomId, role, userUuid }).then((response) => {
        const { roomDetail, token, appId } = response.data.data;
        const { latencyLevel, ...rProps } = roomDetail.roomProperties;

        const checkResult = checkRoomInfoBeforeJoin(roomDetail);
        if (checkResult.status === Status.Failed) {
          return Promise.reject(checkResult);
        }

        return joinRoomHandle(
          {
            appId,
            token,
            role,
            platform,
            userId: userUuid,
            userName: nickName,
            roomId: roomDetail.roomId,
            roomName: roomDetail.roomName,
            roomType: roomDetail.roomType,
            latencyLevel,
            language,
            region,
          },
          { roomProperties: rProps },
        );
      });
    },
    [language, region, joinRoomHandle],
  );

  const quickJoinRoomNoAuth = useCallback(
    async (params: QuickJoinRoomParams) => {
      const { roomId, role, nickName, userId, platform = defaultPlatform } = params;
      return roomStore.joinRoomNoAuth({ roomId, role, userUuid: userId }).then((response) => {
        const { roomDetail, token, appId } = response.data.data;
        const { latencyLevel, ...rProps } = roomDetail.roomProperties;

        const checkResult = checkRoomInfoBeforeJoin(roomDetail);
        if (checkResult.status === Status.Failed) {
          return Promise.reject(checkResult);
        }

        return joinRoomHandle(
          {
            appId,
            token,
            role,
            platform,
            userId,
            userName: nickName,
            roomId: roomDetail.roomId,
            roomName: roomDetail.roomName,
            roomType: roomDetail.roomType,
            latencyLevel,
            language,
            region,
          },
          { roomProperties: rProps },
        );
      });
    },
    [language, region, joinRoomHandle],
  );

  return {
    joinRoomHandle,
    quickJoinRoom,
    quickJoinRoomNoAuth,
  };
};
