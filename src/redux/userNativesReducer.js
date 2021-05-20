import axios from 'axios';

const initialState = {
  userNativePlants: [],
};

const GET_USER_NATIVES = "GET_USER_NATIVES";
const ADD_USER_NATIVE = "ADD_USER_NATIVE";
const UPDATE_PROJECT_NOTES = "UPDATE_PROJECT_NOTES";
const REMOVE_USER_NATIVE = "REMOVE_USER_NATIVE";


export const getUserNatives = () => {
  const userNatives = axios
    .get(`/api/user`)
    .then(res => res.data)
    .catch(err => initialState);
  const action = {
    type: GET_USER_INFO,
    payload: userInfo
  };
  return action;
};

export const addRetrievedInfo = (retrievedInfo) => {
  const action = {
    type: ADD_RETRIEVED_INFO,
    payload: retrievedInfo
  }
  return action;
}



export default function userInfoReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_INFO + "_PENDING":
      return { ...state, ...{ loading: true, failed: false } }
    case GET_USER_INFO + "_FULFILLED":
      return { ...state, ...action.payload, ...{ loading: false, failed: false } }
    case GET_USER_INFO + "_REJECTED":
      return { ...state, ...{ loading: false, failed: true } }
    case ADD_RETRIEVED_INFO:
      return { ...state, ...action.payload }
    default:
      return state
  }
}