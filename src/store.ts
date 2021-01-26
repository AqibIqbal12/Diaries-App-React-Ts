import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: rootReducer,
});

type AppDispatch = typeof store.dispatch;
console.log(typeof store.dispatch)
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
