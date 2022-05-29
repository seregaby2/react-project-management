import axios, { AxiosError } from 'axios';
import { AppDispatch } from '../store/store';
import { boardsActions } from '../store/reducers/boardsSlice';
import { IBoard } from '../interfaces/IBoard';
import { HelpVarSlice } from '../store/reducers/helpVarSlice';
import { BASE_URL } from '../constants/api';
import { getTokenFromLS } from '../utils';

export const getBoards = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(boardsActions.boardsFetchStart());
    const TOKEN = getTokenFromLS();
    const response = await axios.get<IBoard[]>(`${BASE_URL}/boards`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    dispatch(boardsActions.boardsFetchSuccess(response.data));
  } catch (e) {
    const err = e as AxiosError;
    dispatch(HelpVarSlice.actions.setErrorMessage(`${err.message}. ${err.response?.statusText}.`));
    dispatch(boardsActions.boardsFetchError());
  }
};
