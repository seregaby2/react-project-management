import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AboutUs, SignInSignUp } from '../../components';
import { useAppSelector } from '../../hooks/redux';
import styles from './HomePage.module.scss';

export function HomePage() {
  const navigate = useNavigate();
  const { isLogged } = useAppSelector((state) => state.reducerIsLogged);

  useEffect(() => {
    if (!isLogged) {
      navigate('/');
    }
  }, [isLogged, navigate]);

  return (
    <main className={styles.homePage}>
      <SignInSignUp />
      <h1>Project management</h1>
      <section className={styles.projectDescription}>
        A handy tool for planning work and dividing tasks. Use it if you want to achieve control
        over processes and improve the efficiency of your teamwork.
      </section>
      <AboutUs />
      <section>
        {`The application was created in accordance with the task of the  `}
        <a href="https://rollingscopes.com/" target="_blank" rel="noreferrer noopener">
          Rolling Scopes School
        </a>
        <br />
        {`Course - React 2022 Q1 (Stage 3)`}
      </section>
    </main>
  );
}
