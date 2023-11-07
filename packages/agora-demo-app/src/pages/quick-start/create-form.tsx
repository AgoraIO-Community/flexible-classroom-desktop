import { Button } from '@app/components/button';
import { Field } from '@app/components/form-field';
import { Layout } from '@app/components/layout';
import { GlobalStoreContext, RoomStoreContext } from '@app/stores';
import { SceneType } from '@app/type';
import { transI18n, useI18n } from 'agora-common-libs';
import { FC, useContext, useState } from 'react';
import md5 from 'js-md5';
import { useJoinRoom } from '@app/hooks';
import type { Platform } from 'agora-edu-core';
import { useNoAuthUser } from '@app/hooks/useNoAuthUser';
import { studentLimit } from '@app/utils/constants';
import type { AgoraRteMediaPublishState } from 'agora-rte-sdk';
import set from 'lodash/set';
import { classroomBackgroundImagePath } from '../create-room/helper';
import { observer } from 'mobx-react';
import { ErrorCode, messageError } from '@app/utils';
const useForm = <T extends Record<string, unknown>>({
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
  sceneOptions: { text: string; value: SceneType }[];
}> = observer(({ onSubmit, sceneOptions }) => {
  const t = useI18n();

  const globalStore = useContext(GlobalStoreContext);
  const { createRoomNoAuth } = useContext(RoomStoreContext);

  const typeOptions = sceneOptions.map(({ text, value }) => {
    return { text, value };
  });

  const { quickJoinRoomNoAuth } = useJoinRoom();
  const { nickName, setNickName } = useNoAuthUser();

  const { values, errors, eventHandlers, validate } = useForm({
    initialValues: () => {
      const launchConfig = globalStore.launchConfig;
      const originLaunchConfig = globalStore.originLaunchConfig;

      const { sceneType = SceneType.SmallClass } = launchConfig;
      const { roomName, userName } = originLaunchConfig;

      let defaultSceneType = window.__launchRoomType || `${sceneType}`;

      const exists = typeOptions.some(({ value }) => value === sceneType);

      if (!exists) {
        defaultSceneType = `${SceneType.SmallClass}`;
      }

      return {
        roomName: window.__launchRoomName || `${roomName ?? ''}`,
        userName: window.__launchUserName || `${userName ?? nickName ?? ''}`,
        sceneType: parseInt(defaultSceneType),
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
        case 'sceneType':
          values.sceneType === undefined &&
            onError('sceneType', transI18n('home_form_error_room_type_empty'));
          break;
      }
    },
  });

  const { roomName, userName, sceneType } = values;

  const handleSubmit = () => {
    if (validate() && onSubmit()) {
      const role = 1;
      const userId = md5(`${userName}-${role}`);

      const isOnlineclass = sceneType === SceneType.Scene;
      const widgets = {};
      if (isOnlineclass) {
        set(widgets, 'netlessBoard.state', 0);
      }
      const processes = isOnlineclass
        ? {
            handsUp: {
              defaultAcceptRole: '',
            },
          }
        : undefined;
      const roleConfigs = isOnlineclass
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

      globalStore.setLoading(true);
      const isProctoring = sceneType === SceneType.Proctoring;
      const roomProperties = isProctoring
        ? {
            watermark: false,
            examinationUrl: 'https://forms.clickup.com/8556478/f/853xy-21947/IM8JKH1HOOF3LDJDEB',
            latencyLevel: 2,
          }
        : {
            watermark: false,
            boardBackgroundImage: classroomBackgroundImagePath,
            latencyLevel: 2,
          };
      createRoomNoAuth({
        sceneType,
        widgets,
        roomName: roomName,
        roomProperties,
        startTime: Date.now(),
        endTime: Date.now() + 30 * 60 * 1000,
        userUuid: userId,
        roleConfigs,
        processes,
      })
        .then((data) => {
          setNickName(userName);
          globalStore.setOriginLaunchConfig({
            roomName,
            userName,
          });
          return quickJoinRoomNoAuth(
            {
              role: role,
              roomId: data.roomId,
              nickName: userName,
              platform: 'PC' as Platform,
              userId,
            },
            {
              returnToPath: '/quick-start',
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
      <Layout direction="col" className="fcr-mt-6 fcr-relative fcr-z-20">
        <Field
          label={t('home_form_field_type')}
          type="select"
          placeholder={t('home_form_placeholder_room_type')}
          width={369}
          value={sceneType}
          {...eventHandlers('sceneType')}
          options={typeOptions}
          error={errors.sceneType}
        />
        {sceneType === SceneType.Scene && (
          <div className="fcr-text-xs fcr-pt-1">
            {transI18n(`${t('fcr_login_free_label_only_dark')}`)}
          </div>
        )}
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
});
