import ReactDOM from 'react-dom';
import './index.css';
import { RouteContainer } from './router';
import { StoreProvider } from './stores';
import { token } from './utils';
import { initI18n } from 'agora-common-libs';
import en from './translate/en';
import zh from './translate/zh';
declare global {
  interface Window {
    __launchRegion: string;
    __launchLanguage: string;
    __launchRoomName: string;
    __launchUserName: string;
    __launchRoleType: string;
    __launchRoomType: string;
    __launchCompanyId: string;
    __launchProjectId: string;
  }
}

const i18nResources = {
  en: {
    translation: {
      ...en,
    },
  },
  zh: {
    translation: {
      ...zh,
    },
  },
};

initI18n(i18nResources);

token.update(window.location.search);

export const App: React.FC = () => {
  return (
    <StoreProvider>
      <RouteContainer />
    </StoreProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
