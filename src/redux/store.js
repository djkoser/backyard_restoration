
import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import mgmtMethodReducer from './mgmtMethodReducer';
import userInfoReducer from './userInfoReducer';

const rootReducer = combineReducers({
  mgmtMethodReducer,
  userInfoReducer
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware))


