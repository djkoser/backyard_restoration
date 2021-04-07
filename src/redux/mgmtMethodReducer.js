import axios from 'axios';

const initialState = {
  userMethods: []
};

const GET_METHODS = "GET_METHODS";
const ADD_METHOD = "ADD_METHOD";
const REMOVE_METHOD = "REMOVE_METHOD";

export const getMethods = (userID) => {
  const methods = axios
    .get(`/api/user/wdctrl/${userID}`)
    .then(res => res)
    .catch(err => console.log(err));

  const action = {
    type: GET_METHODS,
    payload: methods
  };
  return action;
};

export const addMethod = (userID, methodID) => {
  const methods = axios
    .post(`/api/wdctrl/${userID}/${methodID}`)
    .then(res => res)
    .catch(err => console.log(err));

  const action = {
    type: ADD_METHOD,
    payload: methods
  };
  return action;
};

export const removeMethod = (userID, methodID) => {
  const methods = axios
    .delete(`/api/wdctrl/${userID}/${methodID}`)
    .then(res => res)
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
      return { ...state }
    case GET_METHODS + '_FULFILLED':
      return { ...state }
    case GET_METHODS + '_REJECTED':
      return { ...state }
    case ADD_METHOD + '_PENDING':
      return { ...state }
    case ADD_METHOD + '_FULFILLED':
      return { ...state }
    case ADD_METHOD + '_REJECTED':
      return { ...state }
    case REMOVE_METHOD + '_PENDING':
      return { ...state }
    case REMOVE_METHOD + '_FULFILLED':
      return { ...state }
    case REMOVE_METHOD + '_REJECTED':
      return { ...state }
    default:
      return state
  }
}