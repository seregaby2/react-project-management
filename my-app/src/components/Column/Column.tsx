import React, { useEffect, useState } from 'react';
import { EditColumnTitle, Task } from '..';
import styles from './Column.module.scss';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { deleteColumnAsync, updateColumAsync } from '../../store/actions/columnsActions';
import { IColumnRequest } from '../../interfaces/interfaceColumns';
import { getAllTasksAsync } from '../../store/actions/tasksActions';
import { tasksSlice } from '../../store/reducers/tasksSlice';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { ConfirmModal } from '../ConfirmModal/ConfirmModal';
import { useTranslation } from 'react-i18next';
import { columnsSlice } from '../../store/reducers/columnsSlice';

interface IColumn {
  columnId: string;
  title: string;
  setCreateTask: (value: boolean) => void;
  boardId: string;
  index: number;
}

export const Column = ({ columnId, title, setCreateTask, boardId, index }: IColumn) => {
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [titleText, setTitleText] = useState(title);
  const dispatch = useAppDispatch();
  const { columns } = useAppSelector((store) => store.reducerColumns);
  const { tasks } = useAppSelector((state) => state.reducerTasks);
  const { getActiveColumnId } = tasksSlice.actions;
  const [isDeleteColumnModal, setIsDeleteColumnModal] = useState(false);
  const { t } = useTranslation(['confirmModal']);
  const { t: addTaskTranslate } = useTranslation(['boardPage']);
  const { updateColumState } = columnsSlice.actions;

  useEffect(() => {
    const dataToGetTasks = {
      boardId: boardId,
      columnId: columnId,
    };
    dispatch(getAllTasksAsync(dataToGetTasks));
  }, []);

  const handleDeleteColumn = () => {
    setIsDeleteColumnModal(false);
    const deleteDataColumn = {
      boardId: boardId,
      columnId: columnId,
    };
    dispatch(deleteColumnAsync(deleteDataColumn));
  };

  const handleAcceptChangingTitle = () => {
    const columnData = { ...columns.find((column) => column.id === columnId) };
    if (columnData) {
      columnData.title = titleText;
    }

    const dataToUpdateColumn = {
      boardId: boardId,
      data: columnData as IColumnRequest,
    };
    dispatch(updateColumState(dataToUpdateColumn));
    dispatch(updateColumAsync(dataToUpdateColumn));
    setIsEditTitle(false);
  };

  const handleCancelChangingTitle = () => {
    setIsEditTitle(false);
  };

  const handleSetTitleText = (text: string) => {
    setTitleText(text);
  };

  return (
    <Draggable draggableId={columnId} index={index}>
      {(provided) => (
        <div
          className={styles.column}
          id={columnId}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={columnId} type="task">
            {(provided, snapshot) => (
              <div
                className={styles.columnHelper}
                ref={provided.innerRef}
                {...provided.droppableProps}
                data-is-dragging={snapshot.isDraggingOver}
              >
                <div className={styles.buttonContainer}>
                  <button
                    className={styles.addTask}
                    onClick={() => {
                      setCreateTask(true);
                      dispatch(getActiveColumnId(columnId));
                    }}
                  >
                    {addTaskTranslate('addTask')}
                  </button>
                  <HighlightOffIcon
                    id={columnId}
                    onClick={() => setIsDeleteColumnModal(true)}
                    className={styles.deleteBtn}
                  />
                  {isDeleteColumnModal && (
                    <ConfirmModal
                      text={t('deleteColumn')}
                      onNo={() => setIsDeleteColumnModal(false)}
                      onYes={handleDeleteColumn}
                    />
                  )}
                </div>
                {isEditTitle && (
                  <EditColumnTitle
                    id={columnId}
                    titleText={title}
                    handleAcceptChangingTitle={handleAcceptChangingTitle}
                    handleCancelChangingTitle={handleCancelChangingTitle}
                    handleSetTitleText={handleSetTitleText}
                  />
                )}
                {!isEditTitle && (
                  <h4 className={styles.title} onClick={() => setIsEditTitle(true)}>
                    {title}
                  </h4>
                )}
                {tasks &&
                  [...tasks]
                    .sort((a, b) => (a.order as number) - (b.order as number))
                    .filter((task) => task.columnId === columnId)
                    .map((task, index) => {
                      return (
                        <Task
                          key={`${task.id}-${index}`}
                          index={index}
                          boardId={task.boardId}
                          columnId={task.columnId}
                          taskId={task.id}
                          title={task.title}
                          description={task.description}
                          userId={task.userId}
                          order={task.order as number}
                        />
                      );
                    })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};
