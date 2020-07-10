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
import LoginDialog from '../containers/components/LoginDialog';
import ForgotDialog from '../containers/components/ForgotDialog';
import ConfirmDialog from '../containers/components/ConfirmDialog';
import UpdatePasswordDialog from '../containers/components/UpdatePasswordDialog';
import SignupDialog from '../containers/components/SignupDialog';
import SignupConfirmDialog from '../containers/components/SignupConfirmDialog';
import SignupMailDialog from '../containers/components/SignupMailDialog';

const useStyles = makeStyles(() => ({
  loading: {
    position: 'static',
  },
}));

const AppRouter = ({
  LoginContainer: MyLoginContainer = undefined,
  MainContainer: MyMainContainer = undefined,
  PublicContainer: MyPublicContainer = undefined,
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
  // change init route if configuration is first and exists private routes
  if (privatePaths.length > 0) {
    Pxp.config.privateInitRoute =
      Pxp.config.privateInitRoute === 'first'
        ? privatePaths[0]
        : Pxp.config.privateInitRoute;
  }

  const publicRoutes = Pxp.config.publicRoutes || [];
  const publicPaths = publicRoutes.map((route) => pages[route].path);

  const classes = useStyles();
  // this key is used for routes because they are created as a list
  let key = 0;

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
              const Component =
                Pxp.config.accountManagement &&
                Pxp.config.accountManagement.loginDialog &&
                pages[Pxp.config.accountManagement.loginDialog];
              return (
                <LoginContainer>
                  <AuthPublic>
                    {!Component ? <LoginDialog open /> : <Component open />}
                  </AuthPublic>
                </LoginContainer>
              );
            }}
          />

          {Pxp.config.accountManagement &&
            Pxp.config.accountManagement.recoverPassword && (
              <Route
                path="/forgot"
                exact
                render={() => {
                  const Component =
                    Pxp.config.accountManagement &&
                    Pxp.config.accountManagement.forgotDialog &&
                    pages[Pxp.config.accountManagement.forgotDialog];
                  return (
                    <LoginContainer>
                      <AuthPublic>
                        {!Component ? <ForgotDialog /> : <Component />}
                      </AuthPublic>
                    </LoginContainer>
                  );
                }}
              />
            )}

          {Pxp.config.accountManagement &&
            Pxp.config.accountManagement.recoverPassword && (
              <Route
                path="/forgot/confirm"
                exact
                render={() => {
                  const Component =
                    Pxp.config.accountManagement &&
                    Pxp.config.accountManagement.forgotConfirmDialog &&
                    pages[Pxp.config.accountManagement.forgotConfirmDialog];
                  return (
                    <LoginContainer>
                      <AuthPublic>
                        {!Component ? <ConfirmDialog /> : <Component />}
                      </AuthPublic>
                    </LoginContainer>
                  );
                }}
              />
            )}

          {Pxp.config.accountManagement &&
            Pxp.config.accountManagement.recoverPassword && (
              <Route
                path="/forgot/update/:token"
                exact
                render={() => {
                  const Component =
                    Pxp.config.accountManagement &&
                    Pxp.config.accountManagement.updatePasswordDialog &&
                    pages[Pxp.config.accountManagement.updatePasswordDialog];
                  return (
                    <LoginContainer>
                      <AuthPublic>
                        {!Component ? <UpdatePasswordDialog /> : <Component />}
                      </AuthPublic>
                    </LoginContainer>
                  );
                }}
              />
            )}

          {Pxp.config.accountManagement && Pxp.config.accountManagement.signup && (
            <Route
              path="/signup"
              exact
              render={() => {
                const Component =
                  Pxp.config.accountManagement &&
                  Pxp.config.accountManagement.signupDialog &&
                  pages[Pxp.config.accountManagement.signupDialog];
                return (
                  <LoginContainer>
                    <AuthPublic>
                      {!Component ? <SignupDialog /> : <Component />}
                    </AuthPublic>
                  </LoginContainer>
                );
              }}
            />
          )}

          {Pxp.config.accountManagement && Pxp.config.accountManagement.signup && (
            <Route
              path="/signup/mail/:email"
              exact
              render={() => {
                const Component =
                  Pxp.config.accountManagement &&
                  Pxp.config.accountManagement.signupMailDialog &&
                  pages[Pxp.config.accountManagement.signupMailDialog];
                return (
                  <LoginContainer>
                    <AuthPublic>
                      {!Component ? <SignupMailDialog /> : <Component />}
                    </AuthPublic>
                  </LoginContainer>
                );
              }}
            />
          )}

          {Pxp.config.accountManagement && Pxp.config.accountManagement.signup && (
            <Route
              path="/signup/confirm/:token"
              exact
              render={() => {
                const Component =
                  Pxp.config.accountManagement &&
                  Pxp.config.accountManagement.signupConfirmDialog &&
                  pages[Pxp.config.accountManagement.signupConfirmDialog];
                return (
                  <LoginContainer>
                    <AuthPublic>
                      {!Component ? <SignupConfirmDialog /> : <Component />}
                    </AuthPublic>
                  </LoginContainer>
                );
              }}
            />
          )}

          <Route path={privatePaths}>
            <MainContainer>
              <Suspense
                fallback={<LoadingScreen className={classes.loading} />}
              >
                <Switch>
                  {filteredRoutes.map((route) => {
                    const Component = pages[route.component].component;
                    key += 1;
                    return (
                      <Route
                        exact
                        key={key}
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
                  {
                    // this will create detailPages for a page only if main page was created from menu
                    filteredRoutes.reduce((subroutes, route) => {
                      if (pages[route.component].detailPages) {
                        pages[route.component].detailPages.forEach((page) => {
                          const Component = page.component;
                          key += 1;
                          // this is only to lazy loading page translations
                          if (pages[route.component].translationsNS) {
                            i18n.loadNamespaces(
                              pages[route.component].translationsNS,
                            );
                          }
                          subroutes.push(
                            <Route
                              exact
                              key={key}
                              path={pages[route.component].path + page.path}
                              render={() => (
                                <AuthPrivate>
                                  <Component />
                                </AuthPrivate>
                              )}
                            />,
                          );
                        });
                      }
                      return subroutes;
                    }, [])
                  }
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
                    key += 1;
                    return (
                      <Route
                        exact
                        key={key}
                        path={pages[route].path}
                        render={() => {
                          // this is only to lazy loading page translations
                          if (pages[route].translationsNS) {
                            i18n.loadNamespaces(pages[route].translationsNS);
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
          <Route>
            {Pxp.config.notFoundRoute ? (
              <Redirect to={Pxp.config.notFoundRoute} />
            ) : (
              <NotFoundPage />
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
