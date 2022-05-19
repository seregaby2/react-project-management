import React from 'react';
import { Router, Header, Footer } from './components';
import { ConfirmError } from './components/ConfirmError/ConfirmError';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { HelpVarSlice } from './store/reducers/helpVarSlice';

function App() {
  const { isBackEndErrors, errorMessage } = useAppSelector((state) => state.reducerHelpVars);

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
    </>
  );
}

export default App;
