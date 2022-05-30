import React, { useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import clsx from 'clsx';
import styles from './EditBoard.module.scss';
import { TextField } from '@mui/material';
import { useAppDispatch } from '../../../hooks/redux';
import { putBoard } from '../../../api/putBoard';
import { useTranslation } from 'react-i18next';

interface IEditBoard {
  titleText: string;
  descriptionText: string;
  hideEditBox: () => void;
  id: string;
}

export const EditBoard = ({ titleText, descriptionText, hideEditBox, id }: IEditBoard) => {
  const { t } = useTranslation(['editBoard']);

  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<string>(titleText);
  const [description, setDescription] = useState<string>(descriptionText);
  const acceptHandler = () => {
    dispatch(putBoard(id, title, description));
    hideEditBox();
  };
  return (
    <div className={styles.editTitleContainer} onClick={(e) => e.preventDefault()}>
      <div className={styles.controls}>
        <div>
          <DoneIcon
            id={id}
            className={clsx(styles.buttons, styles.doneBtn)}
            onClick={acceptHandler}
          />
        </div>
        <div>
          <DoDisturbIcon className={clsx(styles.buttons, styles.cancelBtn)} onClick={hideEditBox} />
        </div>
      </div>
      <TextField
        variant="standard"
        type="text"
        autoFocus
        defaultValue={title}
        label={t('title')}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <TextField
        variant="standard"
        type="text"
        label={t('description')}
        defaultValue={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
    </div>
  );
};
