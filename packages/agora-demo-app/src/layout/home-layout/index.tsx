import { useLangSwitchValue } from '@app/hooks/useLangSwitchValue';
import { observer } from 'mobx-react';
import { FC, PropsWithChildren, useContext } from 'react';
import './index.css';
import textImgEn from '@app/assets/fcr-welcome-left-text-en.png';
import textImgZh from '@app/assets/fcr-welcome-left-text-zh.png';
import { GlobalStoreContext } from '@app/stores';

export const HomeLayout: FC<PropsWithChildren<unknown>> = observer(({ children }) => {
  const homeStore = useContext(GlobalStoreContext);
  const slogan = useLangSwitchValue({
    en: <img className="text-img en" src={textImgEn} />,
    zh: <img className="text-img zh" src={textImgZh} />,
  });

  return (
    <div className="w-full h-full overflow-auto">
      <div className={`home`}>
        <div className="home-left">
          <header className="flex items-center">
            <div className={`logo ${homeStore.language}`}></div>
            {/* <div>Product</div> */}
          </header>
          {slogan}
        </div>
        <div className="home-right flex-1">{children}</div>
      </div>
    </div>
  );
});
