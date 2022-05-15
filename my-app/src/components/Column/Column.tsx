import React, { useEffect, useState } from 'react';
import { Task } from '..';
import styles from './Column.module.scss';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { EditColumnTitle } from '../EditColumnTitle/EditColumnTitle';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { deleteColumnAsync, updateColumTitleAsync } from '../../store/actions/columnsActions';
import { IColumnRequest } from '../../interfaces/interfaceColumns';

interface IColumn {
  id: string;
  title: string;
  setCreateTask: (value: boolean) => void;
}

const testTasks = [
  {
    userId: 'asda',
    order: 1,
    title: 'sdfffffffffffsdfsdfsfdfs',
    description: 'lorem5sdfsdfsdf lorem5sdfsdfsdf lorem5sdfsdfsdf',
  },
  {
    userId: 'asdaa',
    order: 2,
    title: 'sdfffffffffffsdfsdfsfdfs',
    description: 'lorem5sdfsdfsdf lorem5sdfsdfsdf lorem5sdfsdfsdf',
  },
  {
    userId: 'asssdafa',
    order: 3,
    title: 'sdfffffffffffsdfsdfsfdfs',
    description: 'lorem5sdfsdfsdf lorem5sdfsdfsdf lorem5sdfsdfsdf',
  },
  {
    userId: 'aaaddfasddfaa',
    order: 4,
    title: 'sdfffffffffffsdfsdfsfdfs',
    description:
      'lorem5sdfsdfsdf lorem5sdfsdfsdfzxczxczxczxczxczxczxvzxvzvzxvzxvzxvzxv lorem5sdfsdfsdf',
  },
  {
    userId: 'asfssdafa',
    order: 5,
    title: 'sdfffffffffffsdfsdfsfdfs',
    description: 'lorem5sdfsdfsdf lorem5sdfsdfsdf lorem5sdfsdfsdf',
  },
  {
    userId: 'aaaddfaasdaa',
    order: 6,
    title: 'sdfffffffffffsdfsdfsfdfs',
    description:
      'lorem5sdfsdfsdf lorem5sdfsdfsdfzxczxczxczxczxczxczxvzxvzvzxvzxvzxvzxv lorem5sdfsdfsdf',
  },
  {
    userId: 'asssddaaa',
    order: 7,
    title: 'sdfffffffffffsdfsdfsfdfs',
    description: 'lorem5sdfsdfsdf lorem5sdfsdfsdf lorem5sdfsdfsdf',
  },
  {
    userId: 'aaaddfsdavsa',
    order: 8,
    title: 'sdfffffffffffsdfsdfsfdfs',
    description:
      'lorem5sdfsdfsdf lorem5sdfsdfsdfzxczxczxczxczxczxczxvzxvzvzxvzxvzxvzxv lorem5sdfsdfsdf',
  },
];

export const Column = ({ id, title, setCreateTask }: IColumn) => {
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [titleText, setTitleText] = useState(title);
  const dispatch = useAppDispatch();
  const { columns, column } = useAppSelector((store) => store.reducerColumns);

  // TODO remove!!!!!
  const temporaryBoardID = 'fee6b47e-3196-44bf-86c8-5cf888d9391b';

  //const handleIsEditTitle = () => {
  //  setIsEditTitle(true);
  //};

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

  useEffect(() => {
    //Получить список карточек
  }, []);

  //const handleAddTask = () => {
  //  setCreateTask(true);
  //};

  return (
    <div className={styles.column} id={id}>
      <div className={styles.buttonContainer}>
        <button
          className={styles.addTask}
          onClick={() => {
            setCreateTask(true);
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
      {testTasks &&
        testTasks.map((task) => {
          return (
            <Task
              key={task.order}
              title={task.title}
              description={task.description}
              userId={task.userId}
            />
          );
        })}
    </div>
  );
};
