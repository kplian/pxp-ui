/**
 * Auth actions for redux store
 * @copyright Kplian Ltda 2020
 * @author Jaime Rivera
 */
import Pxp from '../../Pxp';
import history from '../routers/History';
import { deleteNativeStorage } from '../utils/Common';

export const findRoutes = (menu) => {
  let routes = [];
  menu.forEach((menuOption) => {
    const mo = menuOption;
    if (menuOption.type === 'hoja' || menuOption.type === 'leaf') {
      routes.push({
        id: menuOption.id_gui || menuOption.uiId,
        component: menuOption.component || menuOption.route,
      });
    } else {
      routes.push(...findRoutes(mo.children));
    }
  });
  if (Pxp.config.customPrivateRoutes) {
    routes = [...routes, ...Pxp.config.customPrivateRoutes];
  }
  return routes;
};

export const login = (uid, user) => ({
  type: 'LOGIN',
  uid,
  user,
});

export const logout = () => ({
  type: 'LOGOUT',
});

export const setMenu = (menu) => ({
  type: 'SET_MENU',
  menu,
});

export const setRoutes = (routes) => ({
  type: 'SET_ROUTES',
  routes,
});

export const startSocialLogin = ({
  userId,
  token,
  name,
  surname,
  email,
  urlPhoto,
  type,
  device,
  language,
}) => {
  return () => {
    return Pxp.apiClient
      .oauthLogin(
        userId,
        token,
        name,
        surname,
        email,
        urlPhoto,
        type,
        device,
        language,
      )
      .then((data) => {
        if (data.ROOT) {
          return data.ROOT.detalle.mensaje;
        }
        return 'success';
      });
  };
};

export const startLogin = ({ login: username, password, language }) => {
  return () => {
    return Pxp.apiClient.login(username, password, language).then((data) => {
      const isWebView = navigator.userAgent.includes('wv');

      const userAgent = window.navigator.userAgent.toLowerCase();
      const safari = /safari/.test(userAgent);
      const ios = /iphone|ipod|ipad/.test(userAgent);

      const iOSWebView = ios && !safari;

      // @ts-ignore
      if (isWebView && window.Mobile) {
        // @ts-ignore
        window.Mobile.saveUserCredentials(username, password, language);
        if (process.env.REACT_APP_WEB_SOCKET === 'YES') {
          // @ts-ignore
          window.Mobile.saveWebSocketURL(
            `wss://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT_WEB_SOCKET}/wss?sessionIDPXP=${data.phpsession}`,
            data.userId,
            data.username,
          );
        }
        // @ts-ignore
      } else if (iOSWebView && window.webkit) {
        // @ts-ignore
        window.webkit.messageHandlers.saveUserCredentials.postMessage({
          username,
          password,
          language,
        });
        if (process.env.REACT_APP_WEB_SOCKET === 'YES') {
          // @ts-ignore
          window.webkit.messageHandlers.saveWebSocketURL.postMessage({
            socket: `wss://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT_WEB_SOCKET}/wss?sessionIDPXP=${data.phpsession}`,
            id_usuario: data.userId,
            nombre_usuario: data.username,
          });
        }
      }
      return 'success';
    })
      .catch((err) => {
        return err.message;
      });
  };
};

export const startResetPassword = ({ login: username, captcha }) => {
  return () => {
    const getUrl = window.location;
    return Pxp.apiClient
      .doRequest({
        url: 'seguridad/Auten/resetPassword',
        params: {
          username,
          captcha,
          url: `${getUrl.protocol}//${getUrl.host}/`,
        },
      })
      .then(() => {
        return 'success';
      })
      .catch((err) => {
        return err.message;
      });
  };
};

export const startSignup = ({
  email,
  name,
  surname,
  username,
  password,
  captcha,
}) => {
  return () => {
    const getUrl = window.location;
    return Pxp.apiClient
      .doRequest({
        url: 'seguridad/Auten/signUp',
        params: {
          email,
          name,
          surname,
          username,
          password,
          captcha,
          url: `${getUrl.protocol}//${getUrl.host}/`,
        },
      })
      .then(() => {
        return 'success';
      })
      .catch((err) => {
        return err.message;
      });
  };
};

export const startSignupConfirm = ({ token }) => {
  return () => {
    return Pxp.apiClient
      .doRequest({
        url: 'seguridad/Auten/signupConfirm',
        params: {
          token,
        },
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err.message;
      });
  };
};

export const startUpdatePassword = ({ password1, token }) => {
  return () => {
    return Pxp.apiClient
      .doRequest({
        url: 'seguridad/Auten/updatePassword',
        params: {
          password: password1,
          token,
        },
      })
      .then((data) => {
        if (data.error) {
          return data.detail.message;
        }
        return 'success';
      })
      .catch((err) => {
        return err.message;
      });
  };
};

export const startSetLanguage = ({ language }) => {
  return () => {
    return Pxp.apiClient
      .doRequest({
        url: 'parametros/Lenguaje/setLanguage',
        params: {
          language,
        },
      })
      .then((data) => {
        if (data.ROOT) {
          return data.ROOT.detalle.mensaje;
        }
        return 'success';
      });
  };
};

export const startSetMenu = () => {
  console.log(Pxp.apiClient.backendVersion);
  return (dispatch) => {
    return Pxp.apiClient
      .doRequest({
        method: Pxp.apiClient.backendVersion === 'v2' ? 'GET' : 'POST',
        url:
          Pxp.apiClient.backendVersion === 'v2'
            ? 'pxp/Ui/list'
            : 'seguridad/Menu/getMenuJSON',
        params: {
          ...(Pxp.config.menu.system && {
            system: Pxp.config.menu.system,
          }),
          ...(Pxp.config.menu.folder && {
            folder: Pxp.config.menu.folder,
          }),
          includeSystemRoot: Pxp.config.menu.includeSystemRoot || true,
          ...(Pxp.apiClient.backendVersion === 'v1' && {
            mobile: Pxp.config.menu.mobile,
          }),
        },
      })
      .then((resp) => {
        if (resp.data && resp.data.length === 0) {
          return { error: true };
        } else {
          dispatch(setMenu(resp.data));
          dispatch(setRoutes(findRoutes(resp.data)));
          return resp;
        }
      })
      .catch((err) => {
        return err.message;
      });
  };
};

export const startLogout = () => {
  return (dispatch) => {
    return Pxp.apiClient.logout().then(() => {
      dispatch(logout());
      history.push('/login');
      dispatch(setMenu([]));
      dispatch(setRoutes([]));
      Pxp.config.privateInitRoute = Pxp.config.privateInitRoute.includes(
        'first',
      )
        ? 'first'
        : Pxp.config.privateInitRoute;

      deleteNativeStorage();
    });
  };
};
