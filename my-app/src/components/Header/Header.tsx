import React from 'react';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { NavBar } from '../Navigation/NavBar';
//import logo from '../../assets/img/svg/logo.svg';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/">
          {/*<img src={logo} alt="logo" />*/}
          Project management
        </Link>
        <NavBar />
      </div>
    </header>
  );
};
