export default  (state = { sessionDied: false }, action) => {    
    switch (action.type) { 
        case 'LOGIN':
            return { sessionDied: false, uid: action.uid };
        case 'LOGOUT':
            return { sessionDied: false };  
        case 'SESSION_DIED':  
            return { sessionDied: true };     
        default:
            return state;            
    }
   
};