import { useEffect, useState } from 'react';
import type { FcrUIScene } from 'fcr-ui-scene';

export const useFcrUIScene = () => {
  const [loader, setLoader] = useState<{ ready: boolean; sdk: typeof FcrUIScene | null }>({
    ready: false,
    sdk: null,
  });

  useEffect(() => {
    import(/* webpackPrefetch: true */ 'fcr-ui-scene').then(({ FcrUIScene }) => {
      setLoader({ ready: true, sdk: FcrUIScene });
    });
  }, []);

  return loader;
};
