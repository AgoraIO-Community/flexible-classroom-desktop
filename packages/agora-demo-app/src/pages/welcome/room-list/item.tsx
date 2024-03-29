import { RoomInfo, RoomState } from '@app/api/room';
import dayjs from 'dayjs';
import { FC, useCallback, useMemo } from 'react';
import './item.css';
import roomStateLive from '@app/assets/fcr-room-state-live.svg';
import roomDurationTime from '@app/assets/fcr_time2.svg';
import { formatRoomID } from '@app/hooks';
import classNames from 'classnames';
import { useI18n } from 'agora-common-libs';
import { SvgIconEnum, SvgImg } from '@app/components/svg-img';
import { SceneType } from '@app/type';

type RoomListItemProps = {
  className?: string;
  data: RoomInfo;
  onShare?: (data: RoomInfo) => void;
  onJoin?: (data: RoomInfo) => void;
  onDetail?: (data: RoomInfo) => void;
};

const Format = 'YYYY-MM-DD,HH:mm';

const roomStateClassNames = {
  [RoomState.ENDED]: 'over',
  [RoomState.GOING]: 'live',
  [RoomState.NO_STARTED]: 'upcoming',
};

const roomStateMap = {
  [RoomState.ENDED]: 'fcr_home_status_over',
  [RoomState.GOING]: 'fcr_home_status_live',
  [RoomState.NO_STARTED]: 'fcr_home_status_upcoming',
};

export const sceneTypeTextMap = {
  [SceneType.OneOnOne]: 'fcr_home_label_1on1',
  [SceneType.SmallClass]: 'fcr_home_label_small_classroom',
  [SceneType.LectureHall]: 'fcr_home_label_lecture_hall',
  [SceneType.Proctoring]: 'fcr_home_label_proctoring',
  [SceneType.Scene]: 'fcr_home_label_onlineclass',
};

export const RoomListItem: FC<RoomListItemProps> = ({
  className = '',
  data,
  onShare,
  onDetail,
  onJoin,
}) => {
  const transI18n = useI18n();
  const dateStr = useMemo(() => {
    return `${dayjs(data.startTime).format(Format)}`;
  }, [data]);

  const durationInMins = useMemo(() => {
    return Math.ceil(dayjs.duration({ seconds: data.duration }).asMinutes());
  }, [data]);

  const roomState = useMemo(() => {
    return data.roomState;
  }, [data]);

  const roomId = useMemo(() => {
    const result = formatRoomID(data.roomId);
    return result;
  }, [data.roomId]);

  const shareHandle = useCallback(() => {
    onShare && onShare(data);
  }, [onShare, data]);

  const detailHandle = useCallback(() => {
    onDetail && onDetail(data);
  }, [onShare, data]);

  const joinHandle = useCallback(() => {
    onJoin && onJoin(data);
  }, [onShare, data]);

  return (
    <div className={`room-item-card ${roomStateClassNames[roomState]} ${className}`}>
      <div className="info">
        <div className="header">
          <span className="date">{dateStr}</span>
          <span className="id">{roomId}</span>
        </div>
        <div
          className={classNames({
            name: 1,
            'w-full': roomState === RoomState.ENDED,
            'w-2/3': roomState !== RoomState.ENDED,
          })}>
          {data.roomName}
        </div>
        <div className="footer">
          <span className="state">
            <img
              src={roomStateLive}
              alt="room-state-live"
              className={classNames({
                'live-icon': 1,
                hidden: roomState !== RoomState.GOING,
              })}
            />
            {transI18n(roomStateMap[roomState])}
          </span>
          <span className="state">
            <img
              src={roomDurationTime}
              alt="room-time-duration"
              className={classNames({
                'time-icon': 1,
              })}
            />
            {transI18n('duration_in_mins', { reason: durationInMins })}
          </span>
          <span className="type">
            <SvgImg
              className="label"
              type={SvgIconEnum.ROOM_LABEL}
              colors={{ color: roomState !== RoomState.GOING ? '#78787c' : '#abb2ff' }}
              size={19}
            />
            {transI18n(sceneTypeTextMap[data.sceneType || (data.roomType as SceneType)])}
          </span>
        </div>
      </div>
      <div className="operation">
        {roomState !== RoomState.ENDED ? (
          <div className="btn enter">
            <span className="text" onClick={joinHandle}>
              {transI18n('fcr_home_button_enter')}
            </span>
            <span className="share" onClick={shareHandle} />
          </div>
        ) : (
          <div className="btn replay" onClick={detailHandle}>
            <SvgImg type={SvgIconEnum.REPLAY} size={20} colors={{ iconPrimary: '#fff' }} />
            <span className="text">{transI18n('fcr_home_button_replay')}</span>
          </div>
        )}
      </div>
    </div>
  );
};
