import { Button } from '@app/components/button';
import { Field } from '@app/components/form-field';
import { Layout } from '@app/components/layout';
import { GlobalStoreContext, RoomStoreContext } from '@app/stores';
import { SdkType } from '@app/type';
import { transI18n, useI18n } from 'agora-common-libs';
import { FC, useContext, useState } from 'react';
import md5 from 'js-md5';
import { useJoinRoom } from '@app/hooks';
import type { Platform } from 'agora-edu-core';
import { useNoAuthUser } from '@app/hooks/useNoAuthUser';
import { onlineclassStudentLimit } from '@app/utils/constants';
import type { AgoraRteMediaPublishState } from 'agora-rte-sdk';

const useForm = <T extends Record<string, string>>({
  initialValues,
  validate,
}: {
  initialValues: T | (() => T);
  validate: (
    values: T,
    fieldName: keyof T,
    onError: (field: keyof T, message: string) => void,
  ) => void;
}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleValidate = (fieldName: keyof T, temp: typeof errors = {}) =>
    validate(values, fieldName, (fieldName: keyof T, message: string) => {
      temp[fieldName] = message;
    });

  return {
    values,
    errors,
    validate: () => {
      const temp = {};
      Object.keys(values).forEach((fieldName) => {
        handleValidate(fieldName, temp);
      });

      setErrors(temp);

      return !Object.keys(temp).length;
    },
    eventHandlers: (fieldName: keyof T) => ({
      onChange: (value: string) => {
        if (value === '') {
          // const temp = { ...errors };
          // delete temp[fieldName];
          // setErrors(temp);
        }
        setValues({
          ...values,
          [fieldName]: value,
        });
      },
      onBlur: () => {
        const value = values[fieldName];
        if (value === '') {
          // const temp = { ...errors };
          // delete temp[fieldName];
          // setErrors(temp);
        } else {
          const temp = { ...errors };
          delete temp[fieldName];
          handleValidate(fieldName, temp);
          setErrors(temp);
        }
      },
      onKeyUp: () => {
        const temp = { ...errors };
        delete temp[fieldName];
        handleValidate(fieldName, temp);
        setErrors(temp);
      },
    }),
  };
};

export const CreateForm: FC<{
  onSubmit: () => boolean;
  sceneOptions: { text: string; value: string; sdkType: SdkType }[];
}> = ({ onSubmit, sceneOptions }) => {
  const t = useI18n();

  const globalStore = useContext(GlobalStoreContext);
  const { createRoomNoAuth } = useContext(RoomStoreContext);

  const typeOptions = sceneOptions.map(({ text, value, sdkType }) => {
    return { text, value: `${value}-${sdkType}` };
  });

  const { quickJoinRoomNoAuth } = useJoinRoom();
  const { nickName, setNickName } = useNoAuthUser();

  const { values, errors, eventHandlers, validate } = useForm({
    initialValues: () => {
      const launchConfig = globalStore.launchConfig;
      const { roomName, userName, roomType, sdkType } = launchConfig;

      let comboType =
        window.__launchRoomType || (roomType && sdkType ? `${roomType + '-' + sdkType}` : '');

      const exists = typeOptions.some(({ value }) => value === comboType);

      if (!exists) {
        comboType = '';
      }

      return {
        roomName: window.__launchRoomName || `${roomName ?? ''}`,
        userName: window.__launchUserName || `${userName ?? nickName ?? ''}`,
        roomType: comboType,
      };
    },
    validate: (values, fieldName, onError) => {
      switch (fieldName) {
        case 'roomName':
          if (!values.roomName) {
            return onError('roomName', transI18n('home_form_placeholder_room_name'));
          }
          if (values.roomName.length < 1 || values.roomName.length > 50) {
            return onError(
              'roomName',
              transI18n('home_form_error_room_name_limit', { min: 1, max: 50 }),
            );
          }
          break;
        case 'userName':
          if (!values.userName) {
            return onError('userName', transI18n('home_form_error_user_name_empty'));
          }
          if (values.userName.length < 2 || values.userName.length > 20) {
            return onError(
              'userName',
              transI18n('home_form_error_user_name_limit', { min: 2, max: 20 }),
            );
          }
          break;
        case 'roomType':
          !values.roomType && onError('roomType', transI18n('home_form_error_room_type_empty'));
          break;
      }
    },
  });

  const { roomName, userName, roomType } = values;

  const handleSubmit = () => {
    if (validate() && onSubmit()) {
      const [roomTypeStr, sdkType] = roomType.split('-');
      const role = 1;
      const userUuid = md5(`${userName}_${role}-main`);

      const isOnlineclass = sdkType === SdkType.AgoraOnlineclassSdk;

      const roleConfigs = isOnlineclass
        ? {
            2: {
              limit: onlineclassStudentLimit,
              defaultStream: {
                audioState: 1 as AgoraRteMediaPublishState,
                videoState: 1 as AgoraRteMediaPublishState,
                state: 1 as AgoraRteMediaPublishState,
              },
            },
          }
        : undefined;

      globalStore.setLoading(true);
      createRoomNoAuth({
        roomName: roomName,
        roomType: parseInt(roomTypeStr),
        startTime: Date.now(),
        endTime: Date.now() + 30 * 60 * 1000,
        userUuid: userUuid,
        roleConfigs,
        roomProperties: {
          sdkType,
        },
      })
        .then((data) => {
          setNickName(userName);
          return quickJoinRoomNoAuth(
            {
              role: role,
              roomId: data.roomId,
              nickName: userName,
              platform: 'PC' as Platform,
              userId: userUuid,
            },
            {
              returnToPath: '/quick-start',
            },
          );
        })
        .finally(() => {
          globalStore.setLoading(false);
        });
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        return false;
      }}>
      <Layout className="fcr-mt-8">
        <Field
          label={t('home_form_field_room')}
          type="text"
          placeholder={t('home_form_placeholder_room_name')}
          width={369}
          value={roomName}
          {...eventHandlers('roomName')}
          error={errors.roomName}
        />
      </Layout>
      <Layout className="fcr-mt-6 fcr-relative fcr-z-20">
        <Field
          label={t('home_form_field_type')}
          type="select"
          placeholder={t('home_form_placeholder_room_type')}
          width={369}
          value={roomType}
          {...eventHandlers('roomType')}
          options={typeOptions}
          error={errors.roomType}
        />
      </Layout>

      <Layout className="fcr-mt-6 fcr-relative fcr-z-10 fcr-justify-between">
        <Field
          label={t('home_form_field_name')}
          type="text"
          placeholder={t('home_form_placeholder_user_name')}
          width={203}
          value={userName}
          {...eventHandlers('userName')}
          error={errors.userName}
        />

        <Field
          label={t('home_form_field_duration')}
          type="text"
          placeholder="30mins"
          readOnly
          width={149}
          value={''}
        />
      </Layout>
      <Layout className="fcr-mt-8 fcr-mb-6">
        <Button
          className="form-submit-button fcr-w-full"
          size="lg"
          type={'primary'}
          onClick={handleSubmit}>
          {t('fcr_login_free_button_create')}
        </Button>
      </Layout>
    </form>
  );
};
