import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import authReducer from './reducer/authSlice';

const store = configureStore({
  reducer: rootReducer,
});

export default store;
