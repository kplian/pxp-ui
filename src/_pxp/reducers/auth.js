/**
 * Reducer to authentication and menu states
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 */
export default (
  state = {
    sessionDied: false,
    menu: [],
    routes: [],
    uid: undefined,
    currentUser: undefined,
  },
  action,
) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        sessionDied: false,
        uid: action.uid,
        currentUser: action.user,
      };
    case 'LOGOUT':
      return {
        sessionDied: false,
        menu: [],
        routes: [],
        uid: undefined,
        currentUser: undefined,
      };
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
