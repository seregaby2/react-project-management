import React, { useState } from 'react';
import styles from './MainPage.module.scss';
import { useAppSelector } from '../../hooks/redux';
import { Board } from '../../components';
import { CreateBoardForm } from '../../components/CreateBoardForm/CreateBoardForm';

export const MainPage = () => {
  const { boards } = useAppSelector((state) => state.reducerBoards);
  const [showCreateBoardForm, setShowCreateBoardForm] = useState<boolean>(false);
  return (
    <main className={styles.mainPage}>
      <div className={styles.containerForInputAndButton}>
        <input type="text" />
        <button onClick={() => setShowCreateBoardForm(true)}>Create board</button>
      </div>
      {showCreateBoardForm && (
        <CreateBoardForm hideCreateBoardForm={() => setShowCreateBoardForm(false)} />
      )}
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
