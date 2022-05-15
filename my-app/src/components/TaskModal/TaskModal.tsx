import clsx from 'clsx';
import React from 'react';
import useOnclickOutside from 'react-cool-onclickoutside';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createTaskAsync, ICreateTaskAsync } from '../../store/actions/tasksActions';
import { getUserIdFromLS } from '../../utils';
import styles from './TaskModal.module.scss';

interface ITaskModal {
  setCreateTask: (value: boolean) => void;
}

interface IFormTask {
  title: string;
  description: string;
}

export const TaskModal = ({ setCreateTask }: ITaskModal) => {
  const dispatch = useAppDispatch();
  const { activeColumnId } = useAppSelector((state) => state.reducerTasks);

  // TODO remove!!!!!
  const temporaryBoardID = 'fee6b47e-3196-44bf-86c8-5cf888d9391b';

  const handleCancelTask = () => {
    setCreateTask(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormTask>({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const closeRef = useOnclickOutside(() => {
    setCreateTask(false);
  });

  const onSubmit = (data: IFormTask) => {
    setCreateTask(false);
    const dataToCreateTask: ICreateTaskAsync = {
      boardId: temporaryBoardID,
      columnId: activeColumnId,
      data: {
        title: data.title,
        description: data.description,
        order: 1,
        userId: getUserIdFromLS(),
      },
    };
    dispatch(createTaskAsync(dataToCreateTask));
  };

  return (
    <div className={styles.taskBackground}>
      <form ref={closeRef} className={styles.taskContainer} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="taskTitle">Task title</label>
        <input
          {...register('title', {
            required: 'This field is require to fill',
            minLength: {
              value: 2,
              message: 'Min length is 2',
            },
            maxLength: {
              value: 30,
              message: 'Max length is 30',
            },
          })}
          type="text"
          id="taskTitle"
          autoComplete="off"
          autoFocus
        />
        {errors && <p className={styles.error}>{errors.title?.message}</p>}
        <label htmlFor="taskDescription">Task description</label>
        <textarea
          {...register('description', {
            required: 'This field is require to fill',
            minLength: {
              value: 2,
              message: 'Min length is 2',
            },
            maxLength: {
              value: 200,
              message: 'Max length is 200',
            },
          })}
          className={styles.inputDescription}
          id="taskDescription"
        />
        {errors && <p className={styles.error}>{errors.description?.message}</p>}
        <div className={styles.controls}>
          <button className={styles.button} type="submit">
            create
          </button>
          <button
            className={clsx(styles.button, styles.cancel)}
            onClick={handleCancelTask}
            type="button"
          >
            cancel
          </button>
        </div>
      </form>
    </div>
  );
};
