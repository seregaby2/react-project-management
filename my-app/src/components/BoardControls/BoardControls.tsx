import React from 'react';
import { useTranslation } from 'react-i18next';
import { IColumnRequest } from '../../interfaces/interfaceColumns';
import styles from './BoardControls.module.scss';

interface IBoardControl {
  setCreateColumn: (value: boolean) => void;
  columns: IColumnRequest[];
}

export const BoardControls = ({ setCreateColumn }: IBoardControl) => {
  const { t } = useTranslation(['boardPage']);
  const handleAddColumn = () => {
    setCreateColumn(true);
  };

  return (
    <div className={styles.boardControls}>
      <button className={styles.button} onClick={handleAddColumn}>
        {t('addColumn')}
      </button>
    </div>
  );
};
