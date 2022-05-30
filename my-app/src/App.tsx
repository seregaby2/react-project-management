import React from 'react';
import { Router, Header, Footer } from './components';
import { ConfirmError } from './components/ConfirmError/ConfirmError';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { HelpVarSlice } from './store/reducers/helpVarSlice';
import { CreateBoardForm } from './components/CreateBoardForm/CreateBoardForm';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ERROR } from './constants';

function App() {
  const { errorMessage, successMessage } = useAppSelector((state) => state.reducerHelpVars);
  const { isShowCreateBoardForm } = useAppSelector((state) => state.reducerCreateBoardForm);
  const { t } = useTranslation(['editProfile']);
  const { t: tSignIn } = useTranslation(['signin']);
  const { t: tSignUp } = useTranslation(['signup']);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClickOk = () => {
    dispatch(HelpVarSlice.actions.setErrorMessage(''));
    dispatch(HelpVarSlice.actions.setSuccessMessage(''));
    if (errorMessage !== ERROR[403]) navigate('/');
  };

  return (
    <>
      {(errorMessage || successMessage) && (
        <ConfirmError
          text={
            errorMessage === ERROR[403]
              ? tSignIn('wrongData')
              : errorMessage === ERROR[401]
              ? tSignIn('unAuthorized')
              : errorMessage === ERROR[409]
              ? tSignUp('userAlreadyExist')
              : errorMessage || t('successUpdateUserMessage')
          }
          ClickOk={handleClickOk}
        />
      )}
      <Header />
      <Router />
      <Footer />
      {isShowCreateBoardForm && <CreateBoardForm />}
    </>
  );
}

export default App;
