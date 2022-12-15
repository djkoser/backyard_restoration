import { configureStore } from '@reduxjs/toolkit';
import promiseMiddleware from 'redux-promise-middleware';
import userSlice from './userSlice';
import userMethodSlice from './userMethodSlice';
import userNativePlantSlice from './userNativePlantsSlice';

const store = configureStore({
  reducer: {
    userInfo: userSlice.reducer,
    userNativePlant: userNativePlantSlice.reducer,
    userMethod: userMethodSlice.reducer
  },
  middleware: [promiseMiddleware] as const,
  devTools: true
});

export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
