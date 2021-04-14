import axios from 'axios';

const initialState = {
  userMethods: [],
  loading: false,
  failed: false
};

const GET_METHODS = "GET_METHODS";
const ADD_METHOD = "ADD_METHOD";
const REMOVE_METHOD = "REMOVE_METHOD";

export const getMethods = () => {
  const methods = axios
    .get(`/api/wdctrl`)
    .then(res => res.data)
    .catch(err => console.log(err));
  console.log(methods)
  const action = {
    type: GET_METHODS,
    payload: methods
  };
  return action;
};

export const addMethod = (methodID) => {
  const methods = axios
    .post(`/api/wdctrl/${methodID}`)
    .then(res => res.data)
    .catch(err => console.log(err));

  const action = {
    type: ADD_METHOD,
    payload: methods
  };
  return action;
};

export const removeMethod = (methodID) => {
  const methods = axios
    .delete(`/api/wdctrl/${methodID}`)
    .then(res => res.data)
    .catch(err => console.log(err));

  const action = {
    type: REMOVE_METHOD,
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
    case ADD_METHOD + '_PENDING':
      return { ...state, ...{ failed: false, loading: true } }
    case ADD_METHOD + '_FULFILLED':
      return { ...state, ...{ failed: false, loading: false, userMethods: action.payload } }
    case ADD_METHOD + '_REJECTED':
      return { ...state, ...{ failed: true, loading: false } }
    case REMOVE_METHOD + '_PENDING':
      return { ...state, ...{ failed: false, loading: true } }
    case REMOVE_METHOD + '_FULFILLED':
      return { ...state, ...{ failed: false, loading: false, userMethods: action.payload } }
    case REMOVE_METHOD + '_REJECTED':
      return { ...state, ...{ failed: true, loading: false } }
    default:
      return state
  }
}