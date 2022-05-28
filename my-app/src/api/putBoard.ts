import axios from 'axios';
import { AppDispatch } from '../store/store';
import { boardsActions } from '../store/reducers/boardsSlice';
import { IBoard } from '../interfaces/IBoard';
import { CreateTextBackEndError } from '../utils/treatmentErrors';
import { HelpVarSlice } from '../store/reducers/helpVarSlice';

const baseUrl = 'https://vast-harbor-78608.herokuapp.com/boards';

export const putBoard =
  (id: string, title: string, description: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(boardsActions.boardPutStart(id));
      const token = localStorage.getItem('token') || '';
      const response = await axios.put<IBoard>(
        baseUrl + `/${id}`,
        { title, description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(boardsActions.boardPutSuccess(response.data));
    } catch (e) {
      if (e instanceof Error) {
        dispatch(boardsActions.boardsFetchError(e.message));
        dispatch(CreateTextBackEndError(e.message));
        dispatch(HelpVarSlice.actions.setIsBackEndErrors(true));
      }
    }
  };
