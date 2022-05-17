import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoard } from '../../interfaces/IBoard';

type initialStateType = {
  isLoading: boolean;
  boards: IBoard[];
  error: string;
};

const initialState: initialStateType = {
  isLoading: true,
  boards: [],
  error: '',
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    boardsFetchStart(state) {
      state.isLoading = true;
    },
    boardsFetchSuccess(state, action: PayloadAction<IBoard[]>) {
      state.boards = action.payload;
      state.isLoading = false;
    },
    boardPostSuccess(state, action: PayloadAction<IBoard>) {
      state.boards.push(action.payload);
      state.isLoading = false;
    },
    boardDeleteSuccess(state, action: PayloadAction<string>) {
      state.boards = state.boards.filter((board) => board.id !== action.payload);
      state.isLoading = false;
    },
    boardsFetchError(state, action: PayloadAction<string>) {
      state.isLoading = true;
      state.error = action.payload;
    },
  },
});

export const reducerBoards = boardsSlice.reducer;
export const boardsActions = boardsSlice.actions;
