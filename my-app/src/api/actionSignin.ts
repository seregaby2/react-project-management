import axios from 'axios';
import { IResolveToken, ISignInForm, Itoken } from '../interfaces/interfaceAuth';
import { AppDispatch } from '../store/store';
import { SingupSlice } from '../store/reducers/authSlice';
import { fetchGetUser } from '../api/actionGetUser';
import jwtDecode from 'jwt-decode';
import { HelpVarSlice } from '../store/reducers/helpVarSlice';
import { CreateTextBackEndError } from '../utils/treatmentErrors';

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
    localStorage.setItem('checkAuthUser', 'user autorizated');

    await dispatch(fetchGetUser(decoded.userId));
  } catch (e) {
    if (e instanceof Error) {
      dispatch(SingupSlice.actions.loginFetchingError(e.message));
      dispatch(CreateTextBackEndError(e.message));
      dispatch(HelpVarSlice.actions.setIsBackEndErrors(true));
      localStorage.clear();
    }
  }
};
