import React from 'react';
import styles from './MainPage.module.scss';
import { useAppSelector } from '../../hooks/redux';
import { Board } from '../../components';

export const MainPage = () => {
  const { boards } = useAppSelector((state) => state.reducerBoards);
  return (
    <main className={styles.mainPage}>
      <div className={styles.containerForInputAndButton}>
        <input type="text" />
        <button>Create board</button>
      </div>
      <ul>
        {boards.map((board) => (
          <li key={board.id}>
            <Board id={board.id} title={board.title} description={board.description} />
          </li>
        ))}
      </ul>
    </main>
  );
};
