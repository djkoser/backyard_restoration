import axios from 'axios';
import { UserInfoState } from '../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: UserInfoState = {
  user_id: 0,
  email: '',
  first_name: '',
  last_name: '',
  street: '',
  city: '',
  state: '',
  zipcode: '',
  growing_season_length: 0,
  first_gdd35: '',
  last_gdd35: '',
  hardiness_zone: '',
  loading: false,
  failed: false
};

export const getUserInfo = () => {
  const userInfo: Promise<UserInfoState> = axios
    .get('/api/user')
    .then(res => res.data)
    .catch(() => initialState);
  const action = {
    type: 'GET_USER_INFO' as const,
    payload: userInfo
  };
  return action;
};


const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    GET_USER_INFO: (state, action: PayloadAction<Promise<UserInfoState>>) => {
      console.log('Is payload a promise? -> ', action.payload instanceof Promise);
      return state;
    },
    RESET_STORE: () => {
      return initialState;
    },
    ADD_RETRIEVED_INFO: (_, action: PayloadAction<UserInfoState>) => {
      return action.payload;
    }

  },
  extraReducers: {
    GET_USER_INFO_PENDING: (state) => {
      state.loading = true;
      state.failed = false;
    },
    GET_USER_INFO_FULFILLED: (state, action) => {
      return { ...state, ...action.payload, ...{ loading: false, failed: false } };
    },
    GET_USER_INFO_REJECTED: (state) => {
      state.loading = false;
      state.failed = true;
    }
  }
});

export default userInfoSlice; 
