import { ModalMethod } from '@app/components/modal';
import { useJoinRoom } from '@app/hooks/useJoinRoom';
import { GlobalStoreContext } from '@app/stores';
import { LoginTypeEnum } from '@app/stores/global';
import { ErrorCode, i18nError } from '@app/utils';
import { ShareContent, shareLink } from '@app/utils/share';
import type { AgoraRegion } from 'agora-rte-sdk';
import { observer } from 'mobx-react';
import { useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';

export const InviteRoom = observer(() => {
  const history = useHistory();
  const location = useLocation();
  const { quickJoinRoom } = useJoinRoom();
  const globalStore = useContext(GlobalStoreContext);

  useEffect(() => {
    const data: ShareContent | null = shareLink.parseSearch(location.search);
    if (!data) {
      ModalMethod.confirm({
        content: i18nError(ErrorCode.INVALID_SHARE_LINK),
        onOk: () => {
          history.push('/');
        },
      });
      return;
    }
    if (data.region) globalStore.setRegion(data.region as AgoraRegion);
    if (globalStore.loginType === LoginTypeEnum.NeedLogin) {
      history.push(`/join-room?roomId=${data.roomId}&role=${data.role}`);
    } else {
      history.push(`/quick-start?roomId=${data.roomId}&role=${data.role}`);
    }
    return () => {
      ModalMethod.destroyAll();
    };
  }, [quickJoinRoom]);

  return <div></div>;
});
