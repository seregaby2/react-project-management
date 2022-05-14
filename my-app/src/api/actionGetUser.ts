import axios from 'axios';
import { ISingUp } from '../interfaces/interfaceAuth';
import { SingupSlice } from '../store/reducers/authSlice';
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
  } catch (e) {
    if (e instanceof Error) dispatch(SingupSlice.actions.getUserFetchingError(e.message));
  }
};
