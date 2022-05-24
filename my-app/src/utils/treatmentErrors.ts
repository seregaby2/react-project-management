import { HelpVarSlice } from '../store/reducers//helpVarSlice';
import { AppDispatch } from '../store/store';

const NOT_FOUND = 'Request failed with status code 403';
const CONFLICT = 'Request failed with status code 409';
const AUTHORIZATION = 'Request failed with status code 401';

export const CreateTextBackEndError = (error: string) => (dispatch: AppDispatch) => {
  switch (error) {
    case NOT_FOUND:
      dispatch(HelpVarSlice.actions.setErrorMessage('Data was not founded'));
      break;
    case CONFLICT:
      dispatch(HelpVarSlice.actions.setErrorMessage('Conflict with server'));
      break;
    case AUTHORIZATION:
      dispatch(HelpVarSlice.actions.setErrorMessage('Please, log in'));
      break;
    default:
      dispatch(HelpVarSlice.actions.setErrorMessage('Error'));
  }
};
