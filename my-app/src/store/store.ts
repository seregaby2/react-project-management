import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducerSingupRequest } from './reducers/authSlice';
import { reducerBoards } from './reducers/boardsSlice';
import { reducerColumns } from './reducers/columnsSlice';
import { reducerHelpVars } from './reducers/helpVarSlice';
import { reducerTasks } from './reducers/tasksSlice';
import { reducerCreateBoardForm } from './reducers/createBoardFormSlice';

const rootReducer = combineReducers({
  reducerSingupRequest,
  reducerHelpVars,
  reducerBoards,
  reducerColumns,
  reducerTasks,
  reducerCreateBoardForm,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
