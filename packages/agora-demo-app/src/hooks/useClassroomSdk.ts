import { useEffect, useState } from 'react';
import type { AgoraEduSDK } from 'agora-classroom-sdk';

export const useEduSdk = () => {
  const [loader, setLoader] = useState<{ ready: boolean; sdk: typeof AgoraEduSDK | null }>({
    ready: false,
    sdk: null,
  });

  useEffect(() => {
    import(/* webpackPrefetch: true */ 'agora-classroom-sdk').then(({ AgoraEduSDK }) => {
      setLoader({ ready: true, sdk: AgoraEduSDK });
    });
  }, []);

  return loader;
};
