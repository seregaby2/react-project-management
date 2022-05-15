import React from 'react';
import { IColumnRequest } from '../../interfaces/interfaceColumns';
import styles from './BoardControls.module.scss';

interface IBoardControl {
  setCreateTask: (value: boolean) => void;
  setCreateColumn: (value: boolean) => void;
  columns: IColumnRequest[];
}

export const BoardControls = ({ setCreateTask, setCreateColumn, columns }: IBoardControl) => {
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
      {columns.length > 0 && (
        <button className={styles.button} onClick={handleAddTask}>
          add task
        </button>
      )}
    </div>
  );
};
