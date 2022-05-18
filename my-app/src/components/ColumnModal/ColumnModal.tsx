import React from 'react';
import clsx from 'clsx';
import useOnclickOutside from 'react-cool-onclickoutside';
import { useForm } from 'react-hook-form';
import styles from './ColumnModal.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addColumnAsync } from '../../store/actions/columnsActions';

interface IColumn {
  setCreateColumn: (value: boolean) => void;
  boardId: string;
}

interface IFormColumn {
  title: string;
}

export const ColumnModal = ({ setCreateColumn, boardId }: IColumn) => {
  const dispatch = useAppDispatch();
  const { columns } = useAppSelector((state) => state.reducerColumns);
  let lastOrder: number;
  if (columns.length > 0) {
    lastOrder = [...columns].sort((a, b) => a.order - b.order)[columns.length - 1].order + 1;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormColumn>({
    defaultValues: {
      title: '',
    },
  });

  const closeRef = useOnclickOutside(() => {
    setCreateColumn(false);
  });

  const handleCancelColumn = () => {
    setCreateColumn(false);
  };

  const handleCreateColumn = (data: IFormColumn) => {
    setCreateColumn(false);

    const dataToAddColumn = {
      boardId: boardId,
      data: {
        title: data.title,
        order: columns.length === 0 ? 0 : lastOrder,
      },
    };
    dispatch(addColumnAsync(dataToAddColumn));
  };

  return (
    <div className={styles.columnBackground}>
      <form
        ref={closeRef}
        className={styles.columnContainer}
        onSubmit={handleSubmit(handleCreateColumn)}
      >
        <label htmlFor="columnTitleModal">Column title</label>
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
          id="columnTitleModal"
          autoComplete="off"
          autoFocus
        />
        {errors.title && <p className={styles.error}>{errors.title.message}</p>}
        <div className={styles.controls}>
          <button className={styles.button} type="submit">
            create
          </button>
          <button
            className={clsx(styles.button, styles.cancel)}
            onClick={handleCancelColumn}
            type="button"
          >
            cancel
          </button>
        </div>
      </form>
    </div>
  );
};
