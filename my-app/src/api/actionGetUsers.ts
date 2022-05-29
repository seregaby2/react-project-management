import axios from 'axios';
import { BASE_URL } from '../constants/api';
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
  } catch (e) {
    if (e instanceof Error) {
      localStorage.removeItem('checkAuthUser');
    }
  } finally {
    dispatch(SingupSlice.actions.getUserFetchingSuccess());
  }
};
