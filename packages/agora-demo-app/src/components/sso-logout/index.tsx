import { indexUrl } from '@app/utils';
import { AgoraRteEngineConfig, AgoraRteRuntimePlatform } from 'agora-rte-sdk';
import { FC, useLayoutEffect } from 'react';

type Props = {
  onLoad?: () => void;
};

export const SSOLogout: FC<Props> = ({ onLoad }) => {
  const url = `https://sso2.agora.io/api/v0/logout?redirect_uri=${indexUrl}`;
  useLayoutEffect(() => {
    if (AgoraRteEngineConfig.platform !== AgoraRteRuntimePlatform.Electron) {
      window.location.href = url;
    }
  }, []);
  return (
    <div className="fixed z-50 inset-0">
      <iframe className="w-full h-full" src={url} onLoad={onLoad} />
    </div>
  );
};
