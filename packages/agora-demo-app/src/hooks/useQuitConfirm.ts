import { useI18n } from 'agora-common-libs';
import { useEffect } from 'react';
import { useHistory } from 'react-router';

export const useQuitConfirm = () => {
  const history = useHistory();
  const transI18n = useI18n();

  useEffect(() => {
    return history.block(() => {
      if (!window.confirm(transI18n('fcr_room_tips_leave_room'))) {
        history.goForward();
        return false;
      }
    });
  }, []);
};
