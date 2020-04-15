import PxpClient from 'pxp-client';
import config from '../../config';

export const login = (uid) => ({
    type: 'LOGIN',
    uid
});

export const logout = () => ({
    type: 'LOGOUT'    
});

const setMenu = (menu) => ({
    type: 'SET_MENU',
    menu
});

const setRoutes = (routes) => ({
    type: 'SET_ROUTES',
    routes
});

export const startLogin = ({ login, password }) => { 
    return PxpClient.login(login, password).then(data => {        
        if (data.ROOT) {
            return data.ROOT.detalle.mensaje; 
        }
        return 'success';
    });   
};

export const startSetMenu = () => { 
    return (dispatch) => {   
        return PxpClient.doRequest({
            url: 'seguridad/Menu/getMenuJSON',
            params: {
                system: config.menu.system,
                mobile: config.menu.mobile
            }            
        }).then(resp => {                         
            dispatch(setMenu(resp.data.v_resp_json));
            dispatch(setRoutes(findRoutes(resp.data.v_resp_json)));
        }); 
    };    
};

export const startLogout = () => { 
    return PxpClient.logout();   
};

const findRoutes = menu => { 
    const routes = [];
    menu.forEach((menuOption) => {      
      if (menuOption.type === 'hoja') {
        routes.push(menuOption);
      } else {
        routes.push(...findRoutes(menuOption.childrens));
      }
    });    
    return routes;
}