import React from 'react';
import { Button } from '@mui/material';
import styles from './ConfirmalModal.module.scss';

interface IMyProps {
  text: string;
  ClickYes(): void;
  ClickNo(): void;
}

export const ConfirmalModal = (props: IMyProps) => {
  return (
    <div className={styles.wrapperOverlay}>
      <div className={styles.wrapperConfirmalModal}>
        <div className={styles.text}>{props.text}</div>
        <div className={styles.wrapperButton}>
          <Button variant="contained" color="success" size="large" onClick={props.ClickYes}>
            Yes
          </Button>
          <Button variant="contained" color="error" size="large" onClick={props.ClickNo}>
            No
          </Button>
        </div>
      </div>
    </div>
  );
};
