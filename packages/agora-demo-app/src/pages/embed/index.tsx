import { useJoinRoom } from '@app/hooks';
import { useNoAuthUser } from '@app/hooks/useNoAuthUser';
import { GlobalStoreContext, RoomStoreContext } from '@app/stores';
import { SceneType } from '@app/type';
import { ErrorCode, messageError, parseHashUrlQuery } from '@app/utils';
import { studentLimit } from '@app/utils/constants';
import { FcrMultiThemeMode } from 'agora-common-libs';
import type { Platform } from 'agora-edu-core';
import type { AgoraRteMediaPublishState } from 'agora-rte-sdk';
import { useContext } from 'react';

export const Embed = () => {
  const globalStore = useContext(GlobalStoreContext);
  const { createRoomNoAuth } = useContext(RoomStoreContext);

  const params = parseHashUrlQuery(window.location.hash);

  const { userId, nickName } = useNoAuthUser();

  const {
    launchType: launchType,
    language = 'zh',
    theme = FcrMultiThemeMode.dark,
    backUrl,
  } = params;
  const { roomName = 'Test Room', sceneType = 0, duration = 30 } = params;
  const { roomId = '', userName = nickName, userRole = 1 } = params;

  const { quickJoinRoomNoAuth } = useJoinRoom();

  if (language) {
    globalStore.setLanguage(language);
  }

  if (theme) {
    globalStore.setTheme(theme);
  }

  const _backUrl = decodeURIComponent(backUrl);

  if (launchType === 'create') {
    const roleConfigs =
      sceneType === SceneType.Scene
        ? {
            2: {
              limit: studentLimit,
              defaultStream: {
                audioState: 1 as AgoraRteMediaPublishState,
                videoState: 1 as AgoraRteMediaPublishState,
                state: 1 as AgoraRteMediaPublishState,
              },
            },
          }
        : undefined;

    const processes =
      sceneType === SceneType.Scene
        ? {
            handsUp: {
              defaultAcceptRole: '',
            },
          }
        : undefined;

    const roomProperties = {
      latencyLevel: 2,
    };

    globalStore.setLoading(true);

    createRoomNoAuth({
      sceneType,
      roomName: roomName,
      startTime: Date.now(),
      endTime: Date.now() + duration * 60 * 1000,
      userUuid: userId,
      roleConfigs,
      processes,
      roomProperties,
    })
      .then((data) => {
        return quickJoinRoomNoAuth(
          {
            role: userRole,
            roomId: data.roomId,
            nickName: userName,
            platform: 'PC' as Platform,
            userId,
          },
          {
            returnToUrl: _backUrl,
          },
        );
      })
      .catch((error) => {
        console.warn('join page quickJoinRoom failed. error:%o', error);
        if (error.code) {
          messageError(error.code);
        } else {
          messageError(ErrorCode.FETCH_ROOM_INFO_FAILED);
        }
      })
      .finally(() => {
        globalStore.setLoading(false);
      });
  } else {
    quickJoinRoomNoAuth(
      {
        role: userRole,
        roomId: roomId,
        nickName: userName,
        platform: 'PC' as Platform,
        userId,
      },
      {
        returnToUrl: _backUrl,
      },
    )
      .catch((error) => {
        console.warn('join page quickJoinRoom failed. error:%o', error);
        if (error.code) {
          messageError(error.code);
        } else {
          messageError(ErrorCode.FETCH_ROOM_INFO_FAILED);
        }
      })
      .finally(() => {
        globalStore.setLoading(false);
      });
  }

  return null;
};
