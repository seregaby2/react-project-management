import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IHelpVars {
  isConfirmalModal: boolean;
  isBackEndErrors: boolean;
  errorMessage: string;
  successMessage: string;
}

const initialState: IHelpVars = {
  isConfirmalModal: false,
  isBackEndErrors: false,
  errorMessage: '',
  successMessage: '',
};
export const HelpVarSlice = createSlice({
  name: 'helpVars',
  initialState: initialState,
  reducers: {
    setIsConfirmalModal(state, action: PayloadAction<boolean>) {
      state.isConfirmalModal = action.payload;
    },
    setIsBackEndErrors(state, action: PayloadAction<boolean>) {
      state.isBackEndErrors = action.payload;
    },
    setErrorMessage(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
    setSuccessMessage(state, action: PayloadAction<string>) {
      state.successMessage = action.payload;
    },
  },
});

export const reducerHelpVars = HelpVarSlice.reducer;
