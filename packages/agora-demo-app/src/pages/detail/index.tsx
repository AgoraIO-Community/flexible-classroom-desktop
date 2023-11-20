import { NavPageLayout } from '@app/layout/nav-page-layout';
import { useState, FC, CSSProperties, useEffect, useMemo } from 'react';
import './index.css';
import EmptyImg from '@app/assets/welcome-empty-list.png';
import {
  AcademicMessage,
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
import { sceneTypeTextMap } from '../welcome/room-list/item';
import { SvgIconEnum, SvgImg } from '@app/components/svg-img';
import { useI18n } from 'agora-common-libs';
import { ATabs, ATabsProps } from '@app/components/tabs';
import { ACarousel } from '@app/components/carousel';
import { ATable } from '@app/components/table';

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
    // @ts-ignore
    <DefaultTabBar {...tabBarProps}>
      {(node) => {
        return (
          <div className="fcr-mr-6 fcr-flex fcr-items-center">
            {node}
            <div className="fcr-border fcr-border-solid fcr-rounded-xl fcr-px-2 fcr-relative fcr-scale-75	fcr-transform fcr-font-black">
              {roomHistory?.academicMessageDTO[node.key as keyof AcademicMessage]?.length || 0}
            </div>
          </div>
        );
      }}
    </DefaultTabBar>
  );

  return (
    <NavPageLayout
      contentClassName={'detail-content fcr-flex fcr-flex-col'}
      title={transI18n('fcr_past_label_past_classroom')}>
      <div className="fcr-pt-36 fcr-w-full fcr-px-20">
        <div className="fcr-flex fcr-justify-between">
          <div className="fcr-flex fcr-flex-col fcr-justify-between">
            <h2 className="fcr-text-3xl fcr-font-black">{roomInfo?.roomName}</h2>
            <div className="fcr-flex fcr-pt-4">
              {recordList.length > 0 ? (
                recordList[recordList.length - 1].recordState !== RecordState.End ? (
                  <div
                    className="fcr-rounded-xl fcr-flex fcr-leading-loose fcr-pl-2 fcr-pr-2 fcr-items-center"
                    style={{ background: '#0056FD1A', color: '#0056FD' }}>
                    <div
                      className="fcr-flex fcr-w-4 fcr-h-4 fcr-rounded-full fcr-justify-center fcr-items-center"
                      style={{ background: '#0054fd5c' }}>
                      <div
                        className="fcr-flex fcr-w-2 fcr-h-2 fcr-rounded-full"
                        style={{ background: '#0054fde2' }}></div>
                    </div>
                    <span className="fcr-pl-2">
                      {transI18n('fcr_past_label_record_processing')}
                    </span>
                  </div>
                ) : (
                  <span className={'fcr-font-extrabold'}>
                    {transI18n('fcr_past_label_record')} ({recordList.length})
                  </span>
                )
              ) : (
                <div
                  className="fcr-rounded-xl fcr-flex fcr-leading-loose fcr-pl-2 fcr-pr-2 fcr-items-center"
                  style={{ background: '#0056FD1A', color: '#0056FD' }}>
                  <div
                    className="fcr-flex fcr-w-4 fcr-h-4 fcr-rounded-full	 fcr-justify-center fcr-items-center"
                    style={{ background: '#0054fd5c' }}>
                    <div
                      className="fcr-flex fcr-w-2 fcr-h-2 fcr-rounded-full	 "
                      style={{ background: '#0054fde2' }}></div>
                  </div>
                  <span className="fcr-pl-2">{transI18n('fcr_past_label_not_recorded')}</span>
                </div>
              )}
            </div>
          </div>
          <div className="fcr-flex fcr-flex-col fcr-justify-around">
            <div className="fcr-font-black fcr-flex fcr-items-center fcr-transform fcr-scale-90">
              <span className="fcr-w-8">ID</span>
              <span>{roomInfo?.roomId}</span>
            </div>{' '}
            <div className="fcr-font-black fcr-flex fcr-items-center fcr-transform fcr-scale-90">
              <span className="fcr-w-8">
                <SvgImg type={SvgIconEnum.ROOM_LABEL} size={20} colors={{ color: '#000' }} />
              </span>
              <span>{roomInfo && transI18n(sceneTypeTextMap[roomInfo.sceneType])}</span>
            </div>{' '}
            <div className="fcr-font-black fcr-flex fcr-items-center fcr-transform fcr-scale-90">
              <span className="fcr-w-8">
                <SvgImg type={SvgIconEnum.CLOCK} size={20} colors={{ color: '#000' }}></SvgImg>
              </span>
              <span>{`${dayjs(roomInfo?.startTime).format('YYYY-MM-DD, hh:mm')}-${dayjs(
                roomInfo?.endTime,
              ).format('hh:mm')}`}</span>
            </div>
          </div>
        </div>
        <div className="fcr-pt-4">
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
                        'fcr-w-20 fcr-border fcr-border-solid fcr-border-gray fcr-rounded-xl fcr-flex fcr-flex-col fcr-justify-center fcr-pl-4 fcr-py-2 fcr-pr-2 fcr-transform hover:fcr-border-black hover:-translate-y-0.5 hover:fcr-shadow'
                      }>
                      <div className="fcr-font-black">
                        {index < 9 ? '0' + (index + 1) : index + 1}
                      </div>
                      <div className="fcr-flex fcr-items-center fcr-justify-between">
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
      <div className={'fcr-flex-1 fcr-flex fcr-flex-col fcr-pt-10'}>
        <ATabs
          className={'detail-tabs fcr-flex-1'}
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
                        return Math.ceil(dayjs.duration(val, 'ms').asMinutes()) + 'mins';
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
