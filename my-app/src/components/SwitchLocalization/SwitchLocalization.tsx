import * as React from 'react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

import styles from './SwitchLocalization.module.scss';
import { useState } from 'react';

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 #00230b33',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  //'& .MuiSwitch-track': {
  //  borderRadius: 16 / 2,
  //  opacity: 1,
  //  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
  //  boxSizing: 'border-box',
  //},
}));

export const SwitchLocalization = () => {
  const [isEnglishLanguage, setIsEnglishLanguage] = useState(true);
  const { t } = useTranslation(['header']);

  React.useEffect(() => {
    if (localStorage.getItem('i18nextLng') === 'ru') {
      setIsEnglishLanguage(false);
    } else {
      setIsEnglishLanguage(true);
    }
  }, [isEnglishLanguage]);

  const handleChangeLanguage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      i18next.changeLanguage('en');
      setIsEnglishLanguage(true);
    } else {
      i18next.changeLanguage('ru');
      setIsEnglishLanguage(false);
    }
  };

  return (
    <div className={styles.switch}>
      <p>{t('rus')}</p>
      <AntSwitch
        checked={isEnglishLanguage}
        inputProps={{ 'aria-label': 'ant design' }}
        onChange={handleChangeLanguage}
      />
      <p>{t('en')}</p>
    </div>
  );
};
