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

const pagesPxpTableFromLocalStorage = () => {
  const data = JSON.parse(localStorage.getItem('routesPxpTable')) || [];
  const res = { app: { pagesPxpTable: {} } };
  data.forEach((i) => {
    res.app.pagesPxpTable = {
      ...res.app.pagesPxpTable,
      [i]: { pxpTable: JSON.parse(localStorage.getItem(i)) },
    };
  });
  return res;
};

export default () =>
  createStore(
    combineReducers({
      app: appReducer,
      auth: authReducer,
      notify: notifyReducer,
    }),
    pagesPxpTableFromLocalStorage(),
    applyMiddleware(thunk),
  );
