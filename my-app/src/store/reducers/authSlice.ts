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
  isTokenActive: false,
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
      state.isLoading = false;
      state.errorAuth = action.payload;
    },

    loginFetchingSuccess(state) {
      state.isLoading = false;
      state.errorLogin = '';
    },
    loginFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.errorLogin = action.payload;
    },

    updateUserFetchingSuccess(state) {
      state.isLoading = false;
      state.errorUpdateUser = '';
    },
    updateUserFethingError(state, action: PayloadAction<string>) {
      state.errorUpdateUser = action.payload;
      state.isLoading = false;
    },

    getUserFetchingSuccess(state) {
      state.isLoading = false;
    },
    getUserFetchingError(state, action: PayloadAction<string>) {
      state.errorGetUser = action.payload;
      state.isLoading = false;
    },

    deleteUserFetchingSuccess(state) {
      state.errorDeleteUser = '';
    },
    deleleteUserFetchingError(state, action: PayloadAction<string>) {
      state.errorDeleteUser = action.payload;
      state.isLoading = false;
    },

    writeAuthDataUser(state, action: PayloadAction<ISignInForm>) {
      state.dataAuth = action.payload;
    },
    setTokenStatus(state, action: PayloadAction<boolean>) {
      state.isTokenActive = action.payload;
    },
  },
});

export const reducerSingupRequest = SingupSlice.reducer;
