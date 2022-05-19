import { Button } from '@mui/material';
import React from 'react';

import styles from './ConfirmError.module.scss';

interface MyProps {
  text: string;
  ClickOk(): void;
}

export const ConfirmError = (props: MyProps) => {
  return (
    <div className={styles.wrapperOverlay}>
      <div className={styles.wrapperConfirmalModal}>
        <div className={styles.text}>{props.text}</div>
        <div className={styles.wrapperButton}>
          <Button variant="contained" color="success" size="large" onClick={props.ClickOk}>
            Ok
          </Button>
        </div>
      </div>
    </div>
  );
};
