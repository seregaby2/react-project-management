import React from 'react';
import styles from './ConfirmModal.module.scss';
import { IConfirmModalProps } from './IConfirmModalProps';

export const ConfirmModal = (props: IConfirmModalProps) => {
  return (
    <div className={styles.confirmModal}>
      <p>Are you sure?</p>
      <button>YES!</button>
      <button>NO(</button>
    </div>
  );
};
