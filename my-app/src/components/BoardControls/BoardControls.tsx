import React from 'react';
import { IColumnRequest } from '../../interfaces/interfaceColumns';
import styles from './BoardControls.module.scss';

interface IBoardControl {
  setCreateColumn: (value: boolean) => void;
  columns: IColumnRequest[];
}

export const BoardControls = ({ setCreateColumn }: IBoardControl) => {
  const handleAddColumn = () => {
    setCreateColumn(true);
  };

  return (
    <div className={styles.boardControls}>
      <button className={styles.button} onClick={handleAddColumn}>
        add column
      </button>
    </div>
  );
};
