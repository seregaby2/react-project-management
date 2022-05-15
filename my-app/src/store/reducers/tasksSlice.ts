import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITaskResponse } from '../../interfaces/interfaceTasks';
import { createTaskAsync, getAllTasksAsync } from '../actions/tasksActions';

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
    [getAllTasksAsync.fulfilled.type]: (state, action: PayloadAction<ITaskResponse[]>) => {
      state.isLoading = false;
      state.tasks = [...state.tasks, ...action.payload].filter(
        (task, index, self) =>
          index ===
          self.findIndex(
            (temp) =>
              temp.boardId === task.boardId &&
              temp.columnId === task.columnId &&
              temp.description === task.description &&
              temp.id === task.id &&
              temp.title === task.title &&
              temp.userId === task.userId
          )
      );

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
  },
});

export const reducerTasks = tasksSlice.reducer;
