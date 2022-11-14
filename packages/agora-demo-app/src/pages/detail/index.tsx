import { NavPageLayout } from '@app/layout/nav-page-layout';
import { ACarousel, ATable, ATabsProps, ATabs, SvgIconEnum, SvgImg, useI18n } from '~app-ui-kit';
import { useState, FC, CSSProperties, useEffect, useMemo } from 'react';
import './index.css';
import EmptyImg from '@app/assets/welcome-empty-list.png';

import {
  AcademicMessageKeyEnum,
  AttendanceTracking,
  EngagementTracking,
  RecordState,
  roomApi,
  RoomHistory,
  RoomInfo,
} from '@app/api';
import { RouteComponentProps } from 'react-router';
import dayjs from 'dayjs';
import { roomTypeMap } from '../welcome/room-list/item';

const RenderableArrow = (props: {
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  type: 'forward' | 'backward';
  visible: boolean;
}) => {
  const { className, style, onClick, type, visible } = props;
  return visible ? (
    <div
      className={`${className} ${type === 'forward' ? 'next-arrow' : 'prev-arrow'}`}
      style={{
        ...style,
      }}
      onClick={onClick}>
      <SvgImg type={type === 'forward' ? SvgIconEnum.FORWARD : SvgIconEnum.BACKWARD}></SvgImg>
    </div>
  ) : null;
};
export const Detail: FC<RouteComponentProps<{ roomId?: string }>> = ({ match }) => {
  const [activeTab, setActiveTab] = useState(AcademicMessageKeyEnum.AttendanceTracking);
  const [roomInfo, setRoomInfo] = useState<RoomInfo | null>(null);
  const [roomHistory, setRoomHistory] = useState<RoomHistory | null>(null);
  const [currentCarouselIdx, setCurrentCarouselIdx] = useState(0);
  const transI18n = useI18n();
  const recordList = useMemo(
    () => roomHistory?.recordDetailDTOs || [],
    [roomHistory?.recordDetailDTOs],
  );
  useEffect(() => {
    const roomId = match?.params.roomId;
    if (roomId) {
      roomApi.getRoomInfoByID(roomId).then((res) => {
        setRoomInfo(res.data.data);
      });
      roomApi.history(roomId).then((res) => {
        setRoomHistory(res.data.data as RoomHistory);
      });
    }
  }, []);
  const renderTabBar: ATabsProps['renderTabBar'] = (tabBarProps, DefaultTabBar) => (
    <DefaultTabBar {...tabBarProps}>
      {(node) => {
        return (
          <div className="mr-6 flex items-center">
            {node}
            <div className="border border-solid rounded-xl px-2 relative scale-75	transform font-black">
              {roomHistory?.academicMessageDTO[node.key as string]?.length || 0}
            </div>
          </div>
        );
      }}
    </DefaultTabBar>
  );

  return (
    <NavPageLayout
      contentClassName={'detail-content flex flex-col'}
      title={transI18n('fcr_past_label_past_classroom')}>
      <div className="pt-36 w-full px-20">
        <div className="flex justify-between">
          <div className="flex flex-col justify-between">
            <h2 className="text-3xl font-black">{roomInfo?.roomName}</h2>
            <div className="flex pt-4">
              {recordList.length > 0 ? (
                recordList[recordList.length - 1].recordState !== RecordState.End ? (
                  <div
                    className="rounded-xl flex leading-loose pl-2 pr-2 items-center"
                    style={{ background: '#0056FD1A', color: '#0056FD' }}>
                    <div
                      className="flex w-4 h-4 rounded-full	 justify-center items-center"
                      style={{ background: '#0054fd5c' }}>
                      <div
                        className="flex w-2 h-2 rounded-full"
                        style={{ background: '#0054fde2' }}></div>
                    </div>
                    <span className="pl-2">{transI18n('fcr_past_label_record_processing')}</span>
                  </div>
                ) : (
                  <span className={'font-extrabold'}>
                    {transI18n('fcr_past_label_record')} ({recordList.length})
                  </span>
                )
              ) : (
                <div
                  className="rounded-xl flex leading-loose pl-2 pr-2 items-center"
                  style={{ background: '#0056FD1A', color: '#0056FD' }}>
                  <div
                    className="flex w-4 h-4 rounded-full	 justify-center items-center"
                    style={{ background: '#0054fd5c' }}>
                    <div
                      className="flex w-2 h-2 rounded-full	 "
                      style={{ background: '#0054fde2' }}></div>
                  </div>
                  <span className="pl-2">{transI18n('fcr_past_label_not_recorded')}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-around">
            <div className="font-black flex items-center transform scale-90">
              <span className="w-8">ID</span>
              <span>{roomInfo?.roomId}</span>
            </div>{' '}
            <div className="font-black flex items-center transform scale-90">
              <span className="w-8">
                <SvgImg type={SvgIconEnum.ROOM_LABEL} size={20} colors={{ color: '#000' }}>
                  {' '}
                </SvgImg>
              </span>
              <span>{roomInfo && transI18n(roomTypeMap[roomInfo.roomType])}</span>
            </div>{' '}
            <div className="font-black flex items-center transform scale-90">
              <span className="w-8">
                <SvgImg type={SvgIconEnum.CLOCK} size={20} colors={{ color: '#000' }}></SvgImg>
              </span>
              <span>{`${dayjs(roomInfo?.startTime).format('YYYY-MM-DD, hh:mm')}-${dayjs(
                roomInfo?.endTime,
              ).format('hh:mm')}`}</span>
            </div>
          </div>
        </div>
        <div className="pt-4">
          {recordList.length > 0 && (
            <ACarousel
              beforeChange={(_cur, next) => {
                setCurrentCarouselIdx(next);
              }}
              draggable
              prevArrow={<RenderableArrow visible={currentCarouselIdx !== 0} type="backward" />}
              nextArrow={
                <RenderableArrow
                  visible={recordList.length - currentCarouselIdx * 5 > 5}
                  type="forward"
                />
              }
              className="playback-carousel"
              arrows
              infinite={false}
              slidesToShow={5}
              slidesToScroll={5}
              dots={false}>
              {recordList.map((r, index) => {
                const duration = dayjs.duration(r.sumTime, 'ms');
                return (
                  <div key={r.recordUrls[0] || index}>
                    <div
                      onClick={() => {
                        window.open(r.recordUrls[0]);
                      }}
                      className={
                        'w-32 w-20 border border-solid border-gray rounded-xl flex flex-col justify-center pl-4 py-2 pr-2 transform hover:border-black hover:-translate-y-0.5 hover:shadow'
                      }>
                      <div className="font-black">{index < 9 ? '0' + (index + 1) : index + 1}</div>
                      <div className="flex items-center justify-between">
                        <div>{`${Math.floor(duration.asMinutes())}:${duration.format('ss')}`}</div>
                        <div>
                          <SvgImg
                            type={SvgIconEnum.REPLAY}
                            colors={{ iconPrimary: '#000' }}></SvgImg>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </ACarousel>
          )}
        </div>
      </div>{' '}
      <div className={'flex-1 flex flex-col pt-10'}>
        <ATabs
          className={'detail-tabs flex-1'}
          renderTabBar={renderTabBar}
          items={[
            {
              id: AcademicMessageKeyEnum.AttendanceTracking,
              label: transI18n('fcr_past_table_attendance_tracking_title'),
              key: AcademicMessageKeyEnum.AttendanceTracking,
              children: (
                <ATable<AttendanceTracking>
                  emptyImg={EmptyImg}
                  className={'detail-table'}
                  pagination={false}
                  columns={[
                    {
                      title: transI18n('fcr_past_table_column_student_name'),
                      dataIndex: 'userName',
                      render: (val: string) => {
                        return <span className="font-black">{val}</span>;
                      },
                    },
                    {
                      title: transI18n('fcr_past_table_column_joined_time'),
                      dataIndex: 'joinTime',
                      render: (val: number) => {
                        return dayjs(val).format('hh:mm A , YYYY-MM-DD');
                      },
                    },
                    {
                      title: transI18n('fcr_past_table_column_time_in_class'),
                      dataIndex: 'sumTime',
                      render: (val: number) => {
                        return dayjs.duration(val, 's').format('m') + 'mins';
                      },
                    },
                  ]}
                  dataSource={
                    roomHistory?.academicMessageDTO.attendanceTrackingDTOs || []
                  }></ATable>
              ),
            },
            {
              id: AcademicMessageKeyEnum.EngagementTracking,
              label: transI18n('fcr_past_table_engagement_tracking_title'),
              key: AcademicMessageKeyEnum.EngagementTracking,
              children: (
                <ATable<EngagementTracking>
                  emptyImg={EmptyImg}
                  className={'detail-table'}
                  pagination={false}
                  columns={[
                    {
                      title: transI18n('fcr_past_table_column_student_name'),
                      dataIndex: 'userName',

                      render: (val: string) => {
                        return <span className="font-black">{val}</span>;
                      },
                    },
                    {
                      title: transI18n('fcr_past_table_column_raise_hand'),
                      dataIndex: 'raiseHandCount',
                    },
                    {
                      title: transI18n('fcr_past_table_column_reward'),
                      dataIndex: 'reward',
                    },
                    {
                      title: `${transI18n('fcr_past_table_column_correc')} | ${transI18n(
                        'fcr_past_table_column_incorrect',
                      )}`,
                      render: (_: any, record: EngagementTracking) => {
                        return `${record.popupQuizCorrectCount} | ${record.popupQuizInCorrectCount}`;
                      },
                    },
                    {
                      title: transI18n('fcr_past_table_column_Polling'),
                      dataIndex: 'pollingCount',
                    },
                  ]}
                  dataSource={
                    roomHistory?.academicMessageDTO.engagementTrackingDTOs || []
                  }></ATable>
              ),
            },
          ]}
          onChange={(key) => setActiveTab(key as AcademicMessageKeyEnum)}
          activeKey={activeTab}></ATabs>
      </div>
    </NavPageLayout>
  );
};
