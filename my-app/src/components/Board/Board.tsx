import React, { useState } from 'react';
import styles from './Board.module.scss';
import { IBoardProps } from './IBoardProps';
import { ConfirmModal } from '../ConfirmModal/ConfirmModal';
import { useAppDispatch } from '../../hooks/redux';
import { deleteBoard } from '../../api/deleteBoard';
import { Link } from 'react-router-dom';

export const Board = ({ title, id }: IBoardProps) => {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  const clickHandler = () => {
    setShowModal(true);
  };
  return (
    <Link to={`/board/${id}`}>
      <div className={styles.board}>
        <p>{title}</p>
        <button onClick={clickHandler}>x</button>
      </div>
      {showModal && (
        <ConfirmModal
          text={'Are you sure you want to delete the board?'}
          name="main"
          id={id}
          onNo={() => {
            setShowModal(false);
          }}
          onYes={() => {
            dispatch(deleteBoard(id));
            setShowModal(false);
          }}
        />
      )}
    </Link>
  );
};
