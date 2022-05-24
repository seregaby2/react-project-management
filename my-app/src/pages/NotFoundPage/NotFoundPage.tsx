import React from 'react';
import styles from './NotFoundPage.module.scss';
import notFoundImg from '../../assets/img/not_found.png';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  const { t } = useTranslation(['notFoundPage']);

  return (
    <main className={styles.notFoundPage}>
      <p>{t('wrong')}</p>
      <img src={notFoundImg} alt="not_found" />
      <p>
        {t('notFound')} <Link to="/">{t('home')}</Link>
      </p>
    </main>
  );
}
