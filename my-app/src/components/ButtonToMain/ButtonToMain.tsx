import React from 'react';
import { Button } from '@mui/material';
import styles from './ButtonToMain.module.scss';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const ButtonToMain = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['homePage']);

  return (
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
  );
};
