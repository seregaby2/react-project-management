import React, { useState } from 'react';
import styles from './Board.module.scss';
import { IBoardProps } from './IBoardProps';
import { ConfirmModal } from '../ConfirmModal/ConfirmModal';

export const Board = ({ title, description, id }: IBoardProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const clickHandler = () => {
    setShowModal(true);
  };
  return (
    <>
      <div className={styles.board}>
        <p>{title}</p>
        <p>{description}</p>
        <button onClick={clickHandler}>x</button>
      </div>
      {showModal && (
        <ConfirmModal
          name="main"
          id={id}
          onClick={() => {
            setShowModal(false);
          }}
        />
      )}
    </>
  );
};
