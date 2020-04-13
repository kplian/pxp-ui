import React from 'react';
import ReactDOM from 'react-dom';
import config from './config';
import configureStore from './_pxp/configureStore';
import PxpClient from 'pxp-client';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';
import AppRouter, { history } from './_pxp/routers/AppRouter';
import MyLoginPage from './contabilidad/components/MyLoginPage';
import MyMainContainer from './contabilidad/components/MyMainContainer';
import { ThemeProvider } from '@material-ui/styles';
//Here you can import your custom theme
import theme from './_pxp/themes/blue';
import 'typeface-roboto';

PxpClient.init( config.host, config.baseUrl, config.mode, 
                config.port, config.protocol, config.backendRestVersion);

//init store
const store = configureStore();

const jsx = (
  <Provider store={store}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AppRouter LoginPage={MyLoginPage} MainContainer={MyMainContainer}/>
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

PxpClient.onAuthStateChanged(user => {
  if (user) {             
      store.dispatch({type: 'LOGIN', uid: user.id_usuario});
      renderApp();      
      if (history.location.pathname === '/') {        
        //here you can change to your init route
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