import axios from 'axios';
import { ISignInForm, ISingUp } from '../interfaces/interfaceAuth';
import { AppDispatch } from '../store/store';
import { SingupSlice } from '../store/reducers/authSlice';

const baseUrl = 'https://young-hamlet-94914.herokuapp.com';

export const fetchDataAuth = (dataAuth: ISignInForm) => async (dispatch: AppDispatch) => {
  try {
    dispatch(SingupSlice.actions.authFetching());

    await axios.post<ISingUp>(`${baseUrl}/signup`, {
      name: dataAuth.name,
      login: dataAuth.login,
      password: dataAuth.password,
    });
    dispatch(SingupSlice.actions.authFetchingSuccess());
  } catch (e) {
    if (e instanceof Error) dispatch(SingupSlice.actions.authFetchingError(e.message));
  }
};
