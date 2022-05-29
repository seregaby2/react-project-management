import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SwitchLocalization } from '..';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { actionsCreateBoardForm } from '../../store/reducers/createBoardFormSlice';
import { SingupSlice } from '../../store/reducers/authSlice';

interface INavList {
  handleisOpenMenu?: () => void;
}

export const NavList = ({ handleisOpenMenu }: INavList) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isTokenActive } = useAppSelector((state) => state.reducerSingupRequest);
  const { t } = useTranslation(['header']);

  const handleToCreateNewBoard = () => {
    if (handleisOpenMenu) {
      handleisOpenMenu();
    }
    dispatch(actionsCreateBoardForm.showCreateBoardForm());
  };

  const handleToProfile = () => {
    navigate('/profile');
    if (handleisOpenMenu) {
      handleisOpenMenu();
    }
  };

  const handleSignOut = () => {
    dispatch(SingupSlice.actions.setTokenStatus(false));
    localStorage.clear();
    navigate('/');
    if (handleisOpenMenu) {
      handleisOpenMenu();
    }
  };

  return (
    <ul>
      {isTokenActive && <li onClick={handleToCreateNewBoard}>{t('createNewBoard')}</li>}
      {isTokenActive && <li onClick={handleToProfile}>{t('editProfile')}</li>}
      <li>
        <SwitchLocalization />
      </li>
      {isTokenActive && <li onClick={handleSignOut}>{t('singOut')}</li>}
    </ul>
  );
};
