import React from 'react';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { NavBar } from '../Navigation/NavBar';
import { useTranslation } from 'react-i18next';
//import logo from '../../assets/img/svg/logo.svg';

export const Header = () => {
  const { t } = useTranslation(['header']);
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/">
          {/*<img src={logo} alt="logo" />*/}
          {t('projectManagement')}
        </Link>
        <NavBar />
      </div>
    </header>
  );
};
