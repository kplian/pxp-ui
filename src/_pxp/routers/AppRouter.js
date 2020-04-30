import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import history from './History';
import PxpLoginContainer from '../containers/LoginContainer';
import PxpMainContainer from '../containers/MainContainer';
import PxpPublicContainer from '../containers/PublicContainer';
import NotFoundPage from '../components/NotFoundPage';
import AuthPublic from './AuthPublic';
import AuthPrivate from './AuthPrivate';
import config from '../../config';
import usePages from '../hooks/usePages';

function RouteException(message) {
  this.message = message;
  this.title = 'RouteException';
}

const AppRouter = ({
  LoginContainer: MyLoginContainer = undefined,
  MainContainer: MyMainContainer = undefined,
  Publicontainer: MyPublicContainer = undefined,
}) => {
  const MainContainer = MyMainContainer || PxpMainContainer;
  const LoginContainer = MyLoginContainer || PxpLoginContainer;
  const PublicContainer = MyPublicContainer || PxpPublicContainer;

  const { pages } = usePages();
  const routes = useSelector((state) => state.auth.routes);
  routes.forEach((element) => {
    if (!pages[element.component]) {
      throw new RouteException(
        `Does not exists a component for ${element.component} in your pages object. Ensure that your component is lazy loaded from index file`,
      );
    }
  });
  const privatePaths = routes.map((route) => pages[route.component].path);
  const publicRoutes = config.publicRoutes || [];
  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route
            path="/"
            exact
            component={() => (
              <Redirect to={config.publicInitRoute || '/login'} />
            )}
          />

          <Route
            path="/login"
            exact
            render={() => {
              return (
                <AuthPublic>
                  <LoginContainer />
                </AuthPublic>
              );
            }}
          />

          <Route exact path={privatePaths}>
            <MainContainer>
              <Switch>
                {routes.map((route) => {
                  const Component = pages[route.component].component;
                  return (
                    <Route
                      key={route.id}
                      exact
                      path={pages[route.component].path}
                      render={() => (
                        <AuthPrivate>
                          <Component />
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
                {publicRoutes.map((route) => {
                  return (
                    <Route
                      key={route.id}
                      exact
                      path={`/${route.component}`}
                      render={() => (
                        <AuthPublic>{pages[route.component]}</AuthPublic>
                      )}
                    />
                  );
                })}
              </Switch>
            </PublicContainer>
          </Route>
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
