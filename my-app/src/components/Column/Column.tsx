import React, { useEffect, useState } from 'react';
import { Task } from '..';
import styles from './Column.module.scss';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { EditColumnTitle } from '../EditColumnTitle/EditColumnTitle';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { deleteColumnAsync, updateColumTitleAsync } from '../../store/actions/columnsActions';
import { IColumnRequest } from '../../interfaces/interfaceColumns';
import { getAllTasksAsync } from '../../store/actions/tasksActions';
import { tasksSlice } from '../../store/reducers/tasksSlice';

interface IColumn {
  columnId: string;
  title: string;
  setCreateTask: (value: boolean) => void;
}

export const Column = ({ columnId: id, title, setCreateTask }: IColumn) => {
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [titleText, setTitleText] = useState(title);
  const dispatch = useAppDispatch();
  const { columns, column } = useAppSelector((store) => store.reducerColumns);
  const { tasks } = useAppSelector((state) => state.reducerTasks);
  const { getActiveColumnId } = tasksSlice.actions;

  const parsedTasks = [...tasks];

  // TODO remove!!!!!
  const temporaryBoardID = 'fee6b47e-3196-44bf-86c8-5cf888d9391b';

  useEffect(() => {
    const dataToGetTasks = {
      boardId: temporaryBoardID,
      columnId: id,
    };
    dispatch(getAllTasksAsync(dataToGetTasks));
  }, [dispatch, id]);

  const handleDeleteColumn = () => {
    const deleteDataColumn = {
      boardId: temporaryBoardID,
      columnId: id,
    };

    dispatch(deleteColumnAsync(deleteDataColumn));
  };

  const handleAcceptChangingTitle = () => {
    const columnData = { ...columns.find((column) => column.id === id) };
    if (columnData) {
      columnData.title = titleText;
    }

    const dataToUpdateColumn = {
      boardId: temporaryBoardID,
      data: columnData as IColumnRequest,
    };

    dispatch(updateColumTitleAsync(dataToUpdateColumn));
    setIsEditTitle(false);
  };

  const handleCancelChangingTitle = () => {
    setIsEditTitle(false);
  };

  const handleSetTitleText = (text: string) => {
    setTitleText(text);
  };

  return (
    <div className={styles.column} id={id}>
      <div className={styles.buttonContainer}>
        <button
          className={styles.addTask}
          onClick={() => {
            setCreateTask(true);
            dispatch(getActiveColumnId(id));
          }}
        >
          add task
        </button>
        <HighlightOffIcon id={id} onClick={handleDeleteColumn} className={styles.deleteBtn} />
      </div>
      {isEditTitle && (
        <EditColumnTitle
          id={id}
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
          .sort((a, b) => a.order - b.order)
          .filter((task) => task.columnId === id)
          .map((task) => {
            return (
              <Task
                boardId={task.boardId}
                columnId={task.columnId}
                taskId={task.id}
                key={`${task.title}${task.description}`}
                title={task.title}
                description={task.description}
                userId={task.userId}
              />
            );
          })}
    </div>
  );
};
