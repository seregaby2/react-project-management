import React from 'react';
import styles from './NavBar.module.scss';
import { NavList } from './NavList';

export const Navigation = () => {
  return (
    <div className={styles.navigation}>
      <NavList />
    </div>
  );
};
