import axios from 'axios';
import { BASE_URL, TOKEN } from '../constants/api';
import { ISingUp } from '../interfaces/interfaceAuth';
import { SingupSlice } from '../store/reducers/authSlice';
import { HelpVarSlice } from '../store/reducers/helpVarSlice';
import { AppDispatch } from '../store/store';
import { CreateTextBackEndError } from '../utils/treatmentErrors';

export const fetchGetUser = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(SingupSlice.actions.authFetching());

    const response = await axios.get<ISingUp>(`${BASE_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    localStorage.setItem('dataUser', JSON.stringify(response.data));
    dispatch(SingupSlice.actions.getUserFetchingSuccess());
  } catch (e) {
    if (e instanceof Error) {
      dispatch(CreateTextBackEndError(e.message));
      dispatch(HelpVarSlice.actions.setIsBackEndErrors(true));
    }
  }
};
