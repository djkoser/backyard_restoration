import { configureStore } from '@reduxjs/toolkit';
import promiseMiddleware from 'redux-promise-middleware';
import userInfoSlice from './userInfoSlice';

const store = configureStore({
  reducer: userInfoSlice.reducer,
  middleware: [promiseMiddleware] as const,
  devTools: true
});

export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
