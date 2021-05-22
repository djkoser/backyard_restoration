// @ts-nocheck
import axios from 'axios';

const initialState = {
  userMethods: [],
  loading: false,
  failed: false
};

const GET_METHODS = "GET_METHODS";
const TOGGLE_METHOD = "TOGGLE_METHOD";

export const getMethods = () => {
  const methods = axios
    .get(`/api/wdctrl`)
    .then(res => res.data)
    .catch(err => initialState.userMethods);
  const action = {
    type: GET_METHODS,
    payload: methods
  };
  return action;
};

export const toggleMethod = (methodID) => {
  const methods = axios
    .put(`/api/wdctrl/${methodID}`)
    .then(res => res.data)
    .catch(err => initialState.userMethods);

  const action = {
    type: TOGGLE_METHOD,
    payload: methods
  };
  return action;
};

export default function mgmtMethodReducer(state = initialState, action) {
  switch (action.type) {
    case GET_METHODS + '_PENDING':
      return { ...state, ...{ failed: false, loading: true } }
    case GET_METHODS + '_FULFILLED':
      return { ...state, ...{ failed: false, loading: false, userMethods: action.payload } }
    case GET_METHODS + '_REJECTED':
      return { ...state, ...{ failed: true, loading: false } }
    case TOGGLE_METHOD + '_PENDING':
      return { ...state, ...{ failed: false, loading: true } }
    case TOGGLE_METHOD + '_FULFILLED':
      return { ...state, ...{ failed: false, loading: false, userMethods: action.payload } }
    case TOGGLE_METHOD + '_REJECTED':
      return { ...state, ...{ failed: true, loading: false } }
    default:
      return state
  }
}