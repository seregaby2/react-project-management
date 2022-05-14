import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPostRequest, ISignInForm } from '../../interfaces/interfaceAuth';

const initialState: IPostRequest = {
  dataAuth: { name: '', login: '', password: '' },
  isLoading: false,
  errorAuth: '',
  errorLogin: '',
  errorUpdateUser: '',
  errorGetUser: '',
  errorDeleteUser: '',
};

export const SingupSlice = createSlice({
  name: 'postRequest',
  initialState,
  reducers: {
    authFetching(state) {
      state.isLoading = true;
    },
    authFetchingSuccess(state) {
      state.isLoading = false;
      state.errorAuth = '';
    },
    authFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = true;
      state.errorAuth = action.payload;
    },

    loginFetchingSuccess(state) {
      state.isLoading = false;
      state.errorLogin = '';
    },
    loginFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = true;
      state.errorLogin = action.payload;
    },

    updateUserFetchingSuccess(state) {
      state.isLoading = false;
      state.errorUpdateUser = '';
    },
    updateUserFethingError(state, action: PayloadAction<string>) {
      state.errorUpdateUser = action.payload;
    },

    getUserFetchingSuccess(state) {
      state.isLoading = false;
    },
    getUserFetchingError(state, action: PayloadAction<string>) {
      state.errorGetUser = action.payload;
    },

    deleteUserFetchingSuccess(state) {
      state.errorDeleteUser = '';
    },
    deleleteUserFetchingError(state, action: PayloadAction<string>) {
      state.errorDeleteUser = action.payload;
    },

    writeAuthDataUser(state, action: PayloadAction<ISignInForm>) {
      state.dataAuth = action.payload;
    },
  },
});

export const reducerSingupRequest = SingupSlice.reducer;
