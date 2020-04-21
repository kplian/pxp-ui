import React, { Suspense } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PxpLoginContainer from '../containers/LoginContainer';
import PxpMainContainer from '../containers/MainContainer';
import PxpPublicContainer from '../containers/PublicContainer';
import NotFoundPage from '../components/NotFoundPage';
import { useSelector } from 'react-redux';
import AuthPublic from './AuthPublic';
import AuthPrivate from './AuthPrivate';
import config from '../../config';
import usePages from '../hooks/usePages';

export const history = createBrowserHistory();

const AppRouter = ({ LoginContainer: MyLoginContainer = undefined, 
                     MainContainer: MyMainContainer = undefined, 
                     Publicontainer: MyPublicContainer = undefined }) => { 

  const MainContainer = MyMainContainer || PxpMainContainer;
  const LoginContainer = MyLoginContainer || PxpLoginContainer;
  const PublicContainer = MyPublicContainer || PxpPublicContainer;
  
  const { pages } = usePages(); 
  const routes = useSelector(state => state.auth.routes);
  const privatePaths = routes.map((route) => pages[route.component].path);
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
              
            <Route exact path={privatePaths}> 
              <MainContainer>
                <Switch>        
                {routes.map((route) => {  
                  const Component = pages[route.component].component;             
                  return(                 
                    <Route
                      key={route.id} 
                      exact={true}
                      path={pages[route.component].path}   
                      render={() => (
                        <AuthPrivate>                          
                            <Component/>
                        </AuthPrivate>
                      )}
                    />
                  );
                })}
                </Switch>  
              </MainContainer>
            </Route>
            <Route exact path={config.publicRoutes}>
              <PublicContainer>
                <Switch>
                {config.publicRoutes.map((route) => {              
                  return( 
                    <Route
                      key={route.id} 
                      exact={true}
                      path={"/" + route.component}   
                      render={() => (
                        <AuthPublic>
                          {pages[route.component]}
                        </AuthPublic>
                      )}
                    />
                  );
                })} 
                </Switch>
              </PublicContainer>   
            </Route>             
            <Route component={NotFoundPage} />
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
}
  
  export default AppRouter;
