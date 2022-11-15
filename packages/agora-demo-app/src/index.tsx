import ReactDOM from 'react-dom';
import './index.css';
import { RouteContainer } from './router';
import { StoreProvider } from './stores';
import { token } from './utils';
import { addResourceBundle } from 'agora-common-libs';
import en from './translate/en';
import zh from './translate/zh';
import i18n from 'i18next';

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



token.update(window.location.search);

export const App: React.FC = () => {
  return (
    <StoreProvider>
      <RouteContainer />
    </StoreProvider>
  );
};

addResourceBundle('en', en);
addResourceBundle('zh', zh);

ReactDOM.render(<App />, document.getElementById('root'));



