import React from 'react';
import { Router, Header, Footer } from './components';
import { ConfirmError } from './components/ConfirmError/ConfirmError';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { HelpVarSlice } from './store/reducers/helpVarSlice';
import { CreateBoardForm } from './components/CreateBoardForm/CreateBoardForm';

function App() {
  const { isBackEndErrors, errorMessage } = useAppSelector((state) => state.reducerHelpVars);
  const { isShowCreateBoardForm } = useAppSelector((state) => state.reducerCreateBoardForm);

  const dispatch = useAppDispatch();

  const handleClickOk = () => {
    dispatch(HelpVarSlice.actions.setIsBackEndErrors(false));
  };
  return (
    <>
      {isBackEndErrors && <ConfirmError text={errorMessage} ClickOk={handleClickOk} />}
      <Header />
      <Router />
      <Footer />
      {isShowCreateBoardForm && <CreateBoardForm />}
    </>
  );
}

export default App;
