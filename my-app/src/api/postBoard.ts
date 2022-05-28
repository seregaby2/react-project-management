import axios from 'axios';
import { AppDispatch } from '../store/store';
import { boardsActions } from '../store/reducers/boardsSlice';
import { IBoard } from '../interfaces/IBoard';
import { CreateTextBackEndError } from '../utils/treatmentErrors';
import { HelpVarSlice } from '../store/reducers/helpVarSlice';
import { BASE_URL, TOKEN } from '../constants/api';

export const postBoard = (title: string, description: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(boardsActions.boardsFetchStart());
    const response = await axios.post<IBoard>(
      `${BASE_URL}/boards`,
      { title, description },
      {
        headers: { Authorization: `Bearer ${TOKEN}` },
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
