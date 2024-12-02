import { Button } from '@app/components/button';
import { Field } from '@app/components/form-field';
import { Layout } from '@app/components/layout';
import { GlobalStoreContext } from '@app/stores';
import { SceneType } from '@app/type';
import { transI18n, useI18n } from 'agora-common-libs';
import { FC, useContext, useState } from 'react';

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

export const LoginForm: FC<{
  onSubmit: (values: any) => void;
  sceneOptions: { text: string; value: SceneType }[];
}> = ({ onSubmit, sceneOptions }) => {
  const t = useI18n();

  const globalStore = useContext(GlobalStoreContext);

  const roleOptions = [
    { text: t('home.role_teacher'), value: '1' },
    { text: t('home.role_student'), value: '2' },
    { text: t('home.role_assistant'), value: '3' },
  ];

  const typeOptions = sceneOptions.map(({ text, value }) => {
    return { text, value };
  });

  const { values, errors, eventHandlers, validate } = useForm({
    initialValues: ():Record<string, any> => {
      const launchConfig = globalStore.launchConfig;
      const { chatGroup, roomUuid, roomName, userUuid, userName, roleType, sceneType } = launchConfig;

      let defaultSceneType = parseInt(window.__launchRoomType || `${sceneType}`);

      const exists = typeOptions.some(({ value }) => value === sceneType);

      if (!exists) {
        defaultSceneType = typeOptions.length ? typeOptions[0].value : SceneType.SmallClass;
      }

      return {
        roomUuid: window.__launchRoomUuid || `${roomUuid ?? ''}`,
        roomName: window.__launchRoomName || `${roomName ?? ''}`,
        userUuid: window.__launchUserUuid || `${userUuid ?? ''}`,
        userName: window.__launchUserName || `${userName ?? ''}`,
        roleType: window.__launchRoleType || `${roleType ?? ''}`,
        chatGroup: `${chatGroup ?? ''}`,
        sceneType: defaultSceneType,
      };
    },
    validate: (values, fieldName, onError) => {
      switch (fieldName) {
        case 'roomUuid':
          if (!values.roomUuid) {
            return onError('roomUuid', transI18n('home_form_placeholder_room_id'));
          }
          if (values.roomUuid.length <6) {
            return onError(
              'roomUuid',
              transI18n('home_form_error_room_id_limit', { min: 6}),
            );
          }
          break;
        case 'userUuid':
          if (!values.userUuid) {
            return onError('userUuid', transI18n('home_form_placeholder_user_id'));
          }
          if (values.userUuid.length < 6) {
            return onError(
              'userUuid',
              transI18n('home_form_error_user_id_limit', { min: 6 }),
            );
          }
          break;
        case 'roleType':
          values.roleType === undefined &&
            onError('roleType', transI18n('home_form_error_role_type_empty'));
          break;
        case 'sceneType':
          values.sceneType === undefined &&
            onError('sceneType', transI18n('home_form_error_room_type_empty'));
          break;
        case 'chatGroup':
            
          if(values.chatGroup){
            const list = values.chatGroup.split(",") 
            for(let item of list) {
              const ret = item.split("-")
              if(ret.length != 2) {
                return onError(
                  'chatGroup',
                  transI18n('home_form_error_chat_group_illegal', { text: item }),
                );
              }
            }
          }
            break;
      }
    },
  });

  const { chatGroup, roomUuid, roomName, userUuid, userName, roleType, sceneType } = values;

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(values);
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        return false;
      }}>
      <p className="form-header fcr-text-center">{t('home_greeting')}</p>
      <Layout className="fcr-mt-6 fcr-relative fcr-z-20 fcr-justify-between">
        <Field
          label={t('home_form_field_room_id')}
          type="text"
          placeholder={t('home_form_placeholder_room_id')}
          width={203}
          value={roomUuid}
          {...eventHandlers('roomUuid')}
          error={errors.roomUuid}
        />
        <Field
            label={t('home_form_field_room')}
            type="text"
            placeholder={t('home_form_placeholder_room_name')}
            width={149}
            value={roomName}
            {...eventHandlers('roomName')}
            error={errors.roomName}
          />
      </Layout>
      <Layout className="fcr-mt-6 fcr-relative fcr-z-20 fcr-justify-between">
        <Field
          label={t('home_form_field_user_id')}
          type="text"
          placeholder={t('home_form_placeholder_user_id')}
          width={203}
          value={userUuid}
          {...eventHandlers('userUuid')}
          error={errors.userUuid}
        />
        <Field
          label={t('home_form_field_name')}
          type="text"
          placeholder={t('home_form_placeholder_user_name')}
          width={149}
          value={userName}
          {...eventHandlers('userName')}
          error={errors.userName}
        />
      </Layout>
      <Layout className="fcr-mt-6 fcr-relative fcr-z-10 fcr-justify-between">
        <Field
          label={t('home_form_field_type')}
          type="select"
          placeholder={t('home_form_placeholder_room_type')}
          width={203}
          value={sceneType}
          {...eventHandlers('sceneType')}
          options={typeOptions}
          error={errors.sceneType}
        />
        <Field
          label={t('home_form_field_role')}
          type="select"
          placeholder={t('home_form_placeholder_user_role')}
          width={149}
          value={roleType}
          options={roleOptions}
          {...eventHandlers('roleType')}
          error={errors.roleType}
        />
      </Layout>
      <Layout className="fcr-mt-8">
        <Field
          label={t('home_form_field_chat')}
          type="text"
          placeholder={t('home_form_placeholder_chat_group')}
          width={369}
          value={chatGroup}
          {...eventHandlers('chatGroup')}
          error={errors.chatGroup}
        />
      </Layout>
      <Layout className="fcr-mt-8 fcr-mb-6">
        <Button
          className="form-submit-button fcr-w-full"
          size="lg"
          type={'primary'}
          onClick={handleSubmit}>
          {t('home_form_submit')}
        </Button>
      </Layout>
      <p className="form-footer text-center fcr-mt-8 fcr-mb-0">
        Version: Flexible Classroom_{DEMO_VERSION}
      </p>
    </form>
  );
};
