import axios from 'axios';

const initialState = {
  userNatives: [],
};

const GET_USER_NATIVES = "GET_USER_NATIVES";
const ADD_USER_NATIVE = "ADD_USER_NATIVE";
const UPDATE_PROJECT_NOTES = "UPDATE_PROJECT_NOTES";
const REMOVE_USER_NATIVE = "REMOVE_USER_NATIVE";


export const getUserNatives = () => {
  const userNatives = axios
    .get(`/api/native/user`)
    .then(res => res.data)
    .catch(err => initialState);
  const action = {
    type: GET_USER_NATIVES,
    payload: userNatives
  };
  return action;
};
export const addUserNative = () => {
  const userNatives = axios
    .get(`/api/native/user`)
    .then(res => res.data)
    .catch(err => initialState);
  const action = {
    type: ADD_USER_NATIVE,
    payload: userNatives
  };
  return action;
};
export const updateProjectNotes = () => {
  const userNatives = axios
    .get(`/api/native/user`)
    .then(res => res.data)
    .catch(err => initialState);
  const action = {
    type: UPDATE_PROJECT_NOTES,
    payload: userNatives
  };
  return action;
};
export const removeUserNative = () => {
  const userNatives = axios
    .get(`/api/native/user`)
    .then(res => res.data)
    .catch(err => initialState);
  const action = {
    type: REMOVE_USER_NATIVE,
    payload: userNatives
  };
  return action;
};

export default function userInfoReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_NATIVES + "_PENDING":
      return { ...state, ...{ loading: true, failed: false } }
    case GET_USER_NATIVES + "_FULFILLED":
      return { ...state, ...action.payload, ...{ loading: false, failed: false } }
    case GET_USER_NATIVES + "_REJECTED":
      return { ...state, ...{ loading: false, failed: true } }
    case ADD_USER_NATIVE + "_PENDING":
      return { ...state, ...{ loading: true, failed: false } }
    case ADD_USER_NATIVE + "_FULFILLED":
      return { ...state, ...action.payload, ...{ loading: false, failed: false } }
    case ADD_USER_NATIVE + "_REJECTED":
      return { ...state, ...{ loading: false, failed: true } }
    case UPDATE_PROJECT_NOTES + "_PENDING":
      return { ...state, ...{ loading: true, failed: false } }
    case UPDATE_PROJECT_NOTES + "_FULFILLED":
      return { ...state, ...action.payload, ...{ loading: false, failed: false } }
    case UPDATE_PROJECT_NOTES + "_REJECTED":
      return { ...state, ...{ loading: false, failed: true } }
    case REMOVE_USER_NATIVE + "_PENDING":
      return { ...state, ...{ loading: true, failed: false } }
    case REMOVE_USER_NATIVE + "_FULFILLED":
      return { ...state, ...action.payload, ...{ loading: false, failed: false } }
    case REMOVE_USER_NATIVE + "_REJECTED":
      return { ...state, ...{ loading: false, failed: true } }
    default:
      return state
  }
}