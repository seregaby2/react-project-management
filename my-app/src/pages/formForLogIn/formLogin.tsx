import React from 'react';
import Typography from '@mui/material/Typography';
import { Button, TextField } from '@mui/material';
import { useForm, Controller, SubmitHandler, useFormState } from 'react-hook-form';
import './style/formAuthPage.css';

interface ISignInForm {
  login: string;
  password: string;
}

export function FormAuthPage() {
  const { handleSubmit, control } = useForm<ISignInForm>();
  const onSubmit: SubmitHandler<ISignInForm> = (data) => console.log(data);
  const { errors } = useFormState({
    control,
  });
  console.log('errors', errors.login?.message);
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
          name="login"
          rules={{ required: 'required to fill' }}
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
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{ required: 'required to fill' }}
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
          Enter
        </Button>
      </form>
    </div>
  );
}
