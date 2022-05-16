import React from 'react';
import styles from './Task.module.scss';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';
import clsx from 'clsx';
import { useAppDispatch } from '../../hooks/redux';
import { deleteTaskAsync } from '../../store/actions/tasksActions';

interface ITask {
  title: string;
  order?: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  taskId: string;
}

export const Task = ({ title, description, userId, boardId, columnId, taskId }: ITask) => {
  const dispatch = useAppDispatch();

  const handlerEditTask = () => {};

  const handlerDeleteTask = () => {
    const dataToDelete = {
      boardId: boardId,
      columnId: columnId,
      taskId: taskId,
    };
    dispatch(deleteTaskAsync(dataToDelete));
  };

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
