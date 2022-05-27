import React, { useState } from 'react';
import styles from './Task.module.scss';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import clsx from 'clsx';
import { useAppDispatch } from '../../hooks/redux';
import { deleteTaskAsync, updateTaskAsync } from '../../store/actions/tasksActions';
import useOnclickOutside from 'react-cool-onclickoutside';
import { Draggable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { ConfirmModal } from '../ConfirmModal/ConfirmModal';
import { tasksSlice } from '../../store/reducers/tasksSlice';

interface ITask {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  taskId: string;
  index: number;
}

export const Task = ({
  title,
  description,
  order,
  userId,
  boardId,
  columnId,
  taskId,
  index,
}: ITask) => {
  const dispatch = useAppDispatch();
  const [isEditTask, setIsEditTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskDescription, setTaskDescription] = useState(description);
  const { deleteTaskFromState } = tasksSlice.actions;
  const [isDeleteTaskModal, setIsDeleteTaskModal] = useState(false);
  const { t } = useTranslation(['confirmModal']);
  const { updateTaskDataState } = tasksSlice.actions;

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
      id: taskId,
    };
    setIsEditTask(false);
    dispatch(updateTaskDataState({ task: dataToUpdateTask, columnId: columnId }));
    dispatch(updateTaskAsync(dataToUpdateTask));
  };

  const handleDeleteTask = () => {
    setIsDeleteTaskModal(false);
    const dataToDelete = {
      boardId: boardId,
      columnId: columnId,
      taskId: taskId,
    };
    dispatch(deleteTaskAsync(dataToDelete));
    dispatch(deleteTaskFromState(taskId));
  };

  return (
    <Draggable draggableId={taskId} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          data-is-dragging={snapshot.isDragging}
          id={userId}
        >
          <div ref={closeOutside} className={styles.taskContainer}>
            {!isEditTask && (
              <>
                <h5>{title}</h5>
                <p>{description}</p>
                <EditIcon
                  onClick={handlerEditTask}
                  className={clsx(styles.editBtn, styles.button)}
                />
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
                <DoneIcon
                  className={clsx(styles.editBtn, styles.button)}
                  onClick={handleAcceptEditing}
                />
                <DoDisturbIcon
                  className={clsx(styles.editBtn, clsx(styles.button, styles.cancelBtn))}
                  onClick={() => setIsEditTask(false)}
                />
              </>
            )}
            {!isEditTask && (
              <HighlightOffIcon
                onClick={() => setIsDeleteTaskModal(true)}
                className={clsx(styles.deleteBtn, styles.button)}
              />
            )}
            {isDeleteTaskModal && (
              <ConfirmModal
                text={t('deleteTask')}
                onNo={() => setIsDeleteTaskModal(false)}
                onYes={handleDeleteTask}
              />
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};
