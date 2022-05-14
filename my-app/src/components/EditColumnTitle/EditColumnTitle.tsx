import React from 'react';
import DoneIcon from '@mui/icons-material/Done';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import clsx from 'clsx';
import styles from './EditColumnTitle.module.scss';
import useOnclickOutside from 'react-cool-onclickoutside';

interface IEditColumnTitle {
  titleText: string;
  handleAcceptChangingTitle: () => void;
  handleSetTitleText: (title: string) => void;
  handleCancelChangingTitle: () => void;
}

export const EditColumnTitle = ({
  titleText,
  handleAcceptChangingTitle,
  handleCancelChangingTitle,
  handleSetTitleText,
}: IEditColumnTitle) => {
  const closeEdit = useOnclickOutside(() => {
    handleCancelChangingTitle();
  });

  return (
    <div ref={closeEdit} className={styles.editTitleContainer}>
      <DoneIcon
        className={clsx(styles.buttons, styles.doneBtn)}
        onClick={handleAcceptChangingTitle}
      />
      <DoDisturbIcon
        className={clsx(styles.buttons, styles.cancelBtn)}
        onClick={handleCancelChangingTitle}
      />
      <input
        type="text"
        autoFocus
        defaultValue={titleText}
        className={styles.editTitle}
        onChange={(e) => {
          handleSetTitleText(e.target.value);
        }}
      />
    </div>
  );
};
