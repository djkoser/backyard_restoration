import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { UserNativesState, UserNative } from '../types';

const initialState: UserNativesState = {
  userNatives: [],
  loading: false,
  failed: false
};

export const getUserNatives = () => {
  const userNatives = axios
    .get('/api/native/user')
    .then((res) => res.data)
    .catch(() => initialState.userNatives);
  const action = {
    type: 'GET_USER_NATIVES' as const,
    payload: userNatives
  };
  return action;
};

export const addUserNative = (nativeID: string) => {
  const userNatives: Promise<UserNative[]> = axios
    .post(`/api/native/add/${nativeID}`)
    .then((res) => res.data)
    .catch(() => initialState.userNatives);
  const action = {
    type: 'ADD_USER_NATIVE' as const,
    payload: userNatives
  };
  return action;
};

export const updateProjectNotes = (nativeID: string, notes: string) => {
  const userNatives: Promise<UserNative[]> = axios
    .put(`/api/native/notes/${nativeID}`, { notes })
    .then((res) => res.data)
    .catch(() => initialState.userNatives);
  const action = {
    type: 'UPDATE_projectNotes' as const,
    payload: userNatives
  };
  return action;
};

export const removeUserNative = (nativeID: string) => {
  const userNatives: Promise<UserNative[]> = axios
    .delete(`/api/native/delete/${nativeID}`)
    .then((res) => res.data)
    .catch(() => initialState.userNatives);
  const action = {
    type: 'REMOVE_USER_NATIVE' as const,
    payload: userNatives
  };
  return action;
};

const pending: CaseReducer<UserNativesState, PayloadAction<undefined>> = (
  state
) => {
  state.loading = true;
  state.failed = false;
};
const reject: CaseReducer<UserNativesState, PayloadAction<undefined>> = (
  state
) => {
  state.loading = false;
  state.failed = true;
};

const fulfill: CaseReducer<UserNativesState, PayloadAction<UserNative[]>> = (
  state,
  action
) => {
  state.loading = false;
  state.failed = false;
  state.userNatives = action.payload;
};

const userNativesSlice = createSlice({
  name: 'userNatives',
  initialState,
  reducers: {
    GET_USER_NATIVES: (state, action: PayloadAction<Promise<UserNative[]>>) => {
      console.log(
        'Is payload a promise? -> ',
        action.payload instanceof Promise
      );
      return state;
    },
    ADD_USER_NATIVE: (state, action: PayloadAction<Promise<UserNative[]>>) => {
      console.log(
        'Is payload a promise? -> ',
        action.payload instanceof Promise
      );
      return state;
    },
    UPDATE_projectNotes: (
      state,
      action: PayloadAction<Promise<UserNative[]>>
    ) => {
      console.log(
        'Is payload a promise? -> ',
        action.payload instanceof Promise
      );
      return state;
    },
    REMOVE_USER_NATIVE: (
      state,
      action: PayloadAction<Promise<UserNative[]>>
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
    GET_USER_NATIVES_PENDING: (state, action: PayloadAction<undefined>) => {
      pending(state, action);
    },
    GET_USER_NATIVES_FULFILLED: (
      state,
      action: PayloadAction<UserNative[]>
    ) => {
      fulfill(state, action);
    },
    GET_USER_NATIVES_REJECTED: (state, action) => {
      reject(state, action);
    },
    ADD_USER_NATIVE_PENDING: (state, action: PayloadAction<undefined>) => {
      pending(state, action);
    },
    ADD_USER_NATIVE_FULFILLED: (state, action: PayloadAction<UserNative[]>) => {
      fulfill(state, action);
    },
    ADD_USER_NATIVE_REJECTED: (state, action: PayloadAction<undefined>) => {
      reject(state, action);
    },
    UPDATE_projectNotes_PENDING: (state, action: PayloadAction<undefined>) => {
      pending(state, action);
    },
    UPDATE_projectNotes_FULFILLED: (
      state,
      action: PayloadAction<UserNative[]>
    ) => {
      fulfill(state, action);
    },
    UPDATE_projectNotes_REJECTED: (state, action: PayloadAction<undefined>) => {
      reject(state, action);
    },
    REMOVE_USER_NATIVE_PENDING: (state, action: PayloadAction<undefined>) => {
      pending(state, action);
    },
    REMOVE_USER_NATIVE_FULFILLED: (
      state,
      action: PayloadAction<UserNative[]>
    ) => {
      fulfill(state, action);
    },
    REMOVE_USER_NATIVE_REJECTED: (state, action: PayloadAction<undefined>) => {
      reject(state, action);
    }
  }
});

export default userNativesSlice;
