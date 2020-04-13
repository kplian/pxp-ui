import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PxpLoginContainer from '../components/Login/LoginContainer';
import PxpMainContainer from '../components/containers/MainContainer';
import NotFoundPage from '../components/NotFoundPage';

export const history = createBrowserHistory();

const AppRouter = ({ LoginContainer:MyLoginContainer = undefined, MainContainer:MyMainContainer = undefined }) => {  
  const MainContainer = MyMainContainer || PxpMainContainer;
  const LoginContainer = MyLoginContainer || PxpLoginContainer;
  return(
    <Router history={history}>
      <div>        
        <Switch>
          <Route 
            path="/"  
            exact={true} 
            render={() => <LoginContainer />}
          />
          <Route 
            path="/main"             
            render={() => <MainContainer />}
          />                  
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
}
  
  export default AppRouter;
