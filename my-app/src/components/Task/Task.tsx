import React, { useState } from 'react';
import styles from './Task.module.scss';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import clsx from 'clsx';
import { useAppDispatch } from '../../hooks/redux';
import { deleteTaskAsync, updateTaskAsync } from '../../store/actions/tasksActions';
import useOnclickOutside from 'react-cool-onclickoutside';

interface ITask {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  taskId: string;
}

export const Task = ({ title, description, userId, order, boardId, columnId, taskId }: ITask) => {
  const dispatch = useAppDispatch();
  const [isEditTask, setIsEditTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskDescription, setTaskDescription] = useState(description);

  const handlerEditTask = () => {
    setIsEditTask(true);
  };

  const closeOutside = useOnclickOutside(() => {
    setIsEditTask(false);
  });

  const handleAcceptEditing = () => {
    const dataToUpdateTask = {
      title: taskTitle,
      order: order,
      description: taskDescription,
      userId: userId,
      boardId: boardId,
      columnId: columnId,
      taskId: taskId,
    };
    setIsEditTask(false);
    dispatch(updateTaskAsync(dataToUpdateTask));
  };

  const handlerDeleteTask = () => {
    const dataToDelete = {
      boardId: boardId,
      columnId: columnId,
      taskId: taskId,
    };
    dispatch(deleteTaskAsync(dataToDelete));
  };

  return (
    <div ref={closeOutside} className={styles.taskContainer} id={userId}>
      {!isEditTask && (
        <>
          <h5>{title}</h5>
          <p>{description}</p>
          <EditIcon onClick={handlerEditTask} className={clsx(styles.editBtn, styles.button)} />
        </>
      )}

      {isEditTask && (
        <>
          <input
            type="text"
            autoFocus
            defaultValue={title}
            className={styles.editTitle}
            onChange={(e) => {
              setTaskTitle(e.target.value);
            }}
          />
          <textarea
            className={styles.editDescription}
            defaultValue={description}
            onChange={(e) => {
              setTaskDescription(e.target.value);
            }}
          />
          <DoneIcon className={clsx(styles.editBtn, styles.button)} onClick={handleAcceptEditing} />
        </>
      )}
      <HighlightOffIcon
        onClick={handlerDeleteTask}
        className={clsx(styles.deleteBtn, styles.button)}
      />
    </div>
  );
};
