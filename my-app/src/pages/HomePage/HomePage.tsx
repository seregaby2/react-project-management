import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import styles from './HomePage.module.scss';

export function HomePage() {
  return (
    <main className={styles.homePage}>
      <Link to="/login">
        <Button variant="text">sign up</Button>
      </Link>
      <Button variant="text">log in</Button>
    </main>
  );
}
