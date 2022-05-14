import React from 'react';
import styles from './Column.module.scss';

interface IColumn {
  id: string;
  title: string;
}

//получить массив карточек

export const Column = ({ id, title }: IColumn) => {
  return (
    <div id={id} className={styles.column}>
      <h4 className={styles.title}>Title task {title}</h4>
      {/* map*/}
      {/*{<Card />}*/}
    </div>
  );
};
