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

//import contaPages from './contabilidad/components';
//import presuPages from './presupuestos/components';
import { startSetMenu, login, logout } from './_pxp/actions/auth';

PxpClient.init( config.host, config.baseUrl, config.mode, 
                config.port, config.protocol, config.backendRestVersion);

//init store
const store = configureStore();
/*
const jsx = (
  <Provider store={store}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AppRouter pages={{...contaPages, ...presuPages}}/>
      </ThemeProvider>
  </Provider>
); 
*/

const jsx = (
  <Provider store={store}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AppRouter />
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
      store.dispatch(login(user.id_usuario)); 
      store.dispatch(startSetMenu());     
      renderApp();         
      if (history.location.pathname === '/') {        
        //here you can change to your init route
        history.push('/main'); 
      }      
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