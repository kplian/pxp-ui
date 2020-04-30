import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/auth';
import appReducer from './reducers/app';

export default () =>
  createStore(
    combineReducers({
      app: appReducer,
      auth: authReducer,
    }),
    applyMiddleware(thunk),
  );
