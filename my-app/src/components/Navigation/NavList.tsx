import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SwitchLocalization } from '..';

interface INavList {
  handleisOpenMenu?: () => void;
}

export const NavList = ({ handleisOpenMenu }: INavList) => {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem('checkAuthUser');

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
      {isAuth && <li onClick={handleToCreateNewBoard}>Create new board</li>}
      {isAuth && <li onClick={handleToProfile}>Edit profile</li>}
      <li>
        <SwitchLocalization />
      </li>
      {isAuth && <li onClick={handleSignOut}>Sign out</li>}
    </ul>
  );
};
