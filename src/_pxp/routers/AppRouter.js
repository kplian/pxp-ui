import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import LoginContainer from '../components/Login/LoginContainer';
import PxpMainContainer from '../components/containers/MainContainer';
import NotFoundPage from '../components/NotFoundPage';

export const history = createBrowserHistory();



const AppRouter = ({ LoginPage = undefined, MainContainer:MyMainContainer = undefined }) => {  
  const MainContainer = MyMainContainer || PxpMainContainer;
  return(
    <Router history={history}>
      <div>        
        <Switch>
          <Route 
            path="/"  
            exact={true} 
            render={(props) => <LoginContainer LoginPage={LoginPage} />}
          />
          <Route 
            path="/main"             
            render={(props) => <MainContainer />}
          />                  
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
}
  
  export default AppRouter;
