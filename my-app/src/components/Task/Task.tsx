import React from 'react';
import styles from './Task.module.scss';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';
import clsx from 'clsx';

interface ITask {
  title: string;
  order?: number;
  description: string;
  userId: string;
}

export const Task = ({ title, description, userId }: ITask) => {
  const handlerEditTask = () => {};
  const handlerDeleteTask = () => {};

  return (
    <div className={styles.taskContainer} id={userId}>
      <h5>{title}</h5>
      <p>{description}</p>
      <EditIcon onClick={handlerEditTask} className={clsx(styles.editBtn, styles.button)} />
      <HighlightOffIcon
        onClick={handlerDeleteTask}
        className={clsx(styles.deleteBtn, styles.button)}
      />
    </div>
  );
};
