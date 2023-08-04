import { useEffect, useState } from 'react';
import type { AgoraEduSDK } from 'agora-classroom-sdk';
import type { AgoraProctorSDK } from 'agora-proctor-sdk';
import type { AgoraOnlineclassSDK } from 'agora-onlineclass-sdk';

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

export const useOnlineclassSdk = () => {
  const [loader, setLoader] = useState<{ ready: boolean; sdk: typeof AgoraOnlineclassSDK | null }>({
    ready: false,
    sdk: null,
  });

  useEffect(() => {
    import(/* webpackPrefetch: true */ 'agora-onlineclass-sdk').then(({ AgoraOnlineclassSDK }) => {
      setLoader({ ready: true, sdk: AgoraOnlineclassSDK });
    });
  }, []);

  return loader;
};
