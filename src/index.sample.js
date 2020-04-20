import React from 'react';
import ReactDOM from 'react-dom';
import config from './config';
import configureStore from './_pxp/configureStore';
import PxpClient from 'pxp-client';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';
import AppRouter, { history } from './_pxp/routers/AppRouter';
import { ThemeProvider } from '@material-ui/styles';
//Here you can import your custom theme
import theme from './_pxp/themes/blue';
import 'typeface-roboto';
import { login } from './_pxp/actions/auth';

/**
 * Style for react-perfect-scrollbar
 */
import 'react-perfect-scrollbar/dist/css/styles.css';

import contaPages from './contabilidad/components';
import presuPages from './presupuestos/components';
import { startSetMenu, logout } from './_pxp/actions/auth';

PxpClient.init( config.host, config.baseUrl, config.mode, 
                config.port, config.protocol, config.backendRestVersion);

//init store
const store = configureStore();

const jsx = (
  <Provider store={store}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AppRouter pages={{...contaPages, ...presuPages}}/>
      </ThemeProvider>
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
