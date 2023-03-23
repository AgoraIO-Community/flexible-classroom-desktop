import { GlobalStoreContext } from '@app/stores';
import { AgoraOnlineClassSDK } from 'agora-onlineclass-sdk';
import { isEmpty } from 'lodash';
import { observer } from 'mobx-react';
import { useContext, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

export const LaunchPage = observer(() => {
  const homeStore = useContext(GlobalStoreContext);
  const appRef = useRef<HTMLDivElement | null>(null);
  const history = useHistory();
  const launchOption = homeStore.launchOption;
  const { setLoading, loading } = useContext(GlobalStoreContext);
  useEffect(() => {
    loading && setLoading(false);
  }, [loading]);
  useEffect(() => {
    if (isEmpty(launchOption)) {
      history.push('/');
      return;
    }

    if (appRef.current) {
      const unmount = AgoraOnlineClassSDK.launch(appRef.current);
      return unmount as () => void;
    }
  }, []);

  return <div ref={appRef} id="app" className="bg-background w-full h-full"></div>;
});
