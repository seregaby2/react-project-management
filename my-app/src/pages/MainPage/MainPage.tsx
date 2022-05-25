import React, { useEffect, useState } from 'react';
import styles from './MainPage.module.scss';
import { Board } from '../../components';
import { CreateBoardForm } from '../../components/CreateBoardForm/CreateBoardForm';
import MainFilter from '../../components/MainFilter/MainFilter';
import { useTranslation } from 'react-i18next';
import { Button, LinearProgress, Typography } from '@mui/material';
import { IBoard } from '../../interfaces/IBoard';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getBoards } from '../../api/getBoardsAction';

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.reducerBoards);
  const [visibleBoards, setVisibleBoards] = useState<IBoard[]>([]);
  const [showCreateBoardForm, setShowCreateBoardForm] = useState<boolean>(false);
  const { t } = useTranslation(['mainPage']);

  useEffect(() => {
    dispatch(getBoards());
  }, []);
  return (
    <main className={styles.mainPage}>
      <div className={styles.containerForInputAndButton}>
        <MainFilter inputHandler={(boards: IBoard[]) => setVisibleBoards(boards)} />
        <Button className={styles.createBoardBtn} onClick={() => setShowCreateBoardForm(true)}>
          {t('createBoard')}
        </Button>
      </div>
      {showCreateBoardForm && (
        <CreateBoardForm hideCreateBoardForm={() => setShowCreateBoardForm(false)} />
      )}
      {isLoading ? (
        <LinearProgress style={{ marginTop: '2vh' }} />
      ) : (
        <ul>
          {visibleBoards.length !== 0 ? (
            visibleBoards.map((board) => (
              <li key={board.id}>
                <Board id={board.id} title={board.title} />
              </li>
            ))
          ) : (
            <Typography variant="h2" component="div">
              {t('noBoards')}
            </Typography>
          )}
        </ul>
      )}
    </main>
  );
};
