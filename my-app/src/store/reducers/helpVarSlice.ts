import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IHelpVars {
  isConfirmalModal: boolean;
}

const initialState: IHelpVars = {
  isConfirmalModal: false,
};
export const HelpVarSlice = createSlice({
  name: 'helpVars',
  initialState: initialState,
  reducers: {
    setIsConfirmalModal(state, action: PayloadAction<boolean>) {
      state.isConfirmalModal = action.payload;
    },
  },
});

export const reducerHelpVars = HelpVarSlice.reducer;
