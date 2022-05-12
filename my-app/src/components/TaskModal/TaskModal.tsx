import clsx from 'clsx';
import React from 'react';
import useOnclickOutside from 'react-cool-onclickoutside';
import { useForm } from 'react-hook-form';
import styles from './TaskModal.module.scss';

interface ITask {
  setCreateTask: (value: boolean) => void;
}

interface IFormTask {
  title: string;
  description: string;
}

export const TaskModal = ({ setCreateTask }: ITask) => {
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
    console.log(data.title);
    console.log(data.description);
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
