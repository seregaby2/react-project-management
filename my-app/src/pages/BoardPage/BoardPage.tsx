import React, { useEffect, useState } from 'react';
import { BoardControls, Column, ColumnModal, TaskModal } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getColumnAsync } from '../../store/actions/columnsActions';
import styles from './BoardPage.module.scss';

export const BoardPage = () => {
  const [createTask, setCreateTask] = useState(false);
  const [createColumn, setCreateColumn] = useState(false);

  const dispatch = useAppDispatch();
  const { columns, error } = useAppSelector((state) => state.reducerColumns);

  // TODO remove!!!!!
  const temporaryBoardID = 'fee6b47e-3196-44bf-86c8-5cf888d9391b';

  useEffect(() => {
    dispatch(getColumnAsync(temporaryBoardID));
  }, []);

  return (
    <main className={styles.boardPage}>
      <h2>Board title</h2>
      <p className={styles.description}>
        Board description Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias inventore
        totam fugiat consectetur? Fugiat, quis! Dolore esse ullam aspernatur repudiandae, nesciunt
        dicta reprehenderit unde maxime facilis veniam itaque molestias excepturi?
      </p>
      <BoardControls
        setCreateTask={setCreateTask}
        setCreateColumn={setCreateColumn}
        columns={columns}
      />
      {createTask && <TaskModal setCreateTask={setCreateTask} />}
      {createColumn && <ColumnModal setCreateColumn={setCreateColumn} />}
      {error && <h3 className={styles.errorMessage}>{error}. Tap to add column.</h3>}
      {columns.length > 0 && (
        <div className={styles.columnsContainer}>
          <>
            {columns.length > 0 &&
              columns.map((column, index) => (
                <Column key={index} id={column.id} title={column.title} />
              ))}
          </>
        </div>
      )}
    </main>
  );
};
