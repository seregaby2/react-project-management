import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IColumnRequest } from '../../interfaces/interfaceColumns';
import {
  addColumnAsync,
  deleteColumnAsync,
  getColumnAsync,
  IUpdateColumnTitle,
  updateColumAsync,
} from '../actions/columnsActions';

interface IColumnsSlice {
  columns: IColumnRequest[];
  isLoading: boolean;
  error: string;
  isDeleteColumn: boolean;
  activeColumnId: string;
}

const initialState: IColumnsSlice = {
  columns: [],
  isLoading: false,
  error: '',
  isDeleteColumn: false,
  activeColumnId: '',
};

export const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    updateColumState(state, action: PayloadAction<IUpdateColumnTitle>) {
      const currentOrder = action.payload.data.order;

      const prevOrder = [...state.columns].find((column) => column.id === action.payload.data.id)
        ?.order as number;
      const columns = [...state.columns].filter((column) => column.id !== action.payload.data.id);

      if (currentOrder !== prevOrder) {
        if (currentOrder < prevOrder) {
          for (let i = currentOrder - 1; i < prevOrder - 1; i++) {
            (columns[i].order as number) += 1;
          }
          state.columns = [...columns, action.payload.data].sort((a, b) => a.order - b.order);
        }
        if (currentOrder > prevOrder) {
          for (let i = prevOrder - 1; i < currentOrder - 1; i++) {
            (columns[i].order as number) -= 1;
          }

          state.columns = [...columns, action.payload.data].sort((a, b) => a.order - b.order);
        }
      } else {
        state.columns = [
          ...state.columns.filter((column) => column.id !== action.payload.data.id),
          action.payload.data,
        ].sort((a, b) => a.order - b.order);
      }
    },
    setIsDeleteColumn(
      state,
      action: PayloadAction<{ isDeleteColumn: boolean; activeColumnId: string }>
    ) {
      state.isDeleteColumn = action.payload.isDeleteColumn;
      state.activeColumnId = action.payload.activeColumnId;
    },
    clearColumnError(state) {
      state.error = '';
    },
  },
  extraReducers: {
    [getColumnAsync.pending.type]: (state) => {
      state.isLoading = true;
      state.columns = [];
      state.error = '';
    },
    [getColumnAsync.fulfilled.type]: (state, action: PayloadAction<IColumnRequest[]>) => {
      state.isLoading = false;
      state.columns = action.payload.sort((a, b) => a.order - b.order);
      state.error = '';
    },
    [getColumnAsync.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.columns = [];
      state.error = action.payload;
    },
    [addColumnAsync.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    [addColumnAsync.fulfilled.type]: (state, action: PayloadAction<IColumnRequest>) => {
      state.isLoading = false;
      state.columns = [...state.columns, action.payload];
      state.error = '';
    },
    [addColumnAsync.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteColumnAsync.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    [deleteColumnAsync.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.columns = state.columns.filter((column) => column.id !== action.payload);
      state.error = '';
    },
    [deleteColumnAsync.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [updateColumAsync.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    [updateColumAsync.fulfilled.type]: (state) => {
      state.isLoading = false;
      state.error = '';
    },
    [updateColumAsync.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const reducerColumns = columnsSlice.reducer;
