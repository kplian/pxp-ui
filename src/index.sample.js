import React from 'react';
import ReactDOM from 'react-dom';

import config from './config';
import configureStore from './_pxp/configureStore';
import PxpClient from 'pxp-client';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';
import AppRouter, { history } from './_pxp/routers/AppRouter';
import MyLoginPage from './contabilidad/components/MyLoginPage';
import MyInitPage from './contabilidad/components/MyInitPage';
import MyMenu from './contabilidad/components/MyMenu';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
PxpClient.init( config.host, config.baseUrl, config.mode, 
                config.port, config.protocol, config.backendRestVersion);

//init store
const store = configureStore();
const theme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
  }
});
const jsx = (
  <Provider store={store}>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <AppRouter LoginPage={MyLoginPage} InitPage={MyInitPage} Menu={MyMenu}/>
      </MuiThemeProvider>
  </Provider>
); 

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('root'));
    hasRendered = true;
  }
};

PxpClient.onAuthStateChanged(user => {
  if (user) {             
      store.dispatch({type: 'LOGIN', uid: user.id_usuario});
      
      //go to init page only if it was in 
      if (history.location.pathname === '/') {
        renderApp();
        history.push('/main'); 
      }
      
  } else {      
      store.dispatch({type: 'LOGOUT'});
      
      if (PxpClient.sessionDied) {
        store.dispatch({type: 'SESSION_DIED'});
      } else {
        renderApp();
        //go back to login page
        history.push('/');
      }
      
  }
});