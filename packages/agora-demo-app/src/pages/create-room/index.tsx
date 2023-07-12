import watermarkIcon from '@app/assets/fcr_watermark.png';
import { ADatePicker, locale } from '@app/components/date-picker';
import { AForm, AFormItem, useAForm } from '@app/components/form';
import { AInput } from '@app/components/input';
import { RadioIcon } from '@app/components/radio-icon';
import { RoomTypeCard } from '@app/components/room-type-card';
import { SvgIconEnum, SvgImg } from '@app/components/svg-img';
import { ATimePicker } from '@app/components/time-picker';
import { useJoinRoom, useLangSwitchValue } from '@app/hooks';
import { useHistoryBack } from '@app/hooks/useHistoryBack';
import { NavFooter, NavPageLayout } from '@app/layout/nav-page-layout';
import { GlobalStoreContext, RoomStoreContext, UserStoreContext } from '@app/stores';
import { Default_Hosting_URL, ErrorCode, messageError } from '@app/utils';
import { useI18n } from 'agora-common-libs';
import { EduRoleTypeEnum, EduRoomTypeEnum, Platform } from 'agora-edu-core';
import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import { observer } from 'mobx-react';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { RadioCard } from './radio-card';
import './index.css';
import set from 'lodash/set';
import {
  CreateFormValue,
  TimeFormat,
  classroomBackgroundImagePath,
  combDateTime,
  computeEndTime,
  roomTypeOptions,
  serviceTypeOptions,
  weekday,
} from './helper';
import { SdkType } from '@app/type';
import { AgoraRteMediaPublishState } from 'agora-rte-sdk';

