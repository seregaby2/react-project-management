import React from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import styles from './CreateBoardForm.module.scss';
import { ICreateBoardForm } from './ICreateBoardForm';
import { useAppDispatch } from '../../hooks/redux';
import { postBoard } from '../../api/postBoard';
import { actionsCreateBoardForm } from '../../store/reducers/createBoardFormSlice';
import { useTranslation } from 'react-i18next';

export const CreateBoardForm = () => {
  const { t } = useTranslation(['createBoardForm']);

  const dispatch = useAppDispatch();
  const { handleSubmit, control } = useForm<ICreateBoardForm>();
  const onSubmit: SubmitHandler<ICreateBoardForm> = (data) => {
    dispatch(postBoard(data.title, data.description));
    dispatch(actionsCreateBoardForm.hideCreateBoardForm());
  };
  return (
    <div
      className={styles.createBoardFormOverlay}
      onClick={() => dispatch(actionsCreateBoardForm.hideCreateBoardForm())}
    >
      <form
        className={styles.createBoardForm}
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => e.stopPropagation()}
      >
        <h3>{t('fill out these fields')}</h3>
        <Controller
          control={control}
          name="title"
          rules={{ required: true, min: 2 }}
          render={({ field }) => (
            <TextField
              autoFocus
              value={field.value || ''}
              label={t('title')}
              size="small"
              onChange={(e) => field.onChange(e)}
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          rules={{ required: true, min: 2 }}
          render={({ field }) => (
            <TextField
              value={field.value || ''}
              label={t('description')}
              size="medium"
              onChange={(e) => field.onChange(e)}
            />
          )}
        />
        <Button type="submit">{t('create board')}</Button>
      </form>
    </div>
  );
};
