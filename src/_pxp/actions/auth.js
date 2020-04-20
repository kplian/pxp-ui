import PxpClient from 'pxp-client';
import config from '../../config';
import { history } from '../routers/AppRouter';

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
    return (dispatch) => { 
        return PxpClient.login(login, password).then(data => {             
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
                mobile: config.menu.mobile
            }            
        }).then(resp => {                         
            dispatch(setMenu(resp.data)); 
            dispatch(setRoutes(findRoutes(resp.data)));
        }); 
    };    
};

export const startLogout = () => { 
    return (dispatch) => {  
        console.log('before logout');
        return PxpClient.logout().then(() => {
            console.log('before');
            dispatch(logout()); 
            history.push('/login');
            dispatch(setMenu([]));  
            dispatch(setRoutes([]));              
        });  
    }; 
};

const findRoutes = menu => { 
    
    const routes = [];
    menu.forEach((menuOption) => {      
      if (menuOption.type === 'hoja') {
        routes.push({id: menuOption.id_gui, component: menuOption.component});
      } else {
        routes.push(...findRoutes(menuOption.childrens));
      }
    });    
    return routes;
}