import React from 'react';
import ReactDOM from 'react-dom';
import config from './config';
import configureStore from './_pxp/configureStore';
import PxpClient from 'pxp-client';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';
import AppRouter, { history } from './_pxp/routers/AppRouter';
import 'typeface-roboto';
import { login } from './_pxp/actions/auth';

/**
 * Style for react-perfect-scrollbar
 */
import 'react-perfect-scrollbar/dist/css/styles.css';

/*import contaPages from './contabilidad/components';
import presuPages from './presupuestos/components';*/
import { startSetMenu } from './_pxp/actions/auth';
import { SettingsProvider } from './_pxp/context/SettingsContext';
import { restoreSettings } from './_pxp/context/settings-store';

PxpClient.init( config.host, config.baseUrl, config.mode, 
                config.port, config.protocol, config.backendRestVersion);

//init store
const store = configureStore();

/*const jsx = (
  <Provider store={store}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AppRouter pages={{...contaPages, ...presuPages}}/>
      </ThemeProvider>
  </Provider>
); */
const settings = restoreSettings();
  
const jsx =  (
  <Provider store={store}>
    <SettingsProvider settings={ settings }>
      <CssBaseline />
        <AppRouter />
    </SettingsProvider>
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
PxpClient.onAuthStateChanged(user => {
  if (user) {                
      console.log('index login', user);      
      store.dispatch(startSetMenu()).then(() => {        
        store.dispatch(login(user.id_usuario));
        renderApp();
      });
  } else {  
    console.log('index logout');  
    if (PxpClient.sessionDied) {
        store.dispatch({type: 'SESSION_DIED'});        
      } else {        
        renderApp(); 
      }
      
  }
});
