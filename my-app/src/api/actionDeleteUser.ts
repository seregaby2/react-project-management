/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { AppDispatch } from '../store/store';
import { SingupSlice } from '../store/reducers/authSlice';
import { ISingUp } from '../interfaces/interfaceAuth';
import { HelpVarSlice } from '../store/reducers/helpVarSlice';
import { CreateTextBackEndError } from '../utils/treatmentErrors';

const baseUrl = 'https://young-hamlet-94914.herokuapp.com';

export const fetchDeleteUser = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(SingupSlice.actions.authFetching());

    const dataUser: ISingUp = JSON.parse(localStorage.getItem('dataUser') || '');
    const token = localStorage.getItem('token') || '';

    await axios.delete(`${baseUrl}/users/${dataUser.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(SingupSlice.actions.deleteUserFetchingSuccess());
    localStorage.clear();
  } catch (e) {
    if (e instanceof Error) {
      console.log(e, 'mess');
      dispatch(CreateTextBackEndError(e.message));
      dispatch(HelpVarSlice.actions.setIsBackEndErrors(true));
    }
  }
};
