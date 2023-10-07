import { useI18n } from 'agora-common-libs';
import { useMemo } from 'react';

export const useRoomNameForm = () => {
  const transI18n = useI18n();
  const rule = useMemo(
    () => [
      { required: true, message: transI18n('fcr_create_label_room_name_empty') },
      {
        pattern: /^.{1,50}$/,
        message: transI18n('fcr_create_room_tips_name_rule'),
      },
    ],
    [transI18n],
  );
  return { rule };
};
