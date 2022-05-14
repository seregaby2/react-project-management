import React, { useState } from 'react';
import styles from './MainPage.module.scss';
import { useAppSelector } from '../../hooks/redux';
import { Board } from '../../components';
import { CreateBoardForm } from '../../components/CreateBoardForm/CreateBoardForm';
import MainFilter from '../../components/MainFilter/MainFilter';
import { Button, Typography } from '@mui/material';
import { IBoard } from '../../interfaces/IBoard';

export const MainPage = () => {
  const [visibleBoards, setVisibleBoards] = useState<IBoard[]>([]);
  const [showCreateBoardForm, setShowCreateBoardForm] = useState<boolean>(false);
  return (
    <main className={styles.mainPage}>
      <div className={styles.containerForInputAndButton}>
        <MainFilter inputHandler={(boards: IBoard[]) => setVisibleBoards(boards)} />
        <Button className={styles.createBoardBtn} onClick={() => setShowCreateBoardForm(true)}>
          Create board
        </Button>
      </div>
      {showCreateBoardForm && (
        <CreateBoardForm hideCreateBoardForm={() => setShowCreateBoardForm(false)} />
      )}
      <ul>
        {visibleBoards.length !== 0 ? (
          visibleBoards.map((board) => (
            <li key={board.id}>
              <Board id={board.id} title={board.title} description={board.description} />
            </li>
          ))
        ) : (
          <Typography variant="h2" component="div">
            No boards=(
          </Typography>
        )}
      </ul>
    </main>
  );
};
