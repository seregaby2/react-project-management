import React from 'react';
import styles from './ConfirmModal.module.scss';
import { IConfirmModalProps } from './IConfirmModalProps';

export const ConfirmModal = (props: IConfirmModalProps) => {
  return (
    <div className={styles.overlay} onClick={props.onNo}>
      <div onClick={(e) => e.stopPropagation()} className={styles.confirmModal}>
        <p>Are you sure?</p>
        <div className={styles.confirmModalBtns}>
          <button onClick={props.onNo}>NO(</button>
          <button onClick={props.onYes}>YES!</button>
        </div>
      </div>
    </div>
  );
};
