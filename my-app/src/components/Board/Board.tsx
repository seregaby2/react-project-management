import React, { useState } from 'react';
import styles from './Board.module.scss';
import { IBoardProps } from './IBoardProps';
import { ConfirmModal } from '../ConfirmModal/ConfirmModal';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { deleteBoard } from '../../api/deleteBoard';
import { Link } from 'react-router-dom';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { EditBoard } from './EditBoard/EditBoard';
import { LinearProgress } from '@mui/material';
import clsx from 'clsx';

export const Board = ({ description, title, id }: IBoardProps) => {
  const dispatch = useAppDispatch();
  const { puttingBoardID } = useAppSelector((state) => state.reducerBoards);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showEditBox, setShowEditBox] = useState<boolean>(false);
  const { t } = useTranslation(['confirmModal']);
  const deleteHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowModal(true);
  };
  const editHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowEditBox(true);
  };

  const transformText = (text: string): string => {
    const textArr = text.split(' ');
    const resultText = textArr.reduce((prev, current) => {
      if (current.length > 10) {
        return `${prev} ${current.slice(0, 8)}...`;
      }
      return `${prev} ${current}`;
    }, '');
    if (resultText.length > 15) {
      return resultText.slice(0, 13) + '...';
    }
    return resultText;
  };
  return (
    <>
      <Link to={`/board/${id}`}>
        <div className={clsx(styles.board, puttingBoardID === id ? styles.putting : '')}>
          <div className={styles.boardTextContainer}>
            <p className={styles.boardTitle}>{transformText(title)}</p>
            <p className={styles.boardDescription}>{transformText(description)}</p>
          </div>
          <span onClick={(e) => editHandler(e)}>
            <ModeEditOutlineOutlinedIcon fontSize="small" />
          </span>
          <button onClick={(e) => deleteHandler(e)}>x</button>
          {showEditBox && (
            <EditBoard
              id={id}
              titleText={title}
              descriptionText={description}
              hideEditBox={() => setShowEditBox(false)}
            />
          )}
        </div>
        {puttingBoardID === id && (
          <div className={styles.loaderWrapper}>
            <LinearProgress />
          </div>
        )}
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
