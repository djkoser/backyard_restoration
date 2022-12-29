import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import userMethodSlice from './userMethodSlice';
import userNativePlantSlice from './userNativePlantsSlice';
import userSlice from './userSlice';

const store = configureStore({
  reducer: {
    userInfo: userSlice.reducer,
    userNativePlant: userNativePlantSlice.reducer,
    userMethod: userMethodSlice.reducer
  },
  devTools: true
});

export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
