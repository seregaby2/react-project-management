import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IColumnRequest } from '../../interfaces/interfaceColumns';
import {
  addColumnAsync,
  deleteColumnAsync,
  getColumnAsync,
  updateColumTitleAsync,
} from '../actions/columnsActions';

interface IColumnsSlice {
  columns: IColumnRequest[];
  column: IColumnRequest | null;
  isLoading: boolean;
  error: string;
}

const initialState: IColumnsSlice = {
  columns: [],
  column: null,
  isLoading: false,
  error: '',
};

export const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {},
  extraReducers: {
    [getColumnAsync.pending.type]: (state) => {
      state.isLoading = true;
      state.columns = [];
      state.error = '';
    },
    [getColumnAsync.fulfilled.type]: (state, action: PayloadAction<IColumnRequest[]>) => {
      state.isLoading = false;
      state.columns = action.payload;
      state.error = '';
    },
    [getColumnAsync.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.columns = [];
      state.error = action.payload;
    },
    [addColumnAsync.pending.type]: (state) => {
      state.isLoading = true;
    },
    [addColumnAsync.fulfilled.type]: (state) => {
      state.isLoading = false;
    },
    [addColumnAsync.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [deleteColumnAsync.pending.type]: (state) => {
      state.isLoading = true;
    },
    [deleteColumnAsync.fulfilled.type]: (state) => {
      state.isLoading = false;
    },
    [deleteColumnAsync.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [updateColumTitleAsync.pending.type]: (state) => {
      state.isLoading = true;
      state.column = null;
    },
    [updateColumTitleAsync.fulfilled.type]: (state, action: PayloadAction<IColumnRequest>) => {
      state.isLoading = false;
      state.column = action.payload;
    },
    [updateColumTitleAsync.rejected.type]: (state) => {
      state.isLoading = false;
      state.column = null;
    },
  },
});

export const reducerColumns = columnsSlice.reducer;
