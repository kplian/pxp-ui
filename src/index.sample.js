/**
 * Main index file for any pxp-ui project
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 * @example <caption>Main containers components will be send via props to AppRouter (LoginContainer, PublicContainer and MainContainer)</caption>
 * const jsx = (
 * <Provider store={store}>
 *   <Suspense fallback={<div>Loading...</div>}>
 *     <SettingsProvider settings={settings}>
 *       <PagesProvider pages={{ ...pxpPages }}>
 *         <CssBaseline />
 *         <SnackbarProvider maxSnack={1}>
 *           <AppRouter LoginContainer={LoginContainer}  PublicContainer={PublicContainer} MainContainer={MainContainer}/>
 *         </SnackbarProvider>
 *       </PagesProvider>
 *     </SettingsProvider>
 *   </Suspense>
 * </Provider>
 * );
 *
 * @example <caption>Page components will be send via PageProvider. If you'll use pxp pages can import pxpPages and send as well</caption>
 * const jsx = (
 * <Provider store={store}>
 *   <Suspense fallback={<div>Loading...</div>}>
 *     <SettingsProvider settings={settings}>
 *       <PagesProvider pages={{ ...pxpPages, ...contaPages, ...presuPages }}>
 *         <CssBaseline />
 *         <SnackbarProvider maxSnack={1}>
 *           <AppRouter/>
 *         </SnackbarProvider>
 *       </PagesProvider>
 *     </SettingsProvider>
 *   </Suspense>
 * </Provider>
 *);
 *
 */
// import external libraries
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
// import pxp-client (you can replace this by any client)
import PxpClient from 'pxp-client';

// import external styles
import CssBaseline from '@material-ui/core/CssBaseline';
import 'typeface-roboto';

// import configs and pxp contexts
import Button from '@material-ui/core/Button';
import Pxp from './Pxp';
import configureStore from './_pxp/configureStore';
import { SettingsProvider } from './_pxp/context/SettingsContext';
import { restoreSettings } from './_pxp/context/settings-store';
import { PagesProvider } from './_pxp/context/PagesContext';

import AppRouter from './_pxp/routers/AppRouter';
import history from './_pxp/routers/History';
import { login, startSetMenu } from './_pxp/actions/auth';

// import pxp pages only if you are using any
import pxpPages from './_pxp/pxpPages';

// import your custom pages
import examplePages from './_examples/components';
// import presuPages from './presupuestos/components';

// init translations
// eslint-disable-next-line no-unused-vars
import i18n from './_pxp/i18n';
import LoadingScreen from './_pxp/components/LoadingScreen';

// init client (you can replace this for any api client)
PxpClient.init(
  Pxp.config.host,
  Pxp.config.baseUrl,
  Pxp.config.mode,
  Pxp.config.port,
  Pxp.config.protocol,
  Pxp.config.backendRestVersion,
  Pxp.config.webSocket,
  Pxp.config.portWebSocket,
);

// this will make available the api from any place we have access to Pxp
Pxp.setApiClient(PxpClient);

// init store and settings
const store = configureStore();
const settings = restoreSettings();

const snackBarRef = React.createRef();
const onClickDismiss = (key) => () => {
  snackBarRef.current.closeSnackbar(key);
};

const jsx = (
  <Provider store={store}>
    <Suspense fallback={<LoadingScreen />}>
      <SettingsProvider settings={settings}>
        <PagesProvider
          pages={{
            ...pxpPages,
            ...examplePages /* , ...contaPages, ...presuPages */,
          }}
        >
          <CssBaseline />
          <SnackbarProvider
            maxSnack={1}
            ref={snackBarRef}
            action={(key) => (
              <Button onClick={onClickDismiss(key)}>Close</Button>
            )}
          >
            <AppRouter />
          </SnackbarProvider>
        </PagesProvider>
      </SettingsProvider>
    </Suspense>
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('root'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingScreen />, document.getElementById('root'));
PxpClient.onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(startSetMenu()).then((resp) => {
      // if menu returns error usually is session error
      if (resp.error) {
        renderApp();
        history.push('/login');
      } else {
        store.dispatch(login(user.id_usuario, user));
        renderApp();
      }
    });
  } else if (PxpClient.sessionDied) {
    store.dispatch({ type: 'SESSION_DIED' });
  } else {
    renderApp();
  }
});
