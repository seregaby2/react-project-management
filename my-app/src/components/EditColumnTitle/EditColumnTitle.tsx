import React, { MouseEvent } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import clsx from 'clsx';
import styles from './EditColumnTitle.module.scss';
//import useOnclickOutside from 'react-cool-onclickoutside';

interface IEditColumnTitle {
  titleText: string;
  handleAcceptChangingTitle: (event: MouseEvent<SVGSVGElement>) => void;
  handleSetTitleText: (title: string) => void;
  handleCancelChangingTitle: () => void;
  id: string;
}

export const EditColumnTitle = ({
  titleText,
  handleAcceptChangingTitle,
  handleCancelChangingTitle,
  handleSetTitleText,
  id,
}: IEditColumnTitle) => {
  //const closeEdit = useOnclickOutside(() => {
  //  handleCancelChangingTitle();
  //});

  return (
    //<div ref={closeEdit} className={styles.editTitleContainer}>
    <div className={styles.editTitleContainer}>
      <DoneIcon
        id={id}
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
