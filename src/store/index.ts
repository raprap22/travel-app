import { configureStore } from '@reduxjs/toolkit';
import articleReducer from './reducer/articleSlice';
import menuReducer from './reducer/menuSlice';

export const store = configureStore({
  reducer: {
    articles: articleReducer,
    menu: menuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
