import React, { useState } from 'react';
import { NavList } from '..';
import styles from './NavBar.module.scss';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import clsx from 'clsx';

export const MobileNavigation = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleisOpenMenu = () => {
    setIsOpenMenu((prev) => !prev);
  };

  const menuIconOpen = <MenuIcon className={styles.menuIcon} onClick={handleisOpenMenu} />;
  const menuIconClose = <CloseIcon className={styles.menuIcon} onClick={handleisOpenMenu} />;

  return (
    <>
      <div className={styles.menuIcon}>{!isOpenMenu ? menuIconOpen : menuIconClose}</div>
      <nav className={clsx(styles.mobileNavigation, isOpenMenu && styles.active)}>
        {<NavList handleisOpenMenu={handleisOpenMenu} />}
      </nav>
    </>
  );
};
