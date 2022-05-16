import axios from 'axios';
import { AppDispatch } from '../store/store';
import { boardsActions } from '../store/reducers/boardsSlice';
import { IBoard } from '../interfaces/IBoard';

const baseUrl = 'https://young-hamlet-94914.herokuapp.com/boards';

export const deleteBoard = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(boardsActions.boardsFetchStart());
    const token = localStorage.getItem('token') || '';
    await axios.delete<IBoard>(baseUrl + `/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(boardsActions.boardDeleteSuccess(id));
  } catch (e) {
    dispatch(boardsActions.boardsFetchError('Ooops...Smth went wrong'));
  }
};
