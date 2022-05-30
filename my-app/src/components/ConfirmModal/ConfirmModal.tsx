import React from 'react';
import styles from './ConfirmModal.module.scss';
import { IConfirmModalProps } from './IConfirmModalProps';
import { useTranslation } from 'react-i18next';

export const ConfirmModal = (props: IConfirmModalProps) => {
  const { t } = useTranslation(['confirmModal']);

  return (
    <div className={styles.overlay} onClick={props.onNo}>
      <div onClick={(e) => e.stopPropagation()} className={styles.confirmModal}>
        <p>{props.text}</p>
        <div className={styles.confirmModalBtns}>
          <button onClick={props.onNo}>{t('no')}</button>
          <button onClick={props.onYes}>{t('yes')}</button>
        </div>
      </div>
    </div>
  );
};
