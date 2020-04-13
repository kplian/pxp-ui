import PxpClient from 'pxp-client';

export const login = (uid) => ({
    type: 'LOGIN',
    uid
});

export const logout = () => ({
    type: 'LOGOUT'    
});
export const startLogin = ({ login, password }) => { 
    return PxpClient.login(login, password).then(data => {        
        if (data.ROOT) {
            return data.ROOT.detalle.mensaje; 
        }
        return 'success';
    });   
};

export const startLogout = () => { 
    return PxpClient.logout();   
};