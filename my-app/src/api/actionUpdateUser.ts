import axios from 'axios';
import { ISignInForm, ISingUp } from '../interfaces/interfaceAuth';
import { AppDispatch } from '../store/store';
import { SingupSlice } from '../store/reducers/authSlice';

const baseUrl = 'https://young-hamlet-94914.herokuapp.com';

export const fetchUpdateUser = (dataUpdateUser: ISignInForm) => async (dispatch: AppDispatch) => {
  try {
    dispatch(SingupSlice.actions.authFetching());
    const id = localStorage.getItem('id') || '';
    const token = localStorage.getItem('token') || '';
    await axios.put<ISingUp>(
      `${baseUrl}/users/${id}`,
      {
        name: dataUpdateUser.name,
        login: dataUpdateUser.login,
        password: dataUpdateUser.password,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(SingupSlice.actions.updateUserFetchingSuccess());
  } catch (e) {
    if (e instanceof Error) dispatch(SingupSlice.actions.updateUserFethingError(e.message));
  }
};
