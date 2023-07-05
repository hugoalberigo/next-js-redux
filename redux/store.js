import { configureStore } from '@reduxjs/toolkit';
import usernameSlice from './usernameSlice';

export const store = configureStore({
  reducer: {
    username: usernameSlice,
  },
});