import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITaskResponse } from '../../interfaces/interfaceTasks';
import {
  createTaskAsync,
  deleteTaskAsync,
  getAllTasksAsync,
  updateTaskAsync,
} from '../actions/tasksActions';

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
    [createTaskAsync.fulfilled.type]: (state, action: PayloadAction<ITaskResponse>) => {
      state.isLoading = false;
      state.tasks = [action.payload, ...state.tasks];
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
    [updateTaskAsync.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    [updateTaskAsync.fulfilled.type]: (
      state,
      action: PayloadAction<{ task: ITaskResponse; taskId: string }>
    ) => {
      state.isLoading = false;
      const taskIndex = state.tasks.findIndex((task) => task.id === action.payload.taskId);
      state.tasks = [...state.tasks, ...state.tasks.splice(taskIndex, 0, action.payload.task)];
      state.error = '';
    },
    [updateTaskAsync.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const reducerTasks = tasksSlice.reducer;
