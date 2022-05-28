import React from 'react';
import clsx from 'clsx';
import useOnclickOutside from 'react-cool-onclickoutside';
import { useForm } from 'react-hook-form';
import styles from './ColumnModal.module.scss';
import { useAppDispatch } from '../../hooks/redux';
import { addColumnAsync } from '../../store/actions/columnsActions';
import { useTranslation } from 'react-i18next';

interface IColumn {
  setCreateColumn: (value: boolean) => void;
  boardId: string;
}

interface IFormColumn {
  title: string;
}

export const ColumnModal = ({ setCreateColumn, boardId }: IColumn) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['columnModal']);
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
        <label htmlFor="columnTitleModal">{t('columnTitle')}</label>
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
            {t('create')}
          </button>
          <button
            className={clsx(styles.button, styles.cancel)}
            onClick={handleCancelColumn}
            type="button"
          >
            {t('cancel')}
          </button>
        </div>
      </form>
    </div>
  );
};
