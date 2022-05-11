import axios from 'axios';
import { ISignInForm, Itoken } from '../../components/interface';
import { AppDispatch } from '../store';
import { SingupSlice } from './authSlice';

const baseUrl = 'https://young-hamlet-94914.herokuapp.com';

export const fetchDataLogin = (dataAuth: ISignInForm) => async (dispatch: AppDispatch) => {
  try {
    dispatch(SingupSlice.actions.authFetching());

    const response = await axios.post<Itoken>(`${baseUrl}/signin`, {
      login: dataAuth.login,
      password: dataAuth.password,
    });

    dispatch(SingupSlice.actions.loginFetchingSuccess());
    localStorage.setItem('token', response.data.token);
  } catch (e) {
    if (e instanceof Error) dispatch(SingupSlice.actions.loginFetchingError(e.message));
  }
};
