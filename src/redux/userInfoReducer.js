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

export const getUserInfo = () => {
  const userInfo = axios
    .get(`/api/user`)
    .then(res => res.data)
    .catch(err => console.log(err));
  console.log(userInfo);
  const action = {
    type: GET_USER_INFO,
    payload: userInfo
  };
  return action;
};

export default function userInfoReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_INFO + "_PENDING":
      return { ...state, ...{ loading: true, failed: false } }
    case GET_USER_INFO + "_FULFILLED":
      return { ...state, ...action.payload, ...{ loading: false, failed: false } }
    case GET_USER_INFO + "_REJECTED":
      return { ...state, ...{ loading: false, failed: true } }
    default:
      return state
  }
}