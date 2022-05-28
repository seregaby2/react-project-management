import axios from 'axios';
import { ISignInForm, ISingUp } from '../interfaces/interfaceAuth';
import { AppDispatch } from '../store/store';
import { SingupSlice } from '../store/reducers/authSlice';
import { fetchDataLogin } from './actionSignin';
import { HelpVarSlice } from '../store/reducers/helpVarSlice';
import { CreateTextBackEndError } from '../utils/treatmentErrors';
import { BASE_URL } from '../constants/api';

export const fetchDataAuth = (dataAuth: ISignInForm) => async (dispatch: AppDispatch) => {
  try {
    dispatch(SingupSlice.actions.authFetching());

    await axios.post<ISingUp>(`${BASE_URL}/signup`, {
      name: dataAuth.name,
      login: dataAuth.login,
      password: dataAuth.password,
    });
    dispatch(SingupSlice.actions.authFetchingSuccess());
    await dispatch(fetchDataLogin(dataAuth));
  } catch (e) {
    if (e instanceof Error) {
      dispatch(SingupSlice.actions.authFetchingError(e.message));
      dispatch(CreateTextBackEndError(e.message));
      dispatch(HelpVarSlice.actions.setIsBackEndErrors(true));
    }
  }
};
