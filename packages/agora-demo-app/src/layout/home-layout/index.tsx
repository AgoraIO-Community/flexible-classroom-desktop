import { observer } from 'mobx-react';
import { FC, PropsWithChildren, useContext } from 'react';
import './index.css';
import { GlobalStoreContext } from '@app/stores';
import { useI18n } from 'agora-common-libs';

export const HomeLayout: FC<PropsWithChildren<unknown>> = observer(({ children }) => {
  const homeStore = useContext(GlobalStoreContext);
  const t = useI18n();

  return (
    <div className="fcr-w-full fcr-h-full fcr-overflow-auto">
      <div className={`home`}>
        <div className={`home-left ${homeStore.language}`}>
          <header className="fcr-flex fcr-items-center">
            <div className="fcr-quick-header">
              <div className="fcr-logo">
                <img src={require('../../assets/favicon.png')} width={32} height={32} />
                {t('fcr_feedback_label_fcr')}
              </div>
            </div>
          </header>
        </div>
        <div className="home-right fcr-flex-1">{children}</div>
      </div>
    </div>
  );
});
