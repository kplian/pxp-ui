import React, { Suspense } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PxpLoginContainer from '../containers/LoginContainer';
import PxpMainContainer from '../containers/MainContainer';
import PxpPublicContainer from '../containers/PublicContainer';
import NotFoundPage from '../components/NotFoundPage';
import { useSelector } from 'react-redux';
import pxpPages from '../lazyImport';
import AuthPublic from './AuthPublic';
import AuthPrivate from './AuthPrivate';
import config from '../../config';

export const history = createBrowserHistory();

const AppRouter = ({ LoginContainer: MyLoginContainer = undefined, 
                     MainContainer: MyMainContainer = undefined, 
                     Publicontainer: MyPublicContainer = undefined,
                     pages:myPages = {} }) => { 

  const MainContainer = MyMainContainer || PxpMainContainer;
  const LoginContainer = MyLoginContainer || PxpLoginContainer;
  const PublicContainer = MyPublicContainer || PxpPublicContainer;
  const pages = {...pxpPages, ...myPages};  
  
  const routes = useSelector(state => state.auth.routes);
  return(
    <Router history={history}>
    {console.log('render routes')}
      <div> 
        <Suspense fallback={<div>Loading...</div>}>       
          <Switch>            
            <Route 
              path="/" 
              exact={true} 
              component={() => (              
                <Redirect to={config.publicInitRoute || '/login'} /> 
              )}              
            />            
            <Route 
              path="/login"  
              exact={true}               
              render={() => {                  
                return(
                <AuthPublic>
                  <LoginContainer/>
                </AuthPublic>
              )}}
            />                  
            {routes.map((route) => {  
              const Component = pages[route.component].path.component;             
              return(                 
                <Route
                  key={route.id} 
                  exact={true}
                  path={pages[route.component].path}   
                  render={() => (
                    <AuthPrivate>
                      <MainContainer pages={pages}>                       
                      </MainContainer>  
                    </AuthPrivate>
                  )}
                />
              );
            })}
            {config.publicRoutes.map((route) => {              
              return( 
                <Route
                  key={route.id} 
                  exact={true}
                  path={"/" + route.component}   
                  render={() => (
                    <AuthPublic>
                      <PublicContainer Page={pages[route.component]} />
                    </AuthPublic>
                  )}
                />
              );
            })}                 
            <Route component={NotFoundPage} />
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
}
  
  export default AppRouter;
