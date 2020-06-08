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

export const startLogin = ({ login: username, password, language }) => {
  return () => {
    return Pxp.apiClient.login(username, password, language).then((data) => {
      if (data.ROOT) {
        return data.ROOT.detalle.mensaje;
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
      dispatch(logout());
      history.push('/login');
      dispatch(setMenu([]));
      dispatch(setRoutes([]));
    });
  };
};
