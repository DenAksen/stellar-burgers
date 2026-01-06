import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import burgerSlice from '../slices/ingridientsSlice';
import feedsSlice from '../slices/feedsSlice';
import constructorBurgerSlice from '../slices/constructorBurgerSlice';
import userSlice from '../slices/userSlice';
import userOderSlice from '../slices/userOrdersSlise';

export const rootReducer = combineReducers({
  burger: burgerSlice.reducer,
  feeds: feedsSlice.reducer,
  constructorBurger: constructorBurgerSlice.reducer,
  user: userSlice.reducer,
  userOrder: userOderSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
