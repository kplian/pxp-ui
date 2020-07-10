/**
 * Auth actions for redux store
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 */
import Pxp from '../../Pxp';
import history from '../routers/History';

const findRoutes = (menu) => {
  const routes = [];
  menu.forEach((menuOption) => {
    if (menuOption.type === 'hoja') {
      routes.push({ id: menuOption.id_gui, component: menuOption.component });
    } else {
      routes.push(...findRoutes(menuOption.childrens));
    }
  });
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

const setMenu = (menu) => ({
  type: 'SET_MENU',
  menu,
});

const setRoutes = (routes) => ({
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
      if (data.ROOT) {
        return data.ROOT.detalle.mensaje;
      }
      const isWebView = navigator.userAgent.includes('wv');
      if (isWebView && window.Mobile) {
        window.Mobile.saveUserCredentials(username, password, language);
        if (process.env.REACT_APP_WEB_SOCKET === 'YES') {
          window.Mobile.saveWebSocketURL(
            `ws://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT_WEB_SOCKET}?sessionIDPXP=${data.phpsession}`,
          );
        }
      }

      return 'success';
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
      .then((data) => {
        if (data.error) {
          return data.detail.message;
        }
        return 'success';
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
      .then((data) => {
        if (data.error) {
          return data.detail.message;
        }
        return 'success';
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
  return (dispatch) => {
    return Pxp.apiClient
      .doRequest({
        url: 'seguridad/Menu/getMenuJSON',
        params: {
          system: Pxp.config.menu.system,
          mobile: Pxp.config.menu.mobile,
          folder: Pxp.config.menu.folder || '',
        },
      })
      .then((resp) => {
        dispatch(setMenu(resp.data));
        dispatch(setRoutes(findRoutes(resp.data)));
        return resp;
      });
  };
};

export const startLogout = () => {
  return (dispatch) => {
    return Pxp.apiClient.logout().then(() => {
      if (navigator.userAgent.includes('wv')) {
        window.Mobile.deleteUserCredentials();
      }
      dispatch(logout());
      history.push('/login');
      dispatch(setMenu([]));
      dispatch(setRoutes([]));
    });
  };
};
