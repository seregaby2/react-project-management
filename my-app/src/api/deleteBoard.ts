import axios, { AxiosError } from 'axios';
import { AppDispatch } from '../store/store';
import { boardsActions } from '../store/reducers/boardsSlice';
import { IBoard } from '../interfaces/IBoard';
import { HelpVarSlice } from '../store/reducers/helpVarSlice';
import { BASE_URL } from '../constants/api';
import { getTokenFromLS } from '../utils';

export const deleteBoard = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(boardsActions.boardsFetchStart());
    const TOKEN = getTokenFromLS();
    await axios.delete<IBoard>(`${BASE_URL}/boards/${id}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
  } catch (e) {
    const err = e as AxiosError;
    dispatch(HelpVarSlice.actions.setErrorMessage(`${err.message}. ${err.response?.statusText}.`));
    dispatch(boardsActions.boardsFetchError());
  }
};
