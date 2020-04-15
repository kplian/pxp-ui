export default  (state = { sessionDied: false, menu: [], routes: [] }, action) => {
    switch (action.type) { 
        case 'LOGIN':
            return { ...state, sessionDied: false, uid: action.uid };
        case 'LOGOUT':
            return { sessionDied: false, menu: [], routes: [] };  
        case 'SESSION_DIED':  
            return { ...state, sessionDied: true };
        case 'SET_MENU':  
            return { ...state, menu: action.menu }; 
        case 'SET_ROUTES':  
            return { ...state, routes: action.routes };    
        default:
            return state;            
    }
   
};