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
      action: PayloadAction<{ task: ITaskResponse; columnId: string }>
    ) => {
      state.isLoading = false;

      let taskFromColumnFiltered = [
        ...state.tasks.filter((task) => task.columnId === action.payload.columnId),
      ].sort((a, b) => (a.order as number) - (b.order as number));
      const prevOrder = [...state.tasks].find((task) => task.id === action.payload.task.id)
        ?.order as number;
      const currentOrder = action.payload.task.order as number;
      if (currentOrder !== prevOrder) {
        // Если ордер в ходе апдейта изменился!!!
        if (currentOrder < prevOrder) {
          for (let i = currentOrder - 1; i < prevOrder - 1; i++) {
            (taskFromColumnFiltered[i].order as number) += 1;
          }
          taskFromColumnFiltered = [
            ...taskFromColumnFiltered.filter((task) => task.id !== action.payload.task.id),
            action.payload.task,
          ].sort((a, b) => (a.order as number) - (b.order as number));
          state.tasks = [
            ...state.tasks.filter((task) => task.columnId !== action.payload.columnId),
            ...taskFromColumnFiltered,
          ];
        }
        if (currentOrder > prevOrder) {
          for (let i = prevOrder; i < currentOrder; i++) {
            (taskFromColumnFiltered[i].order as number) -= 1;
          }
          taskFromColumnFiltered = [
            ...taskFromColumnFiltered.filter((task) => task.id !== action.payload.task.id),
            action.payload.task,
          ].sort((a, b) => (a.order as number) - (b.order as number));
          state.tasks = [
            ...state.tasks.filter((task) => task.columnId !== action.payload.columnId),
            ...taskFromColumnFiltered,
          ];
        }
      } else {
        // Если ордер в ходе апдейта не изменился
        const taskFiltered = [
          ...state.tasks
            .filter((task) => task.columnId === action.payload.columnId)
            .filter((task) => task.id !== action.payload.task.id),
          action.payload.task,
        ].sort((a, b) => (a.order as number) - (b.order as number));

        state.tasks = [
          ...state.tasks.filter((task) => task.columnId !== action.payload.columnId),
          ...taskFiltered,
        ];
      }

      state.error = '';
    },
    [updateTaskAsync.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const reducerTasks = tasksSlice.reducer;
