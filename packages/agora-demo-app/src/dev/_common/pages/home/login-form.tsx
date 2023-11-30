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
    initialValues: () => {
      const launchConfig = globalStore.launchConfig;
      const { roomName, userName, roleType, sceneType } = launchConfig;

      let defaultSceneType = parseInt(window.__launchRoomType || `${sceneType}`);

      const exists = typeOptions.some(({ value }) => value === sceneType);

      if (!exists) {
        defaultSceneType = typeOptions.length ? typeOptions[0].value : SceneType.SmallClass;
      }

      return {
        roomName: window.__launchRoomName || `${roomName ?? ''}`,
        userName: window.__launchUserName || `${userName ?? ''}`,
        roleType: window.__launchRoleType || `${roleType ?? ''}`,
        sceneType: defaultSceneType,
      };
    },
    validate: (values, fieldName, onError) => {
      switch (fieldName) {
        case 'roomName':
          if (!values.roomName) {
            return onError('roomName', transI18n('home_form_placeholder_room_name'));
          }
          if (values.roomName.length < 6 || values.roomName.length > 50) {
            return onError(
              'roomName',
              transI18n('home_form_error_room_name_limit', { min: 6, max: 50 }),
            );
          }
          break;
        case 'userName':
          if (!values.userName) {
            return onError('userName', transI18n('home_form_error_user_name_empty'));
          }
          if (values.userName.length < 3 || values.userName.length > 25) {
            return onError(
              'userName',
              transI18n('home_form_error_user_name_limit', { min: 3, max: 25 }),
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
      }
    },
  });

  const { roomName, userName, roleType, sceneType } = values;

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
      <Layout className="fcr-mt-6 fcr-relative fcr-z-20 fcr-justify-between">
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
          {t('home_form_submit')}
        </Button>
      </Layout>
      <p className="form-footer text-center fcr-mt-8 fcr-mb-0">
        Version: Flexible Classroom_{DEMO_VERSION}
      </p>
    </form>
  );
};
