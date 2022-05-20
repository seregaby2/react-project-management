/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { ISingUp } from '../interfaces/interfaceAuth';
import { SingupSlice } from '../store/reducers/authSlice';
import { HelpVarSlice } from '../store/reducers/helpVarSlice';
import { AppDispatch } from '../store/store';

const baseUrl = 'https://young-hamlet-94914.herokuapp.com';

export const fetchGetUser = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(SingupSlice.actions.authFetching());
    const token = localStorage.getItem('token') || '';

    const response = await axios.get<ISingUp>(`${baseUrl}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    localStorage.setItem('dataUser', JSON.stringify(response.data));
    dispatch(SingupSlice.actions.getUserFetchingSuccess());
  } catch (e: any) {
    dispatch(SingupSlice.actions.getUserFetchingError(e.message));
    dispatch(HelpVarSlice.actions.setErrorMessage(e.response.data.message || ''));
    dispatch(HelpVarSlice.actions.setIsBackEndErrors(true));
  }
};
