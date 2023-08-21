import { CommonHelmet } from '@app/components/common-helmet';
import { useSettingsH5 } from '@app/components/settings';
import { useRoomIdForm } from '@app/hooks';
import { useLangSwitchValue } from '@app/hooks/useLangSwitchValue';
import { useJoinRoom } from '@app/hooks/useJoinRoom';
import { useNickNameForm } from '@app/hooks/useNickNameForm';
import { useNoAuthUser } from '@app/hooks/useNoAuthUser';
import { GlobalStoreContext } from '@app/stores';
import type { Platform } from 'agora-edu-core';
import { observer } from 'mobx-react';
import { useContext } from 'react';
import './index.css';
import { messageError } from '@app/utils';
import { useI18n, getI18n } from 'agora-common-libs';
import { useAForm, AFormProps, AForm, AFormItem } from '@app/components/form';
import { SvgImg, SvgIconEnum } from '@app/components/svg-img';
import { AInput } from '@app/components/input';
import { AButton } from '@app/components/button';

type JoinFormValue = {
  roomId: string;
  nickName: string;
};

export const H5JoinRoom = observer(() => {
  const transI18n = useI18n();
  const i18n = getI18n();
  const { setLoading } = useContext(GlobalStoreContext);
  const [form] = useAForm<JoinFormValue>();
  const { openSettings, SettingsContainer } = useSettingsH5();
  const { quickJoinRoomNoAuth } = useJoinRoom();
  const { rule: nickNameRule } = useNickNameForm();
  const { rule: roomIdRule, formatFormField, getUnformattedValue } = useRoomIdForm();
  const { userId, nickName, setNickName } = useNoAuthUser();
  const initialValues = {
    nickName,
    roomId: '',
  };
  const onSubmit = () => {
    setLoading(true);
    form
      .validateFields()
      .then(async (data) => {
        setNickName(data.nickName);
        data.roomId = getUnformattedValue(data.roomId);
        return quickJoinRoomNoAuth({
          role: 2,
          roomId: data.roomId,
          nickName: data.nickName,
          platform: 'H5' as Platform,
          userId: userId,
        }).catch((error) => {
          if (error.code) {
            messageError(error.code);
          }
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const formOnValuesChange: AFormProps<JoinFormValue>['onValuesChange'] = (changeValues: any) => {
    if (changeValues.roomId) {
      formatFormField(form, changeValues.roomId, 'roomId');
    }
  };

  const welcomeElement = useLangSwitchValue({
    en: (
      <div className="welcome">
        Welcome to
        <br />
        FlexibleClassroom
      </div>
    ),
    zh: (
      <div className="welcome">
        欢迎
        <br /> 使用灵动课堂
      </div>
    ),
  });

  return (
    <>
      <CommonHelmet></CommonHelmet>
      <div className="h5-join-room">
        <div className="header-bg">
          <div className={`logo ${i18n.language}`}></div>
        </div>
        <div className="content">
          <div className="hello">
            {transI18n('fcr_h5_invite_hello')}
            <SvgImg type={SvgIconEnum.SETTINGS} size={20} onClick={openSettings} />
          </div>
          {welcomeElement}
          <AForm<JoinFormValue>
            className="form"
            form={form}
            onValuesChange={formOnValuesChange}
            initialValues={initialValues}>
            <div className="form-item">
              <div className="label">{transI18n('fcr_join_room_label_RoomID')}</div>
              <AFormItem name="roomId" rules={roomIdRule}>
                <AInput placeholder={transI18n('fcr_join_room_tips_room_id')} />
              </AFormItem>
            </div>
            <div className="form-item">
              <div className="label">{transI18n('fcr_join_room_label_name')}</div>
              <AFormItem name="nickName" rules={nickNameRule}>
                <AInput placeholder={transI18n('fcr_join_room_tips_name')} />
              </AFormItem>
            </div>
          </AForm>
          <AButton className="join-btn" onClick={onSubmit}>
            {transI18n('fcr_join_room_button_join')}
          </AButton>
        </div>
      </div>
      <SettingsContainer />
    </>
  );
});
