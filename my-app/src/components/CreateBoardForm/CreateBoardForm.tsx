import React from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { Button, TextField, Typography } from '@mui/material';
import styles from './CreateBoardForm.module.scss';
import { ICreateBoardForm, ICreateBoardFormProps } from './ICreateBoardForm';
import { useAppDispatch } from '../../hooks/redux';
import { postBoard } from '../../api/postBoard';

export const CreateBoardForm = ({ hideCreateBoardForm }: ICreateBoardFormProps) => {
  const dispatch = useAppDispatch();
  const { handleSubmit, control } = useForm<ICreateBoardForm>();
  const onSubmit: SubmitHandler<ICreateBoardForm> = (data) => {
    dispatch(postBoard(data.title));
    hideCreateBoardForm();
  };
  return (
    <div className={styles.createBoardFormOverlay} onClick={hideCreateBoardForm}>
      <form
        className={styles.createBoardForm}
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Fill out these field, please=)</h3>
        <Controller
          control={control}
          name="title"
          rules={{ required: true, min: 2 }}
          render={({ field }) => (
            <TextField
              autoFocus
              value={field.value || ''}
              label="Title"
              size="small"
              onChange={(e) => field.onChange(e)}
            />
          )}
        />
        <Button type="submit">Create board</Button>
      </form>
    </div>
  );
};
