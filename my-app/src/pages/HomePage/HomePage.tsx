import React, { useEffect } from 'react';
import { AboutUs, SignInSignUp } from '../../components';
import { useTranslation } from 'react-i18next';

import styles from './HomePage.module.scss';
import { useAppDispatch } from '../../hooks/redux';
import { fetchGetUsers } from '../../api/actionGetUsers';

export function HomePage() {
  const { t } = useTranslation(['homePage']);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGetUsers());
  }, []);

  return (
    <main className={styles.homePage}>
      <SignInSignUp />
      <h1>{t('projectManagement')}</h1>
      <section className={styles.projectDescription}>{t('descriptionProject')}</section>
      <AboutUs />
      <section>
        {`${t('decriptionUnderDeveloper')}  `}
        <a href="https://rollingscopes.com/" target="_blank" rel="noreferrer noopener">
          Rolling Scopes School
        </a>
        <br />
        {`${t('course')}`}
      </section>
    </main>
  );
}
