import { UserApi } from '@app/api';
import { getRegion } from '@app/stores/global';
import { indexUrl, token } from '@app/utils';
import { isElectron } from 'agora-rte-sdk/lib/core/utils/utils';
import { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

type Props = {
  onComplete: () => void;
};

export const SSOAuth: FC<Props> = ({ onComplete }) => {
  const [url, setURL] = useState('');
  const history = useHistory();

  useEffect(() => {
    let mounted = true;
    UserApi.shared
      .getAuthorizedURL({
        // redirectUrl: indexUrl,
        redirectUrl: `${indexUrl}?from=${encodeURIComponent(window.location.href)}`,
        toRegion: getRegion() === 'CN' ? 'cn' : 'en',
      })
      .then((redirectURL) => {
        if (isElectron()) {
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
    <div className="fcr-fixed fcr-z-50 fcr-inset-0">
      <iframe className="fcr-w-full fcr-h-full" src={url} />
    </div>
  );
};
