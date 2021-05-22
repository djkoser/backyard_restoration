// @ts-nocheck
import axios from 'axios';

const initialState = {
  user_id: 0,
  email: "",
  first_name: "",
  last_name: "",
  street: "",
  city: "",
  state: "",
  zipcode: "",
  growing_season_length: 0,
  first_gdd35: "",
  hardiness_zone: "",
  loading: false,
  failed: false
};

const GET_USER_INFO = "GET_USER_INFO";
const ADD_RETRIEVED_INFO = "ADD_RETRIEVED_INFO";

export const getUserInfo = () => {
  const userInfo = axios
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