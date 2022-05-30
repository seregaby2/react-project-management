import axios, { AxiosError } from 'axios';
import { BASE_URL } from '../constants';
import { ISingUp } from '../interfaces/interfaceAuth';
import { SingupSlice } from '../store/reducers/authSlice';
import { HelpVarSlice } from '../store/reducers/helpVarSlice';
import { AppDispatch } from '../store/store';
import { getTokenFromLS } from '../utils';

export const fetchGetUser = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(SingupSlice.actions.authFetching());
    const TOKEN = getTokenFromLS();
    const response = await axios.get<ISingUp>(`${BASE_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    localStorage.setItem('dataUser', JSON.stringify(response.data));
  } catch (e) {
    const err = e as AxiosError;
    if (e instanceof Error) {
      dispatch(SingupSlice.actions.setTokenStatus(false));
      localStorage.clear();
    }
    dispatch(HelpVarSlice.actions.setErrorMessage(`${err.message}. ${err.response?.statusText}.`));
  } finally {
    dispatch(SingupSlice.actions.getUserFetchingSuccess());
  }
};
