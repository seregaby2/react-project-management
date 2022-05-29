import axios, { AxiosError } from 'axios';
import { IResolveToken, ISignInForm, Itoken } from '../interfaces/interfaceAuth';
import { AppDispatch } from '../store/store';
import { SingupSlice } from '../store/reducers/authSlice';
import { fetchGetUser } from '../api/actionGetUser';
import jwtDecode from 'jwt-decode';
import { HelpVarSlice } from '../store/reducers/helpVarSlice';
import { BASE_URL } from '../constants/api';

export const fetchDataLogin = (dataAuth: ISignInForm) => async (dispatch: AppDispatch) => {
  try {
    dispatch(SingupSlice.actions.authFetching());

    const response = await axios.post<Itoken>(`${BASE_URL}/signin`, {
      login: dataAuth.login,
      password: dataAuth.password,
    });

    const decoded = jwtDecode<IResolveToken>(response.data.token);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('checkAuthUser', 'user autorizated');

    await dispatch(fetchGetUser(decoded.userId));
    dispatch(SingupSlice.actions.setTokenStatus(true));
  } catch (e) {
    const err = e as AxiosError;
    dispatch(HelpVarSlice.actions.setErrorMessage(`${err.message}. ${err.response?.statusText}.`));
    localStorage.clear();
    dispatch(SingupSlice.actions.setTokenStatus(false));
  } finally {
    dispatch(SingupSlice.actions.loginFetchingSuccess());
  }
};
