import React from 'react';
import { Router, Header, Footer } from './components';
import { ConfirmError } from './components/ConfirmError/ConfirmError';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { HelpVarSlice } from './store/reducers/helpVarSlice';
import { CreateBoardForm } from './components/CreateBoardForm/CreateBoardForm';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function App() {
  const { errorMessage, successMessage } = useAppSelector((state) => state.reducerHelpVars);
  const { isShowCreateBoardForm } = useAppSelector((state) => state.reducerCreateBoardForm);
  const { t } = useTranslation(['editProfile']);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClickOk = () => {
    dispatch(HelpVarSlice.actions.setErrorMessage(''));
    dispatch(HelpVarSlice.actions.setSuccessMessage(''));
    navigate('/');
  };
  return (
    <>
      {(errorMessage || successMessage) && (
        <ConfirmError text={errorMessage || t('updateUser')} ClickOk={handleClickOk} />
      )}
      <Header />
      <Router />
      <Footer />
      {isShowCreateBoardForm && <CreateBoardForm />}
    </>
  );
}

export default App;
