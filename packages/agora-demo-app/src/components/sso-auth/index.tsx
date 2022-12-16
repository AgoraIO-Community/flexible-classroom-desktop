import { UserApi } from '@app/api';
import { getRegion } from '@app/stores/global';
import { indexUrl, token } from '@app/utils';
import { AgoraRegion, AgoraRteEngineConfig, AgoraRteRuntimePlatform } from 'agora-rte-sdk';
import { FC, useEffect, useState } from 'react';

type Props = {
  onComplete: () => void;
};

export const SSOAuth: FC<Props> = ({ onComplete }) => {
  const [url, setURL] = useState('');

  useEffect(() => {
    let mounted = true;
    UserApi.shared
      .getAuthorizedURL({
        redirectUrl: indexUrl,
        toRegion: getRegion() === AgoraRegion.CN ? 'cn' : 'en',
      })
      .then((redirectURL) => {
        if (AgoraRteEngineConfig.platform === AgoraRteRuntimePlatform.Electron) {
          if (mounted) {
            setURL(redirectURL);
          }
        } else {
          window.location.href = redirectURL;
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    token.clear();
    const interval = setInterval(() => {
      if (mounted) {
        // check whether the token is ready
        if (token.accessToken) {
          clearInterval(interval);
          onComplete();
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
      mounted = false;
    };
  }, []);

  return (
    <div className="fixed z-50 inset-0">
      <iframe className="w-full h-full" src={url} />
    </div>
  );
};
