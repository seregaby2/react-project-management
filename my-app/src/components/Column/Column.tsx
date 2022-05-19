import React, { useEffect, useState } from 'react';
import { Task } from '..';
import styles from './Column.module.scss';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { EditColumnTitle } from '../EditColumnTitle/EditColumnTitle';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { deleteColumnAsync, updateColumAsync } from '../../store/actions/columnsActions';
import { IColumnRequest } from '../../interfaces/interfaceColumns';
import { getAllTasksAsync } from '../../store/actions/tasksActions';
import { tasksSlice } from '../../store/reducers/tasksSlice';
import { Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

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
  const { columns, column } = useAppSelector((store) => store.reducerColumns);
  const { tasks } = useAppSelector((state) => state.reducerTasks);
  const { getActiveColumnId } = tasksSlice.actions;

  const parsedTasks = [...tasks];

  useEffect(() => {
    const dataToGetTasks = {
      boardId: boardId,
      columnId: columnId,
    };
    dispatch(getAllTasksAsync(dataToGetTasks));
  }, [dispatch, columnId, boardId]);

  const handleDeleteColumn = () => {
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
          <div className={styles.buttonContainer}>
            <button
              className={styles.addTask}
              onClick={() => {
                setCreateTask(true);
                dispatch(getActiveColumnId(columnId));
              }}
            >
              add task
            </button>
            <HighlightOffIcon
              id={columnId}
              onClick={handleDeleteColumn}
              className={styles.deleteBtn}
            />
          </div>
          {isEditTitle && (
            <EditColumnTitle
              id={columnId}
              titleText={column ? column.title : title}
              handleAcceptChangingTitle={handleAcceptChangingTitle}
              handleCancelChangingTitle={handleCancelChangingTitle}
              handleSetTitleText={handleSetTitleText}
            />
          )}
          {!isEditTitle && (
            <h4
              className={styles.title}
              onClick={() => {
                setIsEditTitle(true);
              }}
            >
              {title}
            </h4>
          )}
          {parsedTasks &&
            parsedTasks
              //.sort((a, b) => a.order - b.order)
              .filter((task) => task.columnId === columnId)
              .map((task) => {
                return (
                  <Task
                    boardId={task.boardId}
                    columnId={task.columnId}
                    taskId={task.id}
                    key={uuidv4()}
                    title={task.title}
                    description={task.description}
                    userId={task.userId}
                    order={task.order}
                  />
                );
              })}
        </div>
      )}
    </Draggable>
  );
};
