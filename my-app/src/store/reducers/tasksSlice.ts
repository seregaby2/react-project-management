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
    deleteTaskFromState(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
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
      console.log(action.payload.columnId);

      const prevColumnId = action.payload.columnId;
      const currentColumnId = action.payload.task.columnId;

      if (prevColumnId !== currentColumnId) {
        // Если меняется колонка, то пересчитываются ordera как в новой так и в старой колонке
        let tasksFromNewColumnFiltered = [
          ...state.tasks.filter((task) => task.columnId === currentColumnId),
        ].sort((a, b) => (a.order as number) - (b.order as number));

        const tasksFromPrevColumnFiltered = [
          ...state.tasks.filter((task) => task.columnId === prevColumnId),
        ]
          .filter((task) => task.id !== action.payload.task.id)
          .sort((a, b) => (a.order as number) - (b.order as number));

        // orders в новой и старой колонке
        const taskOrderInPrevColumn = [...state.tasks].find(
          (task) => task.id === action.payload.task.id
        )?.order as number;
        const taskOrderInNewColumn = action.payload.task.order as number;

        for (let i = taskOrderInPrevColumn - 1; i < tasksFromPrevColumnFiltered.length; i++) {
          (tasksFromPrevColumnFiltered[i].order as number) -= 1;
        }
        for (let i = taskOrderInNewColumn - 1; i < tasksFromNewColumnFiltered.length; i++) {
          (tasksFromNewColumnFiltered[i].order as number) += 1;
        }
        tasksFromNewColumnFiltered = [...tasksFromNewColumnFiltered, action.payload.task].sort(
          (a, b) => (a.order as number) - (b.order as number)
        );

        // Обновление стейта с тасками
        state.tasks = [
          ...state.tasks
            .filter((task) => task.columnId !== currentColumnId)
            .filter((task) => task.columnId !== prevColumnId),
          ...tasksFromNewColumnFiltered,
          ...tasksFromPrevColumnFiltered,
        ];
      } else {
        // Если ордер в ходе апдейта изменился!!!
        const prevOrder = [...state.tasks].find((task) => task.id === action.payload.task.id)
          ?.order as number;
        const currentOrder = action.payload.task.order as number;
        if (currentOrder !== prevOrder) {
          let tasksFromColumnFiltered = [
            ...state.tasks.filter((task) => task.columnId === action.payload.columnId),
          ].sort((a, b) => (a.order as number) - (b.order as number));
          if (currentOrder < prevOrder) {
            for (let i = currentOrder - 1; i < prevOrder - 1; i++) {
              if (tasksFromColumnFiltered.length > 1) {
                (tasksFromColumnFiltered[i].order as number) += 1;
              }
            }
            tasksFromColumnFiltered = [
              ...tasksFromColumnFiltered.filter((task) => task.id !== action.payload.task.id),
              action.payload.task,
            ].sort((a, b) => (a.order as number) - (b.order as number));
            state.tasks = [
              ...state.tasks.filter((task) => task.columnId !== action.payload.columnId),
              ...tasksFromColumnFiltered,
            ];
          }
          if (currentOrder > prevOrder) {
            for (let i = prevOrder; i < currentOrder; i++) {
              (tasksFromColumnFiltered[i].order as number) -= 1;
            }
            tasksFromColumnFiltered = [
              ...tasksFromColumnFiltered.filter((task) => task.id !== action.payload.task.id),
              action.payload.task,
            ].sort((a, b) => (a.order as number) - (b.order as number));
            state.tasks = [
              ...state.tasks.filter((task) => task.columnId !== action.payload.columnId),
              ...tasksFromColumnFiltered,
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
