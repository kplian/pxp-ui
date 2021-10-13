/**
 * Create Store combining several reducers
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/auth';
import appReducer from './reducers/app';
import notifyReducer from './reducers/notify';

export default () => {
  return createStore(
    combineReducers({
      app: appReducer,
      auth: authReducer,
      notify: notifyReducer,
    }),
    applyMiddleware(thunk),
  );
};
