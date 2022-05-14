import React from 'react';
import Typography from '@mui/material/Typography';
import { Button, TextField } from '@mui/material';
import { useForm, Controller, SubmitHandler, useFormState } from 'react-hook-form';
import {
  loginValidation,
  nameValidation,
  passwordValidation,
} from '../../components/validation/validation';
import styles from '../SignupPage/SignupPage.module.scss';
import { fetchUpdateUser } from '../../api/actionUpdateUser';
import { useAppDispatch } from '../../hooks/redux';

interface ISignInForm {
  name: string;
  login: string;
  password: string;
}

export function ProfilePage() {
  const dispatch = useAppDispatch();
  const { handleSubmit, control } = useForm<ISignInForm>();
  const { errors } = useFormState({
    control,
  });

  const onSubmit: SubmitHandler<ISignInForm> = async (data) => {
    console.log(data, 'data');
    await dispatch(fetchUpdateUser(data));
  };

  return (
    <div className={styles.formAuthPage}>
      <Typography variant="h4" component="div">
        Edit profile
      </Typography>
      <form className={styles.formAuthPageForm} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="name"
          rules={nameValidation}
          render={({ field }) => (
            <TextField
              label="name"
              size="small"
              margin="normal"
              fullWidth
              onChange={(e) => field.onChange(e)}
              value={field.value || ''}
              error={!!errors.name?.message}
              helperText={errors.name?.message}
              FormHelperTextProps={{
                style: {
                  position: 'absolute',
                  top: '35px',
                },
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="login"
          rules={loginValidation}
          render={({ field }) => (
            <TextField
              label="login"
              size="small"
              margin="normal"
              fullWidth
              onChange={(e) => field.onChange(e)}
              value={field.value || ''}
              error={!!errors.login?.message}
              helperText={errors.login?.message}
              FormHelperTextProps={{
                style: {
                  position: 'absolute',
                  top: '35px',
                },
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={passwordValidation}
          render={({ field }) => (
            <TextField
              type="password"
              label="password"
              size="small"
              margin="normal"
              fullWidth
              onChange={(e) => field.onChange(e)}
              value={field.value || ''}
              error={!!errors.password?.message}
              helperText={errors.password?.message}
              FormHelperTextProps={{
                style: {
                  position: 'absolute',
                  top: '35px',
                },
              }}
            />
          )}
        />
        <div className={styles.containerButton}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              marginTop: 2,
            }}
          >
            Edit
          </Button>
          <Button
            type="button"
            variant="contained"
            fullWidth
            color="error"
            sx={{
              marginTop: 2,
            }}
          >
            delete user
          </Button>
        </div>
      </form>
    </div>
  );
}
