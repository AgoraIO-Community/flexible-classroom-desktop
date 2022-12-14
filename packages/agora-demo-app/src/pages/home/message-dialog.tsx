import { useEffect, useState } from 'react';
import { FC } from 'react';
import { useHistory } from 'react-router';
import { useCallback } from 'react';
import { transI18n } from 'agora-common-libs';
import { Modal } from '@app/components/modal';
import { Button } from '@app/components/button';

export const MessageDialog: FC = () => {
  const history = useHistory();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(history.location.search);
    if (params.get('reason') === '1') {
      setMessage(transI18n('toast.kick_by_teacher'));
    }
    console.log('params', history.location, params, params.get('reason'));
  }, [history]);

  const onOk = useCallback(() => {
    setMessage('');
  }, []);

  return message ? (
    <Modal
      title={transI18n('message')}
      onOk={onOk}
      footer={[
        <Button key="ok" type="primary" action="ok">
          {transI18n('toast.confirm')}
        </Button>,
      ]}>
      {transI18n('toast.kick_by_teacher')}
    </Modal>
  ) : null;
};
