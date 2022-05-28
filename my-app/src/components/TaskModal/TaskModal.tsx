import clsx from 'clsx';
import React from 'react';
import useOnclickOutside from 'react-cool-onclickoutside';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createTaskAsync, ICreateTaskAsync } from '../../store/actions/tasksActions';
import { tasksSlice } from '../../store/reducers/tasksSlice';
import { getUserIdFromLS } from '../../utils';
import styles from './TaskModal.module.scss';

interface ITaskModal {
  setCreateTask: (value: boolean) => void;
  boardId: string;
}

interface IFormTask {
  title: string;
  description: string;
}

export const TaskModal = ({ setCreateTask, boardId }: ITaskModal) => {
  const dispatch = useAppDispatch();
  const { activeTaskColumnId } = useAppSelector((state) => state.reducerTasks);
  const { setActiveColumnId } = tasksSlice.actions;
  const { t } = useTranslation(['taskModal']);

  const handleCancelTask = () => {
    setCreateTask(false);
    dispatch(setActiveColumnId(''));
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

  const handleCreateTask = (data: IFormTask) => {
    setCreateTask(false);
    const dataToCreateTask: ICreateTaskAsync = {
      boardId: boardId,
      columnId: activeTaskColumnId,
      data: {
        title: data.title,
        description: data.description,
        userId: getUserIdFromLS(),
      },
    };
    dispatch(createTaskAsync(dataToCreateTask));
  };

  return (
    <div className={styles.taskBackground}>
      <form
        ref={closeRef}
        className={styles.taskContainer}
        onSubmit={handleSubmit(handleCreateTask)}
      >
        <label htmlFor="taskTitle">{t('taskTitle')}</label>
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
        <label htmlFor="taskDescription">{t('taskDescription')}</label>
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
            {t('create')}
          </button>
          <button
            className={clsx(styles.button, styles.cancel)}
            onClick={handleCancelTask}
            type="button"
          >
            {t('cancel')}
          </button>
        </div>
      </form>
    </div>
  );
};
