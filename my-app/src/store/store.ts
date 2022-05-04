import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducerRequestApi } from './reducers/userSlise';

const rootReducer = combineReducers({
  reducerRequestApi,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
