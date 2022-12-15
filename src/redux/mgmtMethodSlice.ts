import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ManagementMethod, ManagementMethodState } from '../types';

const initialState: ManagementMethodState = {
  userMethods: [],
  loading: false,
  failed: false
};

export const getMethods = () => {
  const methods: Promise<ManagementMethod[]> = axios
    .get('/api/wdctrl')
    .then((res) => res.data)
    .catch(() => initialState.userMethods);

  const action = {
    type: 'GET_METHODS',
    payload: methods
  };
  return action;
};

export const toggleMethod = (methodID: string) => {
  const methods: Promise<ManagementMethod[]> = axios
    .put(`/api/wdctrl/${methodID}`)
    .then((res) => res.data)
    .catch(() => initialState.userMethods);

  const action = {
    type: 'TOGGLE_METHOD' as const,
    payload: methods
  };
  return action;
};

const managementMethodSlice = createSlice({
  name: 'managementMethods',
  initialState,
  reducers: {
    GET_METHODS: (
      state,
      action: PayloadAction<Promise<ManagementMethod[]>>
    ) => {
      console.log(
        'Is payload a promise? -> ',
        action.payload instanceof Promise
      );
      return state;
    },
    TOGGLE_METHOD: (
      state,
      action: PayloadAction<Promise<ManagementMethod[]>>
    ) => {
      console.log(
        'Is payload a promise? -> ',
        action.payload instanceof Promise
      );
      return state;
    },
    RESET_STORE: () => {
      return initialState;
    }
  },
  extraReducers: {
    GET_METHODS_PENDING: (state) => {
      state.failed = false;
      state.loading = true;
    },
    GET_METHODS_FULFILLED: (
      state,
      action: PayloadAction<ManagementMethod[]>
    ) => {
      state.failed = false;
      state.loading = false;
      state.userMethods = action.payload;
    },
    GET_METHODS_REJECTED: (state) => {
      state.failed = true;
      state.loading = false;
    },
    TOGGLE_METHOD_PENDING: (state) => {
      state.failed = false;
      state.loading = true;
    },
    TOGGLE_METHOD_FULFILLED: (
      state,
      action: PayloadAction<ManagementMethod[]>
    ) => {
      state.failed = false;
      state.loading = false;
      state.userMethods = action.payload;
    },
    TOGGLE_METHOD_REJECTED: (state) => {
      state.failed = true;
      state.loading = false;
    }
  }
});

export default managementMethodSlice;
