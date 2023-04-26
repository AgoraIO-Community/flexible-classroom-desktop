import { SdkType } from '@app/type';
import { EduRoomTypeEnum } from 'agora-edu-core';
import { AgoraLatencyLevel, AgoraRteEngineConfig, AgoraRteRuntimePlatform } from 'agora-rte-sdk';
import premiumIcon from '@app/assets/service-type/fcr_premium.png';
import standardIcon from '@app/assets/service-type/fcr_standard.png';
import dayjs, { Dayjs } from 'dayjs';

export const roomTypeOptions = [
  // {
  //   label: 'fcr_h5create_label_small_classroom',
  //   description: 'fcr_create_label_small_classroom_description',
  //   value: EduRoomTypeEnum.RoomSmallClass,
  //   sdkType: SdkType.AgoraEduSdk,
  //   className: 'card-purple',
  // },
  // {
  //   label: 'fcr_h5create_label_lecture_hall',
  //   description: 'fcr_create_label_lecture_hall_description',
  //   value: EduRoomTypeEnum.RoomBigClass,
  //   sdkType: SdkType.AgoraEduSdk,
  //   className: 'card-red',
  // },
  // {
  //   label: 'fcr_h5create_label_1on1',
  //   description: 'fcr_create_label_1on1_description',
  //   value: EduRoomTypeEnum.Room1v1Class,
  //   sdkType: SdkType.AgoraEduSdk,
  //   className: 'card-green',
  // },
  {
    label: 'fcr_h5create_label_small_onlineclass',
    description: 'fcr_create_label_small_onlineclass_description',
    value: EduRoomTypeEnum.RoomSmallClass,
    sdkType: SdkType.AgoraOnlineclassSdk,
    className: 'card-purple',
  },
];

// if (AgoraRteEngineConfig.platform !== AgoraRteRuntimePlatform.Electron) {
//   roomTypeOptions.push({
//     label: 'fcr_home_label_proctoring',
//     description: 'fcr_home_label_proctoring',
//     value: EduRoomTypeEnum.RoomProctor,
//     sdkType: SdkType.AgoraProctorSdk,
//     className: 'card-green',
//   });
// }

export const serviceTypeOptions = [
  {
    label: 'fcr_create_label_service_type_RTC',
    description: 'fcr_create_label_latency_RTC',
    value: AgoraLatencyLevel.UltraLow,
    icon: premiumIcon,
  },
  {
    label: 'fcr_create_label_service_type_Standard',
    description: 'fcr_create_label_latency_Standard',
    value: AgoraLatencyLevel.Low,
    icon: standardIcon,
  },
  // {
  //   label: 'fcr_create_label_service_type_CDN',
  //   description: 'fcr_create_label_latency_CDN',
  //   value: EduRoomServiceTypeEnum.Fusion,
  //   icon: <img src={cdnIcon} />,
  // },
];

export const classroomBackgroundImagePath =
  'https://solutions-apaas.agora.io/demo/education/static/img/background_default1.png';

export const weekday = {
  0: 'fcr_create_option_time_selector_Sun',
  1: 'fcr_create_option_time_selector_Mon',
  2: 'fcr_create_option_time_selector_Tue',
  3: 'fcr_create_option_time_selector_Wed',
  4: 'fcr_create_option_time_selector_Thu',
  5: 'fcr_create_option_time_selector_Fri',
  6: 'fcr_create_option_time_selector_Sat',
};

export const TimeFormat = 'HH:mm';

export const computeEndTime = (date: Dayjs) => {
  return date.add(30, 'minute');
};

export const combDateTime = (date: Dayjs, time: Dayjs) => {
  const result = new Date(
    date.year(),
    date.month(),
    date.date(),
    time.hour(),
    time.minute(),
    time.second(),
  );
  return dayjs(result);
};

export type CreateFormValue = {
  name: string;
  date: Dayjs;
  time: Dayjs;
  link: string;
};
