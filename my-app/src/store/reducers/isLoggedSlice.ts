import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ILogged {
  isLogged: boolean;
}

const initialState: ILogged = {
  isLogged: true,
};

export const isLoggedSlice = createSlice({
  name: 'isLogged',
  initialState: initialState,
  reducers: {
    setIsLogged(state, action: PayloadAction<boolean>) {
      state.isLogged = action.payload;
    },
  },
});

export const reducerIsLogged = isLoggedSlice.reducer;
