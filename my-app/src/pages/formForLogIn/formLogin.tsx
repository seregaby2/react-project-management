import React from 'react';
import Typography from '@mui/material/Typography';
import { Button, TextField } from '@mui/material';
import { useForm, Controller, SubmitHandler, useFormState } from 'react-hook-form';
import './style/formAuthPage.css';
import {
  loginValidation,
  nameValidation,
  passwordValidation,
} from '../../components/validation/validation';

interface ISignInForm {
  name: string;
  login: string;
  password: string;
}

export function FormAuthPage() {
  const { handleSubmit, control } = useForm<ISignInForm>();
  const onSubmit: SubmitHandler<ISignInForm> = (data) => console.log(data);
  const { errors } = useFormState({
    control,
  });

  return (
    <div className="form-auth-page">
      <Typography variant="h4" component="div" className="form-auth-page__title">
        Login
      </Typography>
      <Typography
        variant="subtitle1"
        component="div"
        gutterBottom={true}
        className="form-auth-page__subtitle"
      >
        to get access
      </Typography>
      <form className="form-auth-page__form" onSubmit={handleSubmit(onSubmit)}>
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
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            marginTop: 2,
          }}
        >
          register
        </Button>
      </form>
    </div>
  );
}
