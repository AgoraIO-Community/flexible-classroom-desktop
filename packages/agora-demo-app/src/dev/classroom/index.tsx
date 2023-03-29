import { render } from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { HomePage } from './pages/home';
import { LaunchPage } from './pages/launch';
import { StoreProvider } from '../../stores';
import { addResourceBundle } from 'agora-common-libs';
import en from '../../translate/en';
import zh from '../../translate/zh';
addResourceBundle('en', en);
addResourceBundle('zh', zh);
const App = () => {
  return (
    <StoreProvider>
      <HashRouter>
        <Switch>
          <Route key={'/launch'} path={'/launch'} component={() => <LaunchPage></LaunchPage>} />
          <Route key={'/'} path={'/'} component={() => <HomePage></HomePage>} />
        </Switch>
      </HashRouter>
    </StoreProvider>
  );
};
render(<App></App>, document.getElementById('root'));