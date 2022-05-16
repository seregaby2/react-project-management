import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITaskResponse } from '../../interfaces/interfaceTasks';
import { createTaskAsync, deleteTaskAsync, getAllTasksAsync } from '../actions/tasksActions';

interface ITaskSlice {
  tasks: ITaskResponse[];
  isLoading: boolean;
  error: string;
  activeColumnId: string;
}

const initialState: ITaskSlice = {
  tasks: [],
  isLoading: false,
  error: '',
  activeColumnId: '',
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    getActiveColumnId(state, action: PayloadAction<string>) {
      state.activeColumnId = action.payload;
    },
  },
  extraReducers: {
    [getAllTasksAsync.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    [getAllTasksAsync.fulfilled.type]: (
      state,
      action: PayloadAction<{ data: ITaskResponse[]; columnId: string }>
    ) => {
      state.isLoading = false;
      const filteredTasks = state.tasks.filter((task) => task.columnId !== action.payload.columnId);
      state.tasks = [...filteredTasks, ...action.payload.data];
      state.error = '';
    },
    [getAllTasksAsync.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [createTaskAsync.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    [createTaskAsync.fulfilled.type]: (state) => {
      state.isLoading = false;
      state.error = '';
    },
    [createTaskAsync.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteTaskAsync.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    [deleteTaskAsync.fulfilled.type]: (state) => {
      state.isLoading = false;
      state.error = '';
    },
    [deleteTaskAsync.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const reducerTasks = tasksSlice.reducer;
