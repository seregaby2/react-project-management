import axios from 'axios';
import { ISignInForm, ISingUp } from '../interfaces/interfaceAuth';
import { AppDispatch } from '../store/store';
import { SingupSlice } from '../store/reducers/authSlice';
import { HelpVarSlice } from '../store/reducers/helpVarSlice';
import { fetchDataLogin } from './actionSignin';
import { CreateTextBackEndError } from '../utils/treatmentErrors';
import { BASE_URL, TOKEN } from '../constants/api';

export const fetchUpdateUser = (dataUpdateUser: ISignInForm) => async (dispatch: AppDispatch) => {
  try {
    dispatch(SingupSlice.actions.authFetching());
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
    dispatch(SingupSlice.actions.updateUserFetchingSuccess());
  } catch (e) {
    if (e instanceof Error) {
      dispatch(CreateTextBackEndError(e.message));
      dispatch(HelpVarSlice.actions.setIsBackEndErrors(true));
    }
  }
};
