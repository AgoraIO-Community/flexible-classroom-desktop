import { FC } from 'react';

type Props = {
  onLoad?: () => void;
  logoutUrl: string;
};

export const SSOLogout: FC<Props> = ({ onLoad, logoutUrl }) => {
  return (
    <div className="fcr-fixed fcr-z-50 fcr-inset-0">
      <iframe className="fcr-w-full fcr-h-full" src={logoutUrl} onLoad={onLoad} />
    </div>
  );
};
