import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPostRequest, ISignInForm } from '../../components/interface';

const initialState: IPostRequest = {
  dataAuth: { name: '', login: '', password: '' },
  isLoading: false,
  errorAuth: '',
  errorLogin: '',
  isAuth: false,
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
    writeAuthDataUser(state, action: PayloadAction<ISignInForm>) {
      state.dataAuth = action.payload;
    },
    checkAuthUser(state, actions: PayloadAction<boolean>) {
      state.isAuth = actions.payload;
    },
  },
});

export const reducerSingupRequest = SingupSlice.reducer;
