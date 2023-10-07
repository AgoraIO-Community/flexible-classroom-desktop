import { useI18n } from 'agora-common-libs';
import { useMemo } from 'react';

export const useNickNameForm = () => {
  const transI18n = useI18n();
  const rule = useMemo(
    () => [
      {
        required: true,
        message: transI18n('fcr_join_room_tips_name'),
      },
      {
        pattern: /^.{2,20}$/,
        message: transI18n('fcr_create_room_tips_name_rule'),
      },
    ],
    [transI18n],
  );
  return { rule };
};
