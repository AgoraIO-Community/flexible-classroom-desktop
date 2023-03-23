import { GlobalStoreContext } from '@app/stores';
import { AgoraProctorSDK } from 'agora-proctor-sdk';
import { AgoraEduClassroomEvent } from 'agora-edu-core';
import { isEmpty } from 'lodash';
import { observer } from 'mobx-react';
import { useContext, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

export const assetURLs = {
  // virtual background assets
  virtualBackground1: 'effect/default1.jpg',
  virtualBackground2: 'effect/default2.jpg',
  virtualBackground3: 'effect/default3.jpg',
  virtualBackground4: 'effect/default4.jpg',
  virtualBackground5: 'effect/default5.jpg',
  virtualBackground6: 'effect/default6.jpg',
  virtualBackground7: 'effect/default7.jpg',
  virtualBackground8: 'effect/default8.mp4',
  virtualBackground9: 'effect/default9.mp4',
};

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
      let unmount = () => {};
      AgoraProctorSDK.setParameters(
        JSON.stringify({
          host: homeStore.launchOption.sdkDomain,
          uiConfigs: homeStore.launchOption.scenes,
          themes: homeStore.launchOption.themes,
        }),
      );

      AgoraProctorSDK.config({
        appId: launchOption.appId,
        region: launchOption.region ?? 'CN',
      });

      unmount = AgoraProctorSDK.launch(appRef.current, {
        ...launchOption,
        widgets: {},
        listener: (evt: AgoraEduClassroomEvent, type) => {
          console.log('launch#listener ', evt);
          if (evt === AgoraEduClassroomEvent.Destroyed) {
            history.push(`/?reason=${type}`);
          }
        },
      });

      return unmount;
    }
  }, []);

  return <div ref={appRef} id="app" className="bg-background w-full h-full"></div>;
});
