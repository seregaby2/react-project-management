import React, { useState } from 'react';
import { BoardControls, Column, ColumnModal, TaskModal } from '../../components';
import styles from './BoardPage.module.scss';

export const BoardPage = () => {
  const [createTask, setCreateTask] = useState(false);
  const [createColumn, setCreateColumn] = useState(false);

  return (
    <main className={styles.boardPage}>
      <h2>Board title</h2>
      <p className={styles.description}>
        Board description Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias inventore
        totam fugiat consectetur? Fugiat, quis! Dolore esse ullam aspernatur repudiandae, nesciunt
        dicta reprehenderit unde maxime facilis veniam itaque molestias excepturi?
      </p>
      <BoardControls setCreateTask={setCreateTask} setCreateColumn={setCreateColumn} />
      {createTask && <TaskModal setCreateTask={setCreateTask} />}
      {createColumn && <ColumnModal setCreateColumn={setCreateColumn} />}
      <section className={styles.columnsContainer}>
        <Column id="test-id" title="test-title" />
      </section>
    </main>
  );
};
