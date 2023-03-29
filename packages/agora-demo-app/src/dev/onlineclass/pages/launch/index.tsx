import { GlobalStoreContext } from '@app/stores';
import { AgoraOnlineclassSDK } from 'agora-onlineclass-sdk';
import { isEmpty } from 'lodash';
import { observer } from 'mobx-react';
import { useContext, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '@app/assets/favicon.png';

export const LaunchPage = observer(() => {
  const { launchOption } = useContext(GlobalStoreContext);
  const appRef = useRef<HTMLDivElement | null>(null);
  const history = useHistory();

  useEffect(() => {
    if (isEmpty(launchOption)) {
      console.log('Invalid launch option, nav to /');
      history.push('/');
      return;
    }
    AgoraOnlineclassSDK.setParameters(JSON.stringify({ logo, host: launchOption.sdkDomain }));
    if (appRef.current) {
      const unmount = AgoraOnlineclassSDK.launch(appRef.current, {
        userUuid: launchOption.userUuid,
        userName: launchOption.userName,
        roomUuid: launchOption.roomUuid,
        roleType: launchOption.roleType,
        language: launchOption.language,
        token: launchOption.rtmToken,
        appId: launchOption.appId,
        region: launchOption.region,
        roomName: launchOption.roomName,
        roomType: launchOption.roomType,
        startTime: launchOption.startTime,
        duration: launchOption.duration,
        devicePretest: true,
      });
      return unmount;
    }
  }, []);

  return <div ref={appRef} className="bg-background w-full h-full" />;
});
