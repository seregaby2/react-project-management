import React from 'react';
import styles from './AboutUs.module.scss';
import alex_photo from '../../assets/img/photo/alex_photo.jpg';
import andrey_photo from '../../assets/img/photo/andrey_photo.png';
import sergey_photo from '../../assets/img/photo/sergey_photo.jpg';

const MEMBERS = [
  {
    name: 'Alexandr Ratkevich ',
    github: 'https://github.com/AlexRatik',
    photo: alex_photo,
    description: 'Frontend developer',
  },
  {
    name: 'Andrei Kurtsiankou',
    github: 'https://github.com/AndKurt',
    photo: andrey_photo,
    description: 'Frontend developer',
  },
  {
    name: 'Sergey Kruptsov',
    github: 'https://github.com/seregaby2',
    photo: sergey_photo,
    description: 'Frontend developer',
  },
];

export const AboutUs = () => {
  return (
    <section className={styles.aboutUs}>
      <h2>Development team</h2>
      <div className={styles.container}>
        {MEMBERS.map((member) => {
          return (
            <a
              className={styles.item}
              key={member.name}
              href={member.github}
              target="_blank"
              rel="noreferrer noopener"
            >
              {member.name}
              <div className={styles.photo}>
                <img src={member.photo} alt={member.name} />
              </div>
              <p>{member.description}</p>
            </a>
          );
        })}
      </div>
    </section>
  );
};
