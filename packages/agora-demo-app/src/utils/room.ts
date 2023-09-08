import { ErrorCode, failResult, Result, Status, successResult } from '.';
import { RoomInfo } from '../api';
import { SceneType } from '@app/type';

export function roomIDIsValid(id: string): Result<null> {
  if (id.length !== 9) {
    const code = ErrorCode.INVALID_ROOM_ID;
    return failResult(code);
  }
  return successResult(null);
}

export function checkRoomInfoBeforeJoin(
  roomInfo: Pick<RoomInfo, 'roomId' | 'endTime'>,
): Result<null> {
  if (!roomInfo) {
    const code = ErrorCode.INVALID_ROOM_INFO;
    return failResult(code);
  }

  {
    const result = roomIDIsValid(roomInfo.roomId);
    if (result.status === Status.Failed) {
      return result;
    }
  }

  return successResult(null);
}

export function h5ClassModeIsSupport(sceneType: SceneType): Result<null> {
  if (sceneType !== SceneType.LectureHall) {
    const code = ErrorCode.INVALID_CLASS_MODE_H5;
    return failResult(code);
  }
  return successResult(null);
}
