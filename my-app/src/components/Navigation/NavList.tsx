import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SwitchLocalization } from '..';

interface INavList {
  handleisOpenMenu?: () => void;
}

export const NavList = ({ handleisOpenMenu }: INavList) => {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem('checkAuthUser');
  const { t } = useTranslation(['header']);

  const handleToCreateNewBoard = () => {
    if (handleisOpenMenu) {
      handleisOpenMenu();
    }
  };

  const handleToProfile = () => {
    navigate('/profile');
    if (handleisOpenMenu) {
      handleisOpenMenu();
    }
  };

  const handleSignOut = () => {
    localStorage.clear();
    navigate('/');
    if (handleisOpenMenu) {
      handleisOpenMenu();
    }
  };

  return (
    <ul>
      {isAuth && <li onClick={handleToCreateNewBoard}>{t('createNewBoard')}</li>}
      {isAuth && <li onClick={handleToProfile}>{t('editProfile')}</li>}
      <li>
        <SwitchLocalization />
      </li>
      {isAuth && <li onClick={handleSignOut}>{t('singOut')}</li>}
    </ul>
  );
};
