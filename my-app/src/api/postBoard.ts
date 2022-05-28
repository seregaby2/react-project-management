import axios from 'axios';
import { AppDispatch } from '../store/store';
import { boardsActions } from '../store/reducers/boardsSlice';
import { IBoard } from '../interfaces/IBoard';
import { CreateTextBackEndError } from '../utils/treatmentErrors';
import { HelpVarSlice } from '../store/reducers/helpVarSlice';

const baseUrl = 'https://vast-harbor-78608.herokuapp.com/boards';

export const postBoard = (title: string, description: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(boardsActions.boardsFetchStart());
    const token = localStorage.getItem('token') || '';
    const response = await axios.post<IBoard>(
      baseUrl,
      { title, description },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch(boardsActions.boardPostSuccess(response.data));
  } catch (e) {
    if (e instanceof Error) {
      dispatch(boardsActions.boardsFetchError(e.message));
      dispatch(CreateTextBackEndError(e.message));
      dispatch(HelpVarSlice.actions.setIsBackEndErrors(true));
    }
  }
};
