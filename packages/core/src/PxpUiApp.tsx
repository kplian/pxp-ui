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
import React, { Suspense, FC } from 'react';
import ReactDOM from 'react-dom';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
// import pxp-client (you can replace this by any client)
import PxpClient from 'pxp-client';

// import external styles
import CssBaseline from '@mui/material/CssBaseline';
import 'typeface-roboto';

// import configs and pxp contexts
import Button from '@mui/material/Button';
import configureStore from './configureStore';
import { SettingsProvider } from './context/SettingsContext';
import { restoreSettings } from './context/settings-store';
import { PagesProvider } from './context/PagesContext';

import AppRouter from './routers/AppRouter';
import history from './routers/History';
import { findRoutes, login, setMenu, setRoutes, startSetMenu } from './actions/auth';

// import pxp pages only if you are using any
import pxpPages from './pxpPages';

// import your custom pages
// import examplePages from './_examples/components'; // This export from parameters
// import presuPages from './presupuestos/components';

// init translations
// eslint-disable-next-line no-unused-vars
// import i18n from './i18n';
import LoadingScreen from '@pxp-ui/components/LoadingScreen';
import { Menu } from './interfaces';




// let hasRendered = false;
// const renderApp = () => {
//   if (!hasRendered) {
//     ReactDOM.render(jsx, document.getElementById('root'));
//     hasRendered = true;
//   }
// };

// ReactDOM.render(<LoadingScreen />, document.getElementById('root'));
// init store and settings
const store: any = configureStore();

export const configurePxpClient = (Pxp, renderApp, menu: Menu[] = null) => {
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
    Pxp.config.backendVersion,
    Pxp.config.urlLogin,
    Pxp.config.fieldsLogin,
  );

  // this will make available the api from any place we have access to Pxp
  Pxp.setApiClient(PxpClient);

  PxpClient.onAuthStateChanged((user) => {
    if (user) {
      if(!menu) {
        store.dispatch(startSetMenu()).then((resp) => {
        // if menu returns error usually is session error
          if (resp.error) {
            renderApp();
            history.push('/login');
          } else {
            store.dispatch(login(user.userId, user));
            renderApp();
          }
        });
      } else {
        store.dispatch(setMenu(menu));
        store.dispatch(setRoutes(findRoutes(menu)));
        store.dispatch(login(user.userId, user));
        renderApp();
      }
      
    } else if (PxpClient.sessionDied) {
      store.dispatch({ type: 'SESSION_DIED' });
    } else {
      renderApp();
    }
  });
};

export declare interface PxpAppProps {
  pages?: any;
  i18n?: any;
  LoginContainer?: React.ReactElement<any>;
  MainContainer?: React.ReactElement<any>;
  PublicContainer?: React.ReactElement<any>;
}

export const PxpUiApp: FC<PxpAppProps> = ({ pages, i18n, LoginContainer, MainContainer, PublicContainer }) => {
  
  const settings = restoreSettings();

  const snackBarRef: any = React.createRef();
  const onClickDismiss = (key) => () => {
    snackBarRef.current.closeSnackbar(key);
  };

  return (
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={1}
        ref={snackBarRef}
        action={(key) => (
          <Button onClick={onClickDismiss(key)}>Close</Button>
        )}
      >
      <Suspense fallback={<LoadingScreen />}>
        <SettingsProvider settings={settings}>
          <PagesProvider
            pages={{
              ...pxpPages,
              ...pages,
              // ...examplePages /* , ...contaPages, ...presuPages */,
            }}
          >
            <CssBaseline />
            
              <AppRouter 
                LoginContainer={LoginContainer}
                MainContainer={MainContainer}
                PublicContainer={PublicContainer}
                i18n={i18n}
              />
          </PagesProvider>
        </SettingsProvider>
      </Suspense>
      </SnackbarProvider>
    </Provider>
  );
};
