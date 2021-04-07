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
  lat: 0,
  long: 0,
  gSeasonLength: 0,
  firstGDD32: "",
  hZone: ""
};

const GET_USER_INFO = "GET_USER_INFO";

export const getUserInfo = (userID) => {
  const userInfo = axios
    .get(`/api/user/${userID}`)
    .then(res => res)
    .catch(err => console.log(err));

  const action = {
    type: GET_USER_INFO,
    payload: userInfo
  };
  return action;
};

export default function userInfoReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_INFO + "_PENDING":
      return { ...state }
    case GET_USER_INFO + "_FULFILLED":
      return { ...state }
    case GET_USER_INFO + "_REJECTED":
      return { ...state }
    default:
      return state
  }
}