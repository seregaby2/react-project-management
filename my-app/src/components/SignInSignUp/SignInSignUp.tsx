import React from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './SignInSignUp.module.scss';
import { ButtonToMain } from '..';
import { useAppSelector } from '../../hooks/redux';

export const SignInSignUp = () => {
  const { isTokenActive } = useAppSelector((state) => state.reducerSingupRequest);
  const navigate = useNavigate();
  const { t } = useTranslation(['homePage']);

  return (
    <>
      {isTokenActive ? (
        <ButtonToMain />
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
