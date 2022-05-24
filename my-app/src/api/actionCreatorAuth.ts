import axios from 'axios';
import { ISignInForm, ISingUp } from '../interfaces/interfaceAuth';
import { AppDispatch } from '../store/store';
import { SingupSlice } from '../store/reducers/authSlice';
import { fetchDataLogin } from './actionSignin';
import { HelpVarSlice } from '../store/reducers/helpVarSlice';
import { CreateTextBackEndError } from '../utils/treatmentErrors';

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
    await dispatch(fetchDataLogin(dataAuth));
  } catch (e) {
    if (e instanceof Error) {
      dispatch(SingupSlice.actions.authFetchingError(e.message));
      dispatch(CreateTextBackEndError(e.message));
      dispatch(HelpVarSlice.actions.setIsBackEndErrors(true));
    }
  }
};
