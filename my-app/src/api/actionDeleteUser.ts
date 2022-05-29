import axios, { AxiosError } from 'axios';
import { AppDispatch } from '../store/store';
import { SingupSlice } from '../store/reducers/authSlice';
import { ISingUp } from '../interfaces/interfaceAuth';
import { HelpVarSlice } from '../store/reducers/helpVarSlice';
import { BASE_URL } from '../constants/api';
import { getTokenFromLS } from '../utils';

export const fetchDeleteUser = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(SingupSlice.actions.authFetching());
    const TOKEN = getTokenFromLS();

    const dataUser: ISingUp = JSON.parse(localStorage.getItem('dataUser') || '');

    await axios.delete(`${BASE_URL}/users/${dataUser.id}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    localStorage.clear();
  } catch (e) {
    const err = e as AxiosError;
    dispatch(HelpVarSlice.actions.setErrorMessage(`${err.message}. ${err.response?.statusText}.`));
  } finally {
    dispatch(SingupSlice.actions.deleteUserFetchingSuccess());
  }
};
