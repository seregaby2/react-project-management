import axios from 'axios';
import { AppDispatch } from '../store/store';
import { boardsActions } from '../store/reducers/boardsSlice';
import { IBoard } from '../interfaces/IBoard';

const baseUrl = 'https://young-hamlet-94914.herokuapp.com/boards';

export const postBoard = (title: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(boardsActions.boardsFetchStart());
    const token = localStorage.getItem('token') || '';
    const response = await axios.post<IBoard>(
      baseUrl,
      { title },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch(boardsActions.boardPostSuccess(response.data));
  } catch (e) {
    dispatch(boardsActions.boardsFetchError('Ooops...Smth went wrong'));
  }
};
