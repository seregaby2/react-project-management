import React from 'react';
import styles from './BoardControls.module.scss';

interface IBoardControl {
  setCreateTask: (value: boolean) => void;
  setCreateColumn: (value: boolean) => void;
}

export const BoardControls = ({ setCreateTask, setCreateColumn }: IBoardControl) => {
  const handleAddColumn = () => {
    setCreateColumn(true);
  };

  const handleAddTask = () => {
    setCreateTask(true);
  };

  return (
    <div className={styles.boardControls}>
      <button className={styles.button} onClick={handleAddColumn}>
        add column
      </button>
      <button className={styles.button} onClick={handleAddTask}>
        add task
      </button>
    </div>
  );
};
