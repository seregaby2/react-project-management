import React, { useState } from 'react';
import styles from './Board.module.scss';
import { IBoardProps } from './IBoardProps';
import { ConfirmModal } from '../ConfirmModal/ConfirmModal';

export const Board = ({ title, description, id }: IBoardProps) => {
  const showModal = useState<boolean>(false);
  const clickHandler = () => {};
  return (
    <div className={styles.board}>
      <p>{title}</p>
      <p>{description}</p>
      <button onClick={clickHandler}>x</button>
      {showModal && <ConfirmModal name="main" id={id} />}
    </div>
  );
};
