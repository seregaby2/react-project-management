import React, { useState } from 'react';
import { Task } from '..';
import styles from './Column.module.scss';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { EditColumnTitle } from '../EditColumnTitle/EditColumnTitle';

interface IColumn {
  id: string;
  title: string;
}

const testTasks = [
  {
    id: 'asda',
    title: 'sdfffffffffffsdfsdfsfdfs',
    description: 'lorem5sdfsdfsdf lorem5sdfsdfsdf lorem5sdfsdfsdf',
  },
  {
    id: 'asdaa',
    title: 'sdfffffffffffsdfsdfsfdfs',
    description: 'lorem5sdfsdfsdf lorem5sdfsdfsdf lorem5sdfsdfsdf',
  },
  {
    id: 'asssdafa',
    title: 'sdfffffffffffsdfsdfsfdfs',
    description: 'lorem5sdfsdfsdf lorem5sdfsdfsdf lorem5sdfsdfsdf',
  },
  {
    id: 'aaaddfasddfaa',
    title: 'sdfffffffffffsdfsdfsfdfs',
    description:
      'lorem5sdfsdfsdf lorem5sdfsdfsdfzxczxczxczxczxczxczxvzxvzvzxvzxvzxvzxv lorem5sdfsdfsdf',
  },
  {
    id: 'asfssdafa',
    title: 'sdfffffffffffsdfsdfsfdfs',
    description: 'lorem5sdfsdfsdf lorem5sdfsdfsdf lorem5sdfsdfsdf',
  },
  {
    id: 'aaaddfaasdaa',
    title: 'sdfffffffffffsdfsdfsfdfs',
    description:
      'lorem5sdfsdfsdf lorem5sdfsdfsdfzxczxczxczxczxczxczxvzxvzvzxvzxvzxvzxv lorem5sdfsdfsdf',
  },
  {
    id: 'asssddaaa',
    title: 'sdfffffffffffsdfsdfsfdfs',
    description: 'lorem5sdfsdfsdf lorem5sdfsdfsdf lorem5sdfsdfsdf',
  },
  {
    id: 'aaaddfsdavsa',
    title: 'sdfffffffffffsdfsdfsfdfs',
    description:
      'lorem5sdfsdfsdf lorem5sdfsdfsdfzxczxczxczxczxczxczxvzxvzvzxvzxvzxvzxv lorem5sdfsdfsdf',
  },
];

//получить массив карточек

export const Column = ({ id, title }: IColumn) => {
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [titleText, setTitleText] = useState(title);

  const handleIsEditTitle = () => {
    setIsEditTitle(true);
  };

  const handleDeleteColumn = () => {};

  const handleAcceptChangingTitle = () => {
    console.log(titleText);
    setIsEditTitle(false);
  };

  const handleCancelChangingTitle = () => {
    setIsEditTitle(false);
  };

  const handleSetTitleText = (text: string) => {
    setTitleText(text);
  };

  return (
    <div id={id} className={styles.column}>
      {isEditTitle && (
        <EditColumnTitle
          titleText={titleText}
          handleAcceptChangingTitle={handleAcceptChangingTitle}
          handleCancelChangingTitle={handleCancelChangingTitle}
          handleSetTitleText={handleSetTitleText}
        />
      )}
      {!isEditTitle && (
        <h4 className={styles.title} onClick={handleIsEditTitle}>
          Title task {titleText}
        </h4>
      )}
      <HighlightOffIcon onClick={handleDeleteColumn} className={styles.deleteBtn} />
      {testTasks &&
        testTasks.map((task) => {
          return <Task key={task.id} title={task.title} description={task.description} />;
        })}
    </div>
  );
};
