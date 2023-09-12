import { RtmRole, RtmTokenBuilder } from 'agora-access-token';
import type { EduRoleTypeEnum, Platform } from 'agora-edu-core';
import type { AgoraLatencyLevel, AgoraRegion } from 'agora-rte-sdk';
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
import type { LanguageEnum } from 'agora-classroom-sdk';
import { failResult } from './../utils/result';
import { FcrRoomType, SceneType } from '@app/type';
import { roomApi } from '@app/api';

type JoinRoomParams = {
  role: EduRoleTypeEnum;
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
  sceneType: SceneType;
};
type QuickJoinRoomParams = {
  role: EduRoleTypeEnum;
  roomId: string;
  nickName: string;
  platform: Platform;
  userId: string;
};

type JoinRoomOptions = {
  returnToPath: string;
  roomProperties?: any;
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
    role: 2,
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
    async (
      params: JoinRoomParams,
      options: JoinRoomOptions = {
        roomProperties: {},
        returnToPath: '/',
      },
    ) => {
      const {
        role,
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
        sceneType,
      } = params;

      if (platform === 'H5') {
        const checkResult = h5ClassModeIsSupport(sceneType);
        if (checkResult.status === Status.Failed) {
          return Promise.reject(checkResult);
        }
      }

      if (!userId) {
        return Promise.reject(failResult(ErrorCode.USER_ID_EMPTY));
      }
      const isProctoring = sceneType === SceneType.Proctoring;

      if (!userName) {
        return Promise.reject(failResult(ErrorCode.USER_NAME_EMPTY));
      }

      const shareUrl = shareLinkInClass({ region, roomId, owner: userStore.nickName });

      console.log('## get rtm Token from demo server', token);

      const sdkDomain = `${REACT_APP_AGORA_APP_SDK_DOMAIN}`;

      const webRTCCodec = isProctoring ? 'h264' : 'vp8';

      const config: GlobalLaunchOption = {
        appId: REACT_APP_AGORA_APP_ID || appId,
        sdkDomain,
        userUuid: userId,
        rtmToken: token,
        roomUuid: roomId,
        roomName: `${roomName}`,
        userName: userName,
        roleType: role,
        region: region,
        language: language,
        duration: +duration * 60,
        latencyLevel,
        roomType: FcrRoomType[sceneType],
        userFlexProperties: options.roomProperties || {},
        shareUrl,
        platform,
        sceneType,
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
        returnToPath: options.returnToPath,
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
    async (params: QuickJoinRoomParams, options?: Partial<JoinRoomOptions>) => {
      const { roomId, role, nickName, userId, platform = defaultPlatform } = params;
      const {
        data: { data: roomInfo },
      } = await roomApi.getRoomInfoByID(roomId);

      const isProctoring = roomInfo.sceneType === SceneType.Proctoring;
      const isStudent = role === 2;
      const userUuid = isProctoring && isStudent ? `${userId}-main` : userId;
      return roomStore.joinRoom({ roomId, role, userUuid, userName: nickName }).then((response) => {
        const { roomDetail, token, appId } = response.data.data;

        const checkResult = checkRoomInfoBeforeJoin(roomDetail);
        if (checkResult.status === Status.Failed) {
          return Promise.reject(checkResult);
        }
        const { latencyLevel, ...others } = roomDetail.roomProperties;

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
            latencyLevel: latencyLevel || 2,
            language,
            region,
            sceneType: roomDetail.sceneType || roomDetail.roomType,
          },
          { roomProperties: others, returnToPath: '/', ...options },
        );
      });
    },
    [language, region, joinRoomHandle],
  );

  const quickJoinRoomNoAuth = useCallback(
    async (params: QuickJoinRoomParams, options?: Partial<JoinRoomOptions>) => {
      const { roomId, role, nickName, userId, platform = defaultPlatform } = params;
      const {
        data: { data: roomInfo },
      } = await roomApi.getRoomInfoByIDNoAuth(roomId);

      const isProctoring = roomInfo.sceneType === SceneType.Proctoring;
      const isStudent = role === 2;
      const userUuid = isProctoring && isStudent ? `${userId}-main` : userId;
      return roomStore
        .joinRoomNoAuth({ roomId, role, userUuid, userName: nickName })
        .then((response) => {
          const { roomDetail, token, appId } = response.data.data;

          const checkResult = checkRoomInfoBeforeJoin(roomDetail);
          if (checkResult.status === Status.Failed) {
            return Promise.reject(checkResult);
          }
          const { latencyLevel, ...others } = roomDetail.roomProperties;

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
              sceneType: roomDetail.sceneType || roomDetail.roomType,
              latencyLevel: latencyLevel || 2,
              language,
              region,
            },
            { roomProperties: others, returnToPath: '/', ...options },
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
