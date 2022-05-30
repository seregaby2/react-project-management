import axios from 'axios';
import { BASE_URL } from '../constants';
import { SingupSlice } from '../store/reducers/authSlice';
import { AppDispatch } from '../store/store';
import { getTokenFromLS } from '../utils';

export const fetchGetUsers = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(SingupSlice.actions.authFetching());
    const TOKEN = getTokenFromLS();
    await axios.get(`${BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    dispatch(SingupSlice.actions.setTokenStatus(true));
    localStorage.setItem('checkAuthUser', 'user autorizated');
  } catch (e) {
    if (e instanceof Error) {
      dispatch(SingupSlice.actions.setTokenStatus(false));
      localStorage.clear();
    }
  } finally {
    dispatch(SingupSlice.actions.getUserFetchingSuccess());
  }
};
