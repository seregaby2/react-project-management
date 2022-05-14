import React from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { Button, TextField, Typography } from '@mui/material';
import styles from './CreateBoardForm.module.scss';
import { ICreateBoardForm, ICreateBoardFormProps } from './ICreateBoardForm';
import { useAppDispatch } from '../../hooks/redux';
import { boardsActions } from '../../store/reducers/boardsSlice';
import { IBoard } from '../../interfaces/IBoard';

export const CreateBoardForm = ({ hideCreateBoardForm }: ICreateBoardFormProps) => {
  const dispatch = useAppDispatch();
  const { handleSubmit, control } = useForm<ICreateBoardForm>();
  const onSubmit: SubmitHandler<ICreateBoardForm> = (data) => {
    const newBoard: IBoard = { ...data, id: uuidv4() };
    dispatch(boardsActions.setBoard(newBoard));
    hideCreateBoardForm();
  };
  return (
    <div className={styles.createBoardFormOverlay} onClick={hideCreateBoardForm}>
      <form
        className={styles.createBoardForm}
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => e.stopPropagation()}
      >
        <Typography variant="h3" component="div">
          Fill out these fields=)
        </Typography>
        <Controller
          control={control}
          name="title"
          rules={{ required: true, min: 2 }}
          render={({ field }) => (
            <TextField
              value={field.value || ''}
              label="title"
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
              label="description"
              size="small"
              onChange={(e) => field.onChange(e)}
            />
          )}
        />
        <Controller
          control={control}
          name="workers"
          rules={{ required: true, min: 2 }}
          render={({ field }) => (
            <TextField
              value={field.value || ''}
              label="workers"
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
