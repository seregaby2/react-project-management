import clsx from 'clsx';
import React, { createRef, FormEvent, RefObject } from 'react';
import useOnclickOutside from 'react-cool-onclickoutside';
import styles from './Task.module.scss';

interface ITask {
  setCreateTask: (value: boolean) => void;
}

export const Task = ({ setCreateTask }: ITask) => {
  const titleRef: RefObject<HTMLInputElement> = createRef();
  const decriptionRef: RefObject<HTMLTextAreaElement> = createRef();

  const handleCancelTask = () => {
    setCreateTask(false);
  };

  const closeRef = useOnclickOutside(() => {
    setCreateTask(false);
  });

  const handleCreateTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCreateTask(false);
    console.log(titleRef.current?.value);
    console.log(decriptionRef.current?.value);
  };

  return (
    <div className={styles.taskBackground}>
      <form ref={closeRef} className={styles.taskContainer} onSubmit={handleCreateTask}>
        <label htmlFor="taskTitle">Title</label>
        <input ref={titleRef} type="text" id="taskTitle" autoComplete="off" autoFocus />
        <label htmlFor="taskDescription">Description</label>
        <textarea ref={decriptionRef} className={styles.inputDescription} id="taskDescription" />
        <div className={styles.controls}>
          <button className={styles.button} type="submit">
            create
          </button>
          <button className={clsx(styles.button, styles.cancel)} onClick={handleCancelTask}>
            cancel
          </button>
        </div>
      </form>
    </div>
  );
};
