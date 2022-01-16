import { configureStore } from '@reduxjs/toolkit';
import RootReducer from './RootReducer';

const Store = configureStore({
  reducer: RootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof Store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof Store.dispatch;

export default Store;
