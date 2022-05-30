import React from 'react';
import { MobileNavigation, Navigation } from '..';
import styles from './NavBar.module.scss';

export const NavBar = () => {
  return (
    <div className={styles.navBar}>
      <Navigation />
      <MobileNavigation />
    </div>
  );
};
