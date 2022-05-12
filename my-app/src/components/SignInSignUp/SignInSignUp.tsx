import React from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import styles from './SignInSignUp.module.scss';

export const SignInSignUp = () => {
  const navigate = useNavigate();
  const { isAuth } = useAppSelector((state) => state.reducerSingupRequest);

  return (
    <>
      {isAuth ? (
        <nav className={styles.navigation}>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              navigate('/main');
            }}
          >
            go to main page
          </Button>
        </nav>
      ) : (
        <ButtonGroup className={styles.navigation} variant="text" aria-label="text button group">
          <Button
            variant="text"
            color="success"
            onClick={() => {
              navigate('/login');
            }}
          >
            sign in
          </Button>
          <Button
            variant="text"
            onClick={() => {
              navigate('/signup');
            }}
          >
            sign up
          </Button>
        </ButtonGroup>
      )}
    </>
  );
};
