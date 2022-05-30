import axios, { AxiosError } from 'axios';
import { AppDispatch } from '../store/store';
import { boardsActions } from '../store/reducers/boardsSlice';
import { IBoard } from '../interfaces/IBoard';
import { HelpVarSlice } from '../store/reducers/helpVarSlice';
import { BASE_URL } from '../constants';
import { getTokenFromLS } from '../utils';

export const putBoard =
  (id: string, title: string, description: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(boardsActions.boardPutStart(id));
      const TOKEN = getTokenFromLS();
      const response = await axios.put<IBoard>(
        `${BASE_URL}/boards/${id}`,
        { title, description },
        {
          headers: { Authorization: `Bearer ${TOKEN}` },
        }
      );
      dispatch(boardsActions.boardPutSuccess(response.data));
    } catch (e) {
      const err = e as AxiosError;
      dispatch(
        HelpVarSlice.actions.setErrorMessage(`${err.message}. ${err.response?.statusText}.`)
      );
      dispatch(boardsActions.boardsFetchError());
    }
  };
