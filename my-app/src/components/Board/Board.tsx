import React, { useState } from 'react';
import styles from './Board.module.scss';
import { IBoardProps } from './IBoardProps';
import { ConfirmModal } from '../ConfirmModal/ConfirmModal';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../hooks/redux';
import { deleteBoard } from '../../api/deleteBoard';
import { Link } from 'react-router-dom';

export const Board = ({ title, id }: IBoardProps) => {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  const { t } = useTranslation(['confirmModal']);
  const clickHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  const transformTitle = (title: string): string => {
    const titleArr = title.split(' ');
    return titleArr.reduce((prev, current) => {
      if (current.length > 10) {
        return `${prev} ${current.slice(0, 8)}...`;
      }
      return `${prev} ${current}`;
    }, '');
  };
  return (
    <>
      <Link to={`/board/${id}`}>
        <div className={styles.board}>
          <p>{transformTitle(title)}</p>
          <button onClick={(e) => clickHandler(e)}>x</button>
        </div>
      </Link>
      {showModal && (
        <ConfirmModal
          text={t('deleteBoard')}
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
    </>
  );
};
