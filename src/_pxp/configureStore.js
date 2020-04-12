import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/auth';
import testReducer from './reducers/test';

export default () => createStore(
    combineReducers({ 
        test: testReducer,        
        auth: authReducer
    }),
    applyMiddleware(thunk)
);