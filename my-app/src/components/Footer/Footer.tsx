import React from 'react';
import styles from './Footer.module.scss';
import rsschool from '../../assets/img/svg/rsschool.svg';
import github from '../../assets/img/svg/github.svg';

const GITHUB_DATA = [
  { nick: 'AlexRatik', link: 'https://github.com/AlexRatik' },
  { nick: 'AndKurt', link: 'https://github.com/AndKurt' },
  { nick: 'seregaby2', link: 'https://github.com/seregaby2' },
];

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <a
          className={styles.logo}
          href="https://rs.school/index.html"
          target="_blank"
          rel="noreferrer noopener"
        >
          <img src={rsschool} alt="rsschool-logo" />
        </a>
        <h6>2022</h6>
        <nav>
          <img src={github} alt="github-logo" />
          <ul>
            {GITHUB_DATA.map((person) => {
              return (
                <li key={person.nick}>
                  <a
                    className={styles.logo}
                    href={person.link}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {person.nick}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </footer>
  );
};