export const CreateRoom = observer(() => {
  const roomStore = useContext(RoomStoreContext);
  const { setLoading } = useContext(GlobalStoreContext);
  const userStore = useContext(UserStoreContext);
  const { quickJoinRoom } = useJoinRoom();
  const historyBackHandle = useHistoryBack();
  const transI18n = useI18n();

  const [form] = useAForm<CreateFormValue>();
  const [showMore, setShowMore] = useState(false);
  const [roomType, setRoomType] = useState(roomTypeOptions[0].value);
  const [sdkType, setSdkType] = useState(roomTypeOptions[0].sdkType);

  const [serviceType, setServiceType] = useState(serviceTypeOptions[0].value);
  const [watermark, setWatermark] = useState(false);
  const [livePlayback, setLivePlayback] = useState(false);
  const [useCurrentTime, setUseCurrentTime] = useState(true);
  const [dateTimeValidate, setDateTimeValidate] = useState({
    validateStatus: 'success',
    help: '',
    tip: '',
  });
  const [endDateTimeValidate, setEndDateTimeValidate] = useState({
    validateStatus: 'success',
    help: '',
    tip: '',
  });

  const showLivePlaybackOption = false;

  const customFormat = useCallback(
    (value: dayjs.Dayjs) =>
      `${value.format('YYYY-MM-DD')}  |  ${transI18n(
        weekday[value.day() as keyof typeof weekday],
      )}`,
    [],
  );

  const initialValues: CreateFormValue = useMemo(() => {
    const date = dayjs();
    date.set('seconds', 0);
    const endDate = computeEndTime(date);
    return {
      name: transI18n('fcr_create_label_room_name_default', { name: userStore.nickName }),
      date: date,
      time: date,
      link: Default_Hosting_URL,
      endDate: endDate,
      endTime: endDate,
    };
  }, []);

  useEffect(() => {
    form.setFieldValue(
      'name',
      transI18n('fcr_create_label_room_name_default', { name: userStore.nickName }),
    );
  }, [userStore.nickName]);

  const dateLocale = useLangSwitchValue({ zh: locale.zh_CN, en: locale.en_US });

  const getFormDateTime = useCallback(() => {
    const time: Dayjs = form.getFieldValue('time');
    const date: Dayjs = form.getFieldValue('date');
    return combDateTime(date, time);
  }, [form]);

  const getFormEndDateTime = useCallback(() => {
    const time: Dayjs = form.getFieldValue('endTime');
    const date: Dayjs = form.getFieldValue('endDate');
    return combDateTime(date, time);
  }, [form]);

  const checkFormDateTimeIsAfterNow = useCallback(
    (skip: boolean) => {
      // 如果使用当前时间就跳过日期时间校验
      if (skip) {
        return true;
      }
      const dateTime = getFormDateTime();
      if (!dateTime.isBefore(dayjs())) {
        setDateTimeValidate({ validateStatus: 'success', help: '', tip: '' });
        return true;
      }
      setDateTimeValidate({
        validateStatus: 'error',
        help: '',
        tip: transI18n('fcr_create_tips_starttime'),
      });
      return false;
    },
    [getFormDateTime],
  );

  const checkFormEndTimeGreaterThanStartTime = () => {
    const startDateTime = getFormDateTime();
    const endDateTime = getFormEndDateTime();

    if (endDateTime.isAfter(startDateTime)) {
      setEndDateTimeValidate({ validateStatus: 'success', help: '', tip: '' });
      return true;
    }
    setEndDateTimeValidate({
      validateStatus: 'error',
      help: '',
      tip: transI18n('fcr_create_tips_endtime_too_early'),
    });

    return false;
  };

  const checkFormDurationIsMoreThan15Minute = () => {
    const startDateTime = getFormDateTime();
    const endDateTime = getFormEndDateTime();
    const diffInMin = endDateTime.diff(startDateTime, 'minutes');

    if (diffInMin >= 15) {
      setEndDateTimeValidate({ validateStatus: 'success', help: '', tip: '' });
      return true;
    }

    setEndDateTimeValidate({
      validateStatus: 'error',
      help: '',
      tip: transI18n('fcr_create_tips_duration_too_short'),
    });

    return false;
  };

  const dateTimeOnChange = (value: Dayjs | null) => {
    if (value) {
      setUseCurrentTime(false);
      checkFormDateTimeIsAfterNow(false);
      // const endDate = computeEndTime(getFormDateTime());

      // form.setFieldValue('endDate', endDate);
      // form.setFieldValue('endTime', endDate);
    }
  };
  const endDateTimeOnChange = () => {
    checkFormEndTimeGreaterThanStartTime() && checkFormDurationIsMoreThan15Minute();
  };

  const onSubmit = () => {
    if (
      !checkFormDateTimeIsAfterNow(useCurrentTime) ||
      !checkFormEndTimeGreaterThanStartTime() ||
      !checkFormDurationIsMoreThan15Minute()
    ) {
      return;
    }

    form.validateFields().then((data) => {
      setLoading(true);
      const { date, time, name, endDate, endTime } = data;
      const dateTime = useCurrentTime ? dayjs() : combDateTime(date, time);
      const endDateTime = combDateTime(endDate,endTime);

      const isProctoring = roomType === EduRoomTypeEnum.RoomProctor;
      const isOnlineclass =
        roomType === EduRoomTypeEnum.RoomSmallClass && sdkType === SdkType.AgoraOnlineclassSdk;
      const roomProperties = isProctoring
        ? {
            watermark,
            examinationUrl: 'https://forms.clickup.com/8556478/f/853xy-21947/IM8JKH1HOOF3LDJDEB',
            latencyLevel: serviceType,
            sdkType,
          }
        : {
            watermark,
            boardBackgroundImage: classroomBackgroundImagePath,
            latencyLevel: serviceType,
            sdkType,
          };
      const widgets = {};
      if (isOnlineclass) {
        set(widgets, 'netlessBoard.state', 0);
      }
      const roleConfigs = isOnlineclass
        ? {
            [EduRoleTypeEnum.student]: {
              limit: 50,
              defaultStream: {
                audioState: AgoraRteMediaPublishState.Published,
                videoState: AgoraRteMediaPublishState.Published,
                state: AgoraRteMediaPublishState.Published,
              },
            },
          }
        : undefined;
      roomStore
        .createRoom({
          roomName: name,
          startTime: dateTime.valueOf(),
          endTime: endDateTime.valueOf(),
          roomType,
          roomProperties,
          widgets,
          roleConfigs,
        })
        .then((data) => {
          if (useCurrentTime) {
            return quickJoinRoom({
              roomId: data.roomId,
              role: EduRoleTypeEnum.teacher,
              nickName: userStore.nickName,
              userId: userStore.userInfo!.companyId,
              platform: Platform.PC,
            });
          } else {
            historyBackHandle();
          }
        })
        .catch((error) => {
          if (error.code) {
            messageError(error.code);
          } else {
            messageError(ErrorCode.CREATE_ROOM_FAILED);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  return (
    <NavPageLayout
      title={transI18n('fcr_create_label_create_classroom')}
      className="create-room"
      footer={
        <NavFooter
          okText={transI18n('fcr_create_button_create')}
          cancelText={transI18n('fcr_create_button_cancel')}
          onOk={onSubmit}
          onCancel={historyBackHandle}
        />
      }>
      <AForm<CreateFormValue>
        className="create-form header-blank footer-blank"
        form={form}
        initialValues={initialValues}>
        {/* 课程名称 */}
        <div className="form-item">
          <div className="label">{transI18n('fcr_create_label_room_name')}</div>
          <AFormItem
            name="name"
            rules={[
              { required: true, message: transI18n('fcr_create_label_room_name_empty') },
              {
                pattern: /^.{0,50}$/,
                message: transI18n('fcr_create_room_tips_name_rule'),
              },
            ]}>
            <AInput
              maxLength={50}
              showCount={{
                formatter: (args) => (args.maxLength || 50) - args.count,
              }}
              placeholder={transI18n('fcr_create_tips_room_name')}
              className="create-input"
            />
          </AFormItem>
        </div>
        {/* 课程时间 */}
        <div className="form-item fcr-flex">
          <div className="start-time">
            <div className="label">{transI18n('fcr_create_label_starttime')}</div>
            <AFormItem
              name="date"
              rules={[{ required: true, message: 'Please select date!' }]}
              {...dateTimeValidate}>
              <ADatePicker
                className="start-date-picker"
                format={customFormat}
                allowClear={false}
                disabledDate={(current) => {
                  const now = dayjs().set('hour', 0).set('minute', 0).set('second', 0);
                  return !dayjs(current).isBetween(now, now.add(7, 'day'));
                }}
                onChange={dateTimeOnChange}
                superNextIcon={null}
                superPrevIcon={null}
                suffixIcon={<SvgImg type={SvgIconEnum.CALENDAR} />}
                popupStyle={{ marginTop: '8px' }}
                locale={dateLocale!}
              />
            </AFormItem>
            <div className="fcr-relative fcr-inline-block">
              <AFormItem
                name="time"
                rules={[{ required: true, message: 'Please select time!' }]}
                {...dateTimeValidate}>
                <ATimePicker
                  className="start-time-picker"
                  format={TimeFormat}
                  inputReadOnly
                  minuteStep={5}
                  allowClear={false}
                  showNow={false}
                  onChange={dateTimeOnChange}
                  popupStyle={{ marginTop: '8px' }}
                />
              </AFormItem>
              <div className={`current-time ${useCurrentTime ? '' : 'current-time--hidden'}`}>
                {transI18n('fcr_create_room_current_time')}
              </div>
            </div>
            <div className="tip">{dateTimeValidate.tip}</div>
          </div>
          {/* <div className="gap-symbol" /> */}
          {/* <div className="end-time">
            <div className="label">{transI18n('fcr_create_label_end_time')}</div>
            <div className="end-time-picker">
              {endTime}
              <span>{transI18n('fcr_create_label_default_time')}</span>
            </div>
          </div> */}
        </div>

        <div className="form-item fcr-flex">
          <div className="start-time">
            <div className="label">{transI18n('fcr_create_label_end_time')}</div>
            <AFormItem
              name="endDate"
              rules={[{ required: true, message: 'Please select date!' }]}
              {...endDateTimeValidate}>
              <ADatePicker
                className="start-date-picker"
                format={customFormat}
                allowClear={false}
                disabledDate={(current) => {
                  const now = dayjs().set('hour', 0).set('minute', 0).set('second', 0);
                  return !dayjs(current).isBetween(now, now.add(7, 'day'));
                }}
                superNextIcon={null}
                superPrevIcon={null}
                suffixIcon={<SvgImg type={SvgIconEnum.CALENDAR} />}
                popupStyle={{ marginTop: '8px' }}
                locale={dateLocale!}
                onChange={endDateTimeOnChange}
              />
            </AFormItem>
            <div className="fcr-relative fcr-inline-block">
              <AFormItem
                name="endTime"
                rules={[{ required: true, message: 'Please select time!' }]}
                {...endDateTimeValidate}>
                <ATimePicker
                  className="start-time-picker"
                  format={TimeFormat}
                  inputReadOnly
                  minuteStep={5}
                  allowClear={false}
                  showNow={false}
                  popupStyle={{ marginTop: '8px' }}
                  onChange={endDateTimeOnChange}
                />
              </AFormItem>
            </div>
            <div className="tip">{endDateTimeValidate.tip}</div>
          </div>
        </div>

        {/* 班型 */}
        <div className="form-item item-mb">
          <div className="label">{transI18n('fcr_create_label_class_mode')}</div>
          <div className="room-type">
            {roomTypeOptions.map((v) => {
              return (
                <RoomTypeCard
                  title={transI18n(v.label)}
                  description={transI18n(v.description)}
                  checked={roomType === v.value && sdkType === v.sdkType}
                  className={v.className}
                  key={v.value + v.label}
                  onClick={() => {
                    setRoomType(v.value);
                    setSdkType(v.sdkType);
                  }}
                />
              );
            })}
          </div>
        </div>
        {/* 服务类型 */}
        {roomType === EduRoomTypeEnum.RoomBigClass ? (
          <div className="form-item item-mb ">
            <div className="label">{transI18n('fcr_create_label_latency_type')}</div>
            <div className="service-type">
              {serviceTypeOptions.map((v) => {
                return (
                  <RadioCard
                    key={v.value + v.label}
                    onClick={() => {
                      setServiceType(v.value);
                    }}
                    checked={v.value === serviceType}
                    label={transI18n(v.label)}
                    description={transI18n(v.description)}
                    icon={<img src={v.icon} />}
                  />
                );
              })}
            </div>
          </div>
        ) : null}
        {/* 更多设置 */}
        <div
          className={classNames({
            'form-item item-mb more-settings': 1,
            expanded: showMore,
          })}>
          {/* <div className="label">
            {transI18n('fcr_create_label_more_settings')}
            <span
              className={classNames({
                'expand-btn': 1,
                'fcr-hidden': showMore,
              })}
              onClick={() => {
                setShowMore((pre) => !pre);
              }}>
              {transI18n('fcr_create_more_settings_expand')}
            </span>
          </div> */}
          {/* <div
            className={classNames({
              'more-setting-list': 1,
              'fcr-hidden': !showMore,
            })}>
            <div className="setting-item">
              <div className="title">
                <div className="security-prefix-icon" />
                {transI18n('fcr_create_label_security')}
              </div>
              <div className="content">
                <RadioCard
                  className={'watermark-card'}
                  onClick={() => {
                    setWatermark((pre) => !pre);
                  }}
                  checked={watermark}
                  label={transI18n('fcr_create_label_watermark')}
                  icon={<img src={watermarkIcon}></img>}
                />
              </div>
            </div>
            {showLivePlaybackOption ? (
              <div className="setting-item">
                <div className="title">
                  <div className="live-playback-prefix-icon" />
                  {transI18n('fcr_create_label_playback')}
                </div>
                <div className="content">
                  <div className="live-playback">
                    <div
                      className="header"
                      onClick={() => {
                        setLivePlayback((pre) => !pre);
                      }}>
                      <span className="flex-1">
                        {transI18n('fcr_create_label_playback_description')}
                      </span>
                      <RadioIcon checked={livePlayback} />
                    </div>
                    <div className={`link ${!livePlayback ? 'fcr-hidden' : ''}`}>
                      <div className="link-label">
                        {transI18n('fcr_create_label_playback_link')}
                      </div>
                      <AFormItem
                        name="link"
                        rules={[
                          {
                            required: livePlayback,
                            message: transI18n('fcr_create_tips_room_playback_link'),
                          },
                        ]}>
                        <AInput />
                      </AFormItem>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div> */}
        </div>
      </AForm>
    </NavPageLayout>
  );
});
