import { RoomInfo } from '@app/api/room';
import CreateClassIcon from '@app/assets/fcr_create_class.png';
import JoinClassIcon from '@app/assets/fcr_join_class.png';
import roomListEmptyImg from '@app/assets/welcome-empty-list.png';
import { useJoinRoom } from '@app/hooks';
import { RoomListItem } from '@app/pages/welcome/room-list';
import { GlobalStoreContext, RoomStoreContext, UserStoreContext } from '@app/stores';
import { ErrorCode, messageError } from '@app/utils';
import type { Platform } from 'agora-edu-core';
import { observer } from 'mobx-react';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useHistory } from 'react-router-dom';
import './index.css';
import { Menu } from './menu';
import { RoomToast } from './room-toast';
import { Share, ShareInfo } from './share';
import { ASkeleton } from '@app/components/skeleton';
import { ADivider } from '@app/components/divider';
import { AList, AListItem } from '@app/components/list';
import { AModal } from '@app/components/modal';
import { SvgIconEnum, SvgImg } from '@app/components/svg-img';
import { useI18n } from 'agora-common-libs';
import { AButton } from '@app/components/button';
import { UserAgreement } from '@app/components/user-agreement';
import { Consult } from '../quick-start/consult';

export const Welcome = observer(() => {
  const history = useHistory();
  const transI18n = useI18n();
  const { fetching, fetchMoreRoomList, refreshRoomList, rooms, total } =
    useContext(RoomStoreContext);
  const userStore = useContext(UserStoreContext);
  const { isLogin, isLoading, nickName } = userStore;
  const [shareModal, setShareModal] = useState(false);
  const { setLoading } = useContext(GlobalStoreContext);
  const { quickJoinRoom } = useJoinRoom();
  const agreementRef = useRef<{ check: () => void }>(null);

  const toJoinRoomPage = () => {
    if (!isLogin) {
      if (agreementRef.current?.check()) {
        history.push('/join-room');
      }
    } else {
      history.push('/join-room');
    }
  };

  const toCreateRoomPage = () => {
    if (!isLogin) {
      if (agreementRef.current?.check()) {
        history.push('/create-room');
      }
    } else {
      history.push('/create-room');
    }
  };

  const [shareRoomInfo, setShareRoomInfo] = useState<ShareInfo>({
    owner: '',
    startTime: 0,
    endTime: 0,
    roomId: '',
    roomName: '',
  });

  const onShare = useCallback(
    (data: RoomInfo) => {
      setShareRoomInfo({
        owner: data.userName,
        startTime: data.startTime,
        endTime: data.endTime,
        roomId: data.roomId,
        roomName: data.roomName,
      });
      setShareModal(true);
    },
    [nickName],
  );

  const onJoin = useCallback(
    (data: RoomInfo) => {
      setLoading(true);
      quickJoinRoom({
        roomId: data.roomId,
        role: data.role,
        nickName: data.userName,
        userId: `${userStore.userInfo!.companyId}_${data.role}`,
        platform: 'PC' as Platform,
      })
        .then(() => {
          refreshRoomList();
        })
        .catch((error) => {
          console.warn('welcome page quickJoinRoom failed. error:%o', error);
          if (error.code) {
            messageError(error.code);
          } else {
            messageError(ErrorCode.FETCH_ROOM_INFO_FAILED);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [nickName, userStore.userInfo, quickJoinRoom],
  );

  const onDetail = useCallback((data: RoomInfo) => {
    history.push(`/detail/${data.roomId}`);
  }, []);

  const roomRefresh = useCallback(() => {
    return refreshRoomList();
  }, []);

  useEffect(() => {
    if (isLogin) {
      roomRefresh();
    }
  }, [isLogin]);

  return (
    <div className="welcome-container">
      <div className="header">
        {isLogin ? (
          <Menu></Menu>
        ) : (
          <AButton className="sign-in-button" onClick={toCreateRoomPage} type="primary">
            {transI18n('fcr_menu_sign_in')}
          </AButton>
        )}
      </div>
      <div className={`content ${rooms.size ? '' : 'room-list-empty'}`} id="scrollableDiv">
        <div className="welcome-title">{transI18n('fcr_home_label_welcome_message')}</div>
        <div className="room-list-empty-img">
          <img src={roomListEmptyImg} alt="" />
        </div>
        <div className={`room-entry`}>
          <div className="btn" onClick={toJoinRoomPage}>
            <span className="icon">
              <img src={JoinClassIcon} alt="join class" />
            </span>
            <span className="text">{transI18n('fcr_home_button_join')}</span>
          </div>
          <div className="btn" onClick={toCreateRoomPage}>
            <span className="icon">
              <img src={CreateClassIcon} alt="create class" />
            </span>
            <span className="text">{transI18n('fcr_home_button_create')}</span>
          </div>
        </div>
        {!isLoading && !isLogin && <UserAgreement ref={agreementRef} />}
        <div className={`room-list fcr-flex-1`}>
          <div className="title">
            <span>{transI18n('fcr_home_label_roomlist')}</span>
          </div>
          <RoomToast />
          <InfiniteScroll
            dataLength={rooms.size}
            next={fetchMoreRoomList}
            hasMore={rooms.size < total}
            //TODO 下拉刷新可以做，需要调整下dom的结构
            pullDownToRefresh
            refreshFunction={roomRefresh}
            loader={
              <ASkeleton
                paragraph={{
                  rows: 3,
                }}
                active
              />
            }
            endMessage={
              <ADivider plain className="no-more">
                {transI18n('fcr_home_label_room_list_no_more')}
              </ADivider>
            }
            scrollableTarget="scrollableDiv">
            <AList<RoomInfo>
              className="list"
              dataSource={Array.from(rooms.values())}
              rowKey="roomId"
              loading={fetching}
              renderItem={(item: RoomInfo) => (
                <AListItem>
                  <RoomListItem data={item} onShare={onShare} onJoin={onJoin} onDetail={onDetail} />
                </AListItem>
              )}></AList>
          </InfiniteScroll>
        </div>
      </div>
      {history.location.pathname !== '/' && <div className="room-list-mask" />}
      <AModal
        className="share-modal-container"
        open={shareModal}
        centered
        bodyStyle={{ padding: 0 }}
        width={730}
        closeIcon={<SvgImg type={SvgIconEnum.SHARE_CLOSE} size={40} className="share-close-icon" />}
        onCancel={() => {
          setShareModal(false);
        }}
        footer={false}>
        <Share data={shareRoomInfo} />
      </AModal>
      {/* product manager introduction */}
      <Consult />
    </div>
  );
});
