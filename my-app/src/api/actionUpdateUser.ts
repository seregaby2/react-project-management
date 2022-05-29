import axios, { AxiosError } from 'axios';
import { ISignInForm, ISingUp } from '../interfaces/interfaceAuth';
import { AppDispatch } from '../store/store';
import { SingupSlice } from '../store/reducers/authSlice';
import { HelpVarSlice } from '../store/reducers/helpVarSlice';
import { fetchDataLogin } from './actionSignin';
import { BASE_URL } from '../constants/api';
import { getTokenFromLS } from '../utils';

export const fetchUpdateUser = (dataUpdateUser: ISignInForm) => async (dispatch: AppDispatch) => {
  try {
    dispatch(SingupSlice.actions.authFetching());
    const TOKEN = getTokenFromLS();
    const id: string = JSON.parse(localStorage.getItem('dataUser') || '').id;
    await axios.put<ISingUp>(
      `${BASE_URL}/users/${id}`,
      {
        name: dataUpdateUser.name,
        login: dataUpdateUser.login,
        password: dataUpdateUser.password,
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
    await dispatch(fetchDataLogin(dataUpdateUser));
    dispatch(HelpVarSlice.actions.setSuccessMessage('user update'));
  } catch (e) {
    const err = e as AxiosError;
    dispatch(HelpVarSlice.actions.setErrorMessage(`${err.message}. ${err.response?.statusText}.`));
  } finally {
    dispatch(SingupSlice.actions.updateUserFetchingSuccess());
  }
};
