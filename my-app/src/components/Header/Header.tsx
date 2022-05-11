import React from 'react';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
//import logo from '../../assets/img/svg/logo.svg';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/">
          {/*<img src={logo} alt="logo" />*/}
          Project management
        </Link>
        <nav>
          <Link to="/signup">
            <Button variant="text">sign up</Button>
          </Link>
          <Link to="/login">
            <Button variant="text">log in</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};
