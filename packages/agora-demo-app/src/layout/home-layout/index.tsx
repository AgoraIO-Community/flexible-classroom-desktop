import { observer } from 'mobx-react';
import { FC, PropsWithChildren, useContext } from 'react';
import './index.css';
import { GlobalStoreContext } from '@app/stores';

export const HomeLayout: FC<PropsWithChildren<unknown>> = observer(({ children }) => {
  const homeStore = useContext(GlobalStoreContext);

  return (
    <div className="fcr-w-full fcr-h-full fcr-overflow-auto">
      <div className={`home`}>
        <div className={`home-left ${homeStore.language}`}>
          <header className="fcr-flex fcr-items-center">
            <div className={`logo ${homeStore.language}`}></div>
          </header>
        </div>
        <div className="home-right fcr-flex-1">{children}</div>
      </div>
    </div>
  );
});
