import { createSlice } from '@reduxjs/toolkit';

type initialStateType = {
  isShowCreateBoardForm: boolean;
};

const initialState: initialStateType = {
  isShowCreateBoardForm: false,
};

export const createBoardFormSlice = createSlice({
  name: 'createBoardForm',
  initialState,
  reducers: {
    showCreateBoardForm(state) {
      state.isShowCreateBoardForm = true;
    },
    hideCreateBoardForm(state) {
      state.isShowCreateBoardForm = false;
    },
  },
});

export const reducerCreateBoardForm = createBoardFormSlice.reducer;
export const actionsCreateBoardForm = createBoardFormSlice.actions;
