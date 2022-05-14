import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoard } from '../../interfaces/IBoard';

type initialStateType = {
  boards: IBoard[];
};

const initialState: initialStateType = {
  boards: [],
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setBoard(state, action: PayloadAction<IBoard>) {
      state.boards.push(action.payload);
    },
    deleteBoard(state, action: PayloadAction<string>) {
      state.boards = state.boards.filter((board) => board.id !== action.payload);
    },
  },
});

export const reducerBoards = boardsSlice.reducer;
export const boardsActions = boardsSlice.actions;
