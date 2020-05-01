/**
 * Auth actions for redux store
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 */
import PxpClient from 'pxp-client';
import config from '../../config';
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

export const login = (uid) => ({
  type: 'LOGIN',
  uid,
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

export const startLogin = ({ login: username, password }) => {
  return () => {
    return PxpClient.login(username, password).then((data) => {
      if (data.ROOT) {
        return data.ROOT.detalle.mensaje;
      }
      return 'success';
    });
  };
};

export const startSetMenu = () => {
  return (dispatch) => {
    return PxpClient.doRequest({
      url: 'seguridad/Menu/getMenuJSON',
      params: {
        system: config.menu.system,
        mobile: config.menu.mobile,
      },
    }).then((resp) => {
      dispatch(setMenu(resp.data));
      dispatch(setRoutes(findRoutes(resp.data)));
    });
  };
};

export const startLogout = () => {
  return (dispatch) => {
    return PxpClient.logout().then(() => {
      dispatch(logout());
      history.push('/login');
      dispatch(setMenu([]));
      dispatch(setRoutes([]));
    });
  };
};
