
import { configureStore } from '@reduxjs/toolkit';
import promiseMiddleware from 'redux-promise-middleware';
import managementMethodSlice from './mgmtMethodSlice';
import userInfoSlice from './userInfoSlice';
import userNativesSlice from './userNativesSlice';

const store = configureStore({
  reducer: {
    mgmtMethodReducer: managementMethodSlice.reducer,
    userInfoReducer: userInfoSlice.reducer,
    userNativesReducer: userNativesSlice.reducer
  },
  middleware: [promiseMiddleware] as const,
  devTools: true
}
);

export type AppStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export default store;