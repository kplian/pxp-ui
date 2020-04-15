import React, { Suspense } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PxpLoginContainer from '../components/Login/LoginContainer';
import PxpMainContainer from '../components/containers/MainContainer';
import NotFoundPage from '../components/NotFoundPage';
import { useSelector } from 'react-redux';
import pxpPages from '../lazyImport';

export const history = createBrowserHistory();

const AppRouter = ({ LoginContainer:MyLoginContainer = undefined, MainContainer:MyMainContainer = undefined, pages:myPages = {} }) => {  
  const MainContainer = MyMainContainer || PxpMainContainer;
  const LoginContainer = MyLoginContainer || PxpLoginContainer;
  const pages = {...pxpPages, ...myPages};  
  
  const routes = useSelector(state => state.auth.routes);
  return(
    <Router history={history}>
      <div> 
        <Suspense fallback={<div>Loading...</div>}>       
          <Switch>
            <Route 
              path="/"  
              exact={true} 
              render={() => <LoginContainer />}
            />
            <Route 
              path="/main"             
              render={() => <MainContainer Page={pages['CONTA__InitPage']}/>}
            />            
            {routes.map((route) => {              
              return <Route
                key={route.id_gui} 
                path={"/" + route.component}            
                render={() => <MainContainer Page={pages['PRESU__InitPage']}/>}
              /> ;
            })}                 
            <Route component={NotFoundPage} />
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
}
  
  export default AppRouter;
