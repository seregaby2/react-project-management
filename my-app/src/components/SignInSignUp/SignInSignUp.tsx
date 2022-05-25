import React from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './SignInSignUp.module.scss';

export const SignInSignUp = () => {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem('checkAuthUser');
  const { t } = useTranslation(['homePage']);

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
            {t('buttonGoToMainPage')}
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
            {t('signin')}
          </Button>
          <Button
            variant="text"
            onClick={() => {
              navigate('/signup');
            }}
          >
            {t('signup')}
          </Button>
        </ButtonGroup>
      )}
    </>
  );
};
