import React from 'react';
import styles from './NotFoundPage.module.scss';
import notFoundImg from '../../assets/img/not_found.png';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <main className={styles.notFoundPage}>
      <p>Something went wrong...</p>
      <img src={notFoundImg} alt="not_found" />
      <p>
        This page doesn<span>&#39;</span>t exist. Go to <Link to="/">Home</Link>
      </p>
    </main>
  );
}
