import { FC, PropsWithChildren } from 'react';
import './index.css';
export interface PageLayoutProps {
  title: string;
  onBack?: () => void;
}

export const PageLayout: FC<PropsWithChildren<PageLayoutProps>> = ({ title, onBack, children }) => {
  return (
    <div className="h5-page-layout fcr-w-full fcr-h-full fcr-flex fcr-flex-col">
      <div className="header">
        {title}
        <div className="back fcr-absolute fcr-left-0 fcr-top-0" onClick={onBack}></div>
      </div>
      <div className="fcr-flex-1">{children}</div>
    </div>
  );
};
