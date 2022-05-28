import axios from 'axios';
import { AppDispatch } from '../store/store';
import { SingupSlice } from '../store/reducers/authSlice';
import { ISingUp } from '../interfaces/interfaceAuth';
import { HelpVarSlice } from '../store/reducers/helpVarSlice';
import { CreateTextBackEndError } from '../utils/treatmentErrors';
import { BASE_URL, TOKEN } from '../constants/api';

export const fetchDeleteUser = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(SingupSlice.actions.authFetching());

    const dataUser: ISingUp = JSON.parse(localStorage.getItem('dataUser') || '');

    await axios.delete(`${BASE_URL}/users/${dataUser.id}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    dispatch(SingupSlice.actions.deleteUserFetchingSuccess());
    localStorage.clear();
  } catch (e) {
    if (e instanceof Error) {
      dispatch(CreateTextBackEndError(e.message));
      dispatch(HelpVarSlice.actions.setIsBackEndErrors(true));
    }
  }
};
