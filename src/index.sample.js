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
import PxpClient from 'pxp-client';

// import external styles
import CssBaseline from '@material-ui/core/CssBaseline';
import 'typeface-roboto';
import 'react-perfect-scrollbar/dist/css/styles.css';

// import configs and pxp contexts
import config from './config';
import configureStore from './_pxp/configureStore';
import { SettingsProvider } from './_pxp/context/SettingsContext';
import { restoreSettings } from './_pxp/context/settings-store';
import { PagesProvider } from './_pxp/context/PagesContext';

import AppRouter from './_pxp/routers/AppRouter';
import { login, startSetMenu } from './_pxp/actions/auth';

// import pxp pages only if you are using any
import pxpPages from './_pxp/pxpPages';

// import your custom pages
// import contaPages from './contabilidad/components';
// import presuPages from './presupuestos/components';

// init translations
// eslint-disable-next-line no-unused-vars
import i18n from './_pxp/i18n';
import LoadingScreen from "./_pxp/components/LoadingScreen";

PxpClient.init(
  config.host,
  config.baseUrl,
  config.mode,
  config.port,
  config.protocol,
  config.backendRestVersion,
);

// init store and settings
const store = configureStore();
const settings = restoreSettings();

const jsx = (
  <Provider store={store}>
    <Suspense fallback={<LoadingScreen/>}>
      <SettingsProvider settings={settings}>
        <PagesProvider
          pages={{ ...pxpPages /*, ...contaPages, ...presuPages*/ }}
        >
          <CssBaseline />
          <SnackbarProvider maxSnack={1}>
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

ReactDOM.render(<div>loading... </div>, document.getElementById('root'));
PxpClient.onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(startSetMenu()).then(() => {
      store.dispatch(login(user.id_usuario));
      renderApp();
    });
  } else if (PxpClient.sessionDied) {
    store.dispatch({ type: 'SESSION_DIED' });
  } else {
    renderApp();
  }
});
