import React from 'react';
import styles from './ConfirmModal.module.scss';
import { IConfirmModalProps } from './IConfirmModalProps';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { boardsActions } from '../../store/reducers/boardsSlice';

export const ConfirmModal = (props: IConfirmModalProps) => {
  const dispatch = useAppDispatch();
  const deleteBoard = () => {
    dispatch(boardsActions.deleteBoard(props.id));
    props.onClick();
  };
  return (
    <div className={styles.overlay} onClick={props.onClick}>
      <div onClick={(e) => e.stopPropagation()} className={styles.confirmModal}>
        <p>Are you sure?</p>
        <div className={styles.confirmModalBtns}>
          <button onClick={props.onClick}>NO(</button>
          <button onClick={deleteBoard}>YES!</button>
        </div>
      </div>
    </div>
  );
};
