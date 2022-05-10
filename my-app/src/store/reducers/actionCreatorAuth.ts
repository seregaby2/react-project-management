import axios from 'axios';
import { ISignInForm } from '../../components/interface';
import { AppDispatch } from '../store';
import { SingupSlice } from './authSlice';

const baseUrl = 'https://young-hamlet-94914.herokuapp.com';

export const fetchDataAuth = (dataAuth: ISignInForm) => async (dispatch: AppDispatch) => {
  try {
    dispatch(SingupSlice.actions.authFetching());

    await axios.post<ISignInForm>(`${baseUrl}/signup`, {
      name: dataAuth.name,
      login: dataAuth.login,
      password: dataAuth.password,
    });
    dispatch(SingupSlice.actions.authFetchingSuccess());
  } catch (e) {
    if (e instanceof Error) dispatch(SingupSlice.actions.authFetchingError(e.message));
  }
};
