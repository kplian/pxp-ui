import React from 'react';
import ReactDOM from 'react-dom';
import config from './config';
import configureStore from './_pxp/configureStore';
import PxpClient from 'pxp-client';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';
import AppRouter, { history } from './_pxp/routers/AppRouter';
import 'typeface-roboto';

//import contaPages from './contabilidad/components';
//import presuPages from './presupuestos/components';
import { startSetMenu, login, logout } from './_pxp/actions/auth';

/**
 * Style for react-perfect-scrollbar
 */
import 'react-perfect-scrollbar/dist/css/styles.css';
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
      store.dispatch(login(user.id_usuario)); 
      store.dispatch(startSetMenu()).then(() => {
        renderApp();         
        if (history.location.pathname === '/') {        
          //here you can change to your init route
          history.push('/main'); 
          
        }    
      });     
      
      
  } else {      
      store.dispatch(logout);      
      if (PxpClient.sessionDied) {
        store.dispatch({type: 'SESSION_DIED'});        
      } else {
        renderApp();        
        //go back to login page
        history.push('/');        
      }
      
  }
});
