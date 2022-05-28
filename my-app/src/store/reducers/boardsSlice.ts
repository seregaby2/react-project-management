import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoard } from '../../interfaces/IBoard';

type initialStateType = {
  isLoading: boolean;
  boards: IBoard[];
  error: string;
  puttingBoardID: string;
  putLoading: boolean;
};

const initialState: initialStateType = {
  isLoading: true,
  boards: [],
  error: '',
  puttingBoardID: '',
  putLoading: false,
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
    boardPutStart(state, action: PayloadAction<string>) {
      state.puttingBoardID = action.payload;
      state.putLoading = true;
    },
    boardPutSuccess(state, action: PayloadAction<IBoard>) {
      state.boards = state.boards.map((board) => {
        if (board.id === action.payload.id) {
          board.title = action.payload.title;
          board.description = action.payload.description;
        }
        return board;
      });
      state.puttingBoardID = '';
      state.putLoading = false;
    },
    boardDeleteSuccess(state, action: PayloadAction<string>) {
      state.boards = state.boards.filter((board) => board.id !== action.payload);
      state.isLoading = false;
    },
    boardsFetchError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const reducerBoards = boardsSlice.reducer;
export const boardsActions = boardsSlice.actions;
