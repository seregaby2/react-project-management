import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducerRequestApi } from './reducers/userSlise';
import { reducerBoards } from './reducers/boardsSlice';

const rootReducer = combineReducers({
  reducerRequestApi,
  reducerBoards,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
