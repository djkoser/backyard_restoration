// @ts-nocheck
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import mgmtMethodReducer from "./mgmtMethodReducer";
import userInfoReducer from "./userInfoReducer";
import userNativesReducer from "./userNativesReducer";

const rootReducer = combineReducers({
  mgmtMethodReducer,
  userInfoReducer,
  userNativesReducer,
});

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(promiseMiddleware)));


