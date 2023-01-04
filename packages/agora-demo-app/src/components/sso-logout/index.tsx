import { FC } from 'react';

type Props = {
  onLoad?: () => void;
  logoutUrl: string;
};

export const SSOLogout: FC<Props> = ({ onLoad, logoutUrl }) => {
  return (
    <div className="fixed z-50 inset-0">
      <iframe className="w-full h-full" src={logoutUrl} onLoad={onLoad} />
    </div>
  );
};
