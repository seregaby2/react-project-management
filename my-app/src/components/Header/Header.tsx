import React from 'react';
import styles from './Header.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Button, ButtonGroup } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { isLoggedSlice } from '../../store/reducers/isLoggedSlice';
import { SwitchLocalization } from '..';
//import logo from '../../assets/img/svg/logo.svg';

export const Header = () => {
  const navigate = useNavigate();
  const { isLogged } = useAppSelector((state) => state.reducerIsLogged);
  const { setIsLogged } = isLoggedSlice.actions;
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    // Запрос к бэку на разлогирование
    dispatch(setIsLogged(false));
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/">
          {/*<img src={logo} alt="logo" />*/}
          Project management
        </Link>
        <ButtonGroup className={styles.navigation} variant="text" aria-label="text button group">
          {isLogged && (
            <Button variant="text" color="success">
              Create new board
            </Button>
          )}
          {isLogged && (
            <Button
              variant="text"
              color="success"
              onClick={() => {
                navigate('/profile');
              }}
            >
              edit profile
            </Button>
          )}
          {isLogged && (
            <Button variant="text" color="error" onClick={handleSignOut}>
              sign out
            </Button>
          )}
          <Button>
            <SwitchLocalization />
          </Button>
        </ButtonGroup>
      </div>
    </header>
  );
};
