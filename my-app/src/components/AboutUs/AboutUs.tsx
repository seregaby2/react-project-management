import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './AboutUs.module.scss';
import alex_photo from '../../assets/img/photo/alex_photo.jpg';
import andrey_photo from '../../assets/img/photo/andrey_photo.png';
import sergey_photo from '../../assets/img/photo/sergey_photo.jpg';

const MEMBERS = [
  {
    nameEn: 'Alexandr Ratkevich ',
    nameRu: 'Александр Раткевич',
    github: 'https://github.com/AlexRatik',
    photo: alex_photo,
    descriptionEn: 'Frontend developer',
    descriptionRu: 'фронтенд-разработчик',
  },
  {
    nameEn: 'Andrei Kurtsiankou',
    nameRu: 'Андрей Куртенков',
    github: 'https://github.com/AndKurt',
    photo: andrey_photo,
    descriptionEn: 'Frontend developer',
    descriptionRu: 'фронтенд-разработчик',
  },
  {
    nameEn: 'Sergey Kruptsov',
    nameRu: 'Сергей Крупцов',
    github: 'https://github.com/seregaby2',
    photo: sergey_photo,
    descriptionEn: 'Frontend developer',
    descriptionRu: 'фронтенд-разработчик',
  },
];

export const AboutUs = () => {
  const { t } = useTranslation(['homePage']);
  const language = localStorage.getItem('i18nextLng');

  return (
    <section className={styles.aboutUs}>
      <h2>{t('developmentTeam')}</h2>
      <div className={styles.container}>
        {MEMBERS.map((member) => {
          return (
            <a
              className={styles.item}
              key={member.nameEn}
              href={member.github}
              target="_blank"
              rel="noreferrer noopener"
            >
              {language === 'ru' ? member.nameRu : member.nameEn}
              <div className={styles.photo}>
                <img src={member.photo} alt={member.nameEn} />
              </div>
              <p>{language === 'ru' ? member.descriptionRu : member.descriptionEn}</p>
            </a>
          );
        })}
      </div>
    </section>
  );
};
