/**
 * Main router manager for pxp framework
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 */
import React, { Suspense } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import i18n from '../i18n';
import history from './History';
import PxpLoginContainer from '../containers/LoginContainer';
import PxpMainContainer from '../containers/MainContainer';
import PxpPublicContainer from '../containers/PublicContainer';
import NotFoundPage from '../components/NotFoundPage';
import AuthPublic from './AuthPublic';
import AuthPrivate from './AuthPrivate';
import Pxp from '../../Pxp';
import usePages from '../hooks/usePages';
import LoadingScreen from '../components/LoadingScreen';

const useStyles = makeStyles(() => ({
  loading: {
    position: 'static',
  },
}));

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

  const filteredRoutes = routes.filter((element) => !!pages[element.component]);
  const privatePaths = filteredRoutes.map(
    (route) => pages[route.component].path,
  );
  const publicRoutes = Pxp.config.publicRoutes || [];
  const publicPaths = publicRoutes.map((route) => pages[route].path);

  const classes = useStyles();

  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route
            path="/"
            exact
            component={() => (
              <Redirect to={Pxp.config.publicInitRoute || '/login'} />
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
              <Suspense
                fallback={<LoadingScreen className={classes.loading} />}
              >
                <Switch>
                  {filteredRoutes.map((route) => {
                    const Component = pages[route.component].component;
                    return (
                      <Route
                        key={route.id}
                        exact
                        path={pages[route.component].path}
                        render={() => {
                          // this is only to lazy loading page translations
                          if (pages[route.component].translationsNS) {
                            i18n.loadNamespaces(
                              pages[route.component].translationsNS,
                            );
                          }
                          return (
                            <AuthPrivate>
                              <Component />
                            </AuthPrivate>
                          );
                        }}
                      />
                    );
                  })}
                </Switch>
              </Suspense>
            </MainContainer>
          </Route>
          <Route exact path={publicPaths}>
            <PublicContainer>
              <Suspense
                fallback={<LoadingScreen className={classes.loading} />}
              >
                <Switch>
                  {publicRoutes.map((route) => {
                    const Component = pages[route].component;
                    return (
                      <Route
                        key={route}
                        exact
                        path={pages[route].path}
                        render={() => {
                          // this is only to lazy loading page translations
                          if (pages[route.component].translationsNS) {
                            i18n.loadNamespaces(
                              pages[route.component].translationsNS,
                            );
                          }
                          return (
                            <AuthPublic>
                              <Component />
                            </AuthPublic>
                          );
                        }}
                      />
                    );
                  })}
                </Switch>
              </Suspense>
            </PublicContainer>
          </Route>
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
