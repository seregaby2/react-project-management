import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'responseApi',
  initialState: '',
  reducers: {},
});

export const reducerRequestApi = userSlice.reducer;
