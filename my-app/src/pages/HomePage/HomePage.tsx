import React from 'react';
import { AboutUs, SignInSignUp } from '../../components';
import { useTranslation } from 'react-i18next';

import styles from './HomePage.module.scss';

export function HomePage() {
  const { t } = useTranslation(['homePage']);

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
