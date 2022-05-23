import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IColumnRequest } from '../../interfaces/interfaceColumns';
import {
  addColumnAsync,
  deleteColumnAsync,
  getColumnAsync,
  updateColumAsync,
} from '../actions/columnsActions';

interface IColumnsSlice {
  columns: IColumnRequest[];
  //column: IColumnRequest | null;
  isLoading: boolean;
  error: string;
}

const initialState: IColumnsSlice = {
  columns: [],
  //column: null,
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
    },
    [addColumnAsync.fulfilled.type]: (state, action: PayloadAction<IColumnRequest>) => {
      state.isLoading = false;
      state.columns = [...state.columns, action.payload];
    },
    [addColumnAsync.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [deleteColumnAsync.pending.type]: (state) => {
      state.isLoading = true;
    },
    [deleteColumnAsync.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.columns = state.columns.filter((column) => column.id !== action.payload);
    },
    [deleteColumnAsync.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [updateColumAsync.pending.type]: (state) => {
      state.isLoading = true;
    },
    [updateColumAsync.fulfilled.type]: (state, action: PayloadAction<IColumnRequest>) => {
      state.isLoading = false;
      //const column = state.columns.find((column) => column.id === action.payload.id);
      //if (column?.order === action.payload.order) {
      //  const filteredColumns = state.columns.filter((column) => column.id !== action.payload.id);
      //  console.log(1);

      //  state.columns = [...filteredColumns, action.payload].sort((a, b) => a.order - b.order);
      //} else {
      //  console.log(2);
      //  const filteredColumns = state.columns.filter((column) => column.id !== action.payload.id);
      //  filteredColumns.map((column) => {
      //    if (column.order > action.payload.order) {
      //      return (column.order += 1);
      //    } else {
      //      return;
      //    }
      //  });
      //  state.columns = [...filteredColumns, action.payload].sort((a, b) => a.order - b.order);
      //}
    },
    [updateColumAsync.rejected.type]: (state) => {
      state.isLoading = false;
    },
  },
});

export const reducerColumns = columnsSlice.reducer;
