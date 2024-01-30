import { useEffect, useState } from 'react';
import type { AgoraProctorSDK } from 'agora-proctor-sdk';

export const useProctorSdk = () => {
  const [loader, setLoader] = useState<{ ready: boolean; sdk: typeof AgoraProctorSDK | null }>({
    ready: false,
    sdk: null,
  });

  useEffect(() => {
    import(/* webpackPrefetch: true */ 'agora-proctor-sdk').then(({ AgoraProctorSDK }) => {
      setLoader({ ready: true, sdk: AgoraProctorSDK });
    });
  }, []);

  return loader;
};
