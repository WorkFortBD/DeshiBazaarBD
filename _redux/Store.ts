import { configureStore } from '@reduxjs/toolkit';
import RootReducer from './RootReducer';

const Store = configureStore({
  reducer: RootReducer,
});

export type RootState = ReturnType<typeof Store.getState>;

export type AppDispatch = typeof Store.dispatch;

export default Store;
