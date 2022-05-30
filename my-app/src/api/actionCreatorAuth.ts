import axios, { AxiosError } from 'axios';
import { ISignInForm, ISingUp } from '../interfaces/interfaceAuth';
import { AppDispatch } from '../store/store';
import { SingupSlice } from '../store/reducers/authSlice';
import { fetchDataLogin } from './actionSignin';
import { HelpVarSlice } from '../store/reducers/helpVarSlice';
import { BASE_URL } from '../constants';

export const fetchDataAuth = (dataAuth: ISignInForm) => async (dispatch: AppDispatch) => {
  try {
    dispatch(SingupSlice.actions.authFetching());

    await axios.post<ISingUp>(`${BASE_URL}/signup`, {
      name: dataAuth.name,
      login: dataAuth.login,
      password: dataAuth.password,
    });

    await dispatch(fetchDataLogin(dataAuth));
  } catch (e) {
    const err = e as AxiosError;
    dispatch(HelpVarSlice.actions.setErrorMessage(`${err.message}. ${err.response?.statusText}.`));
  } finally {
    dispatch(SingupSlice.actions.authFetchingSuccess());
  }
};
