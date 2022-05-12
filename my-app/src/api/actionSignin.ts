import axios from 'axios';
import { IResolveToken, ISignInForm, Itoken } from '../interfaces/interfaceAuth';
import { AppDispatch } from '../store/store';
import { SingupSlice } from '../store/reducers/authSlice';
import jwtDecode from 'jwt-decode';

const baseUrl = 'https://young-hamlet-94914.herokuapp.com';

export const fetchDataLogin = (dataAuth: ISignInForm) => async (dispatch: AppDispatch) => {
  try {
    dispatch(SingupSlice.actions.authFetching());

    const response = await axios.post<Itoken>(`${baseUrl}/signin`, {
      login: dataAuth.login,
      password: dataAuth.password,
    });

    dispatch(SingupSlice.actions.loginFetchingSuccess());

    const decoded = jwtDecode<IResolveToken>(response.data.token);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('id', decoded.userId);
    localStorage.setItem('checkAuthUser', 'user autorizated');
  } catch (e) {
    if (e instanceof Error) dispatch(SingupSlice.actions.loginFetchingError(e.message));
    localStorage.clear();
  }
};
