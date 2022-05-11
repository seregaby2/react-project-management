import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { Button, TextField } from '@mui/material';
import { useForm, Controller, SubmitHandler, useFormState } from 'react-hook-form';
import { loginValidation, passwordValidation } from '../../components/validation/validation';
import styles from './LoginPage.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchDataLogin } from '../../store/reducers/actionSignin';
import { useNavigate } from 'react-router-dom';

interface ISignInForm {
  name: string;
  login: string;
  password: string;
}

export function LoginPage() {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.reducerSingupRequest);
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm<ISignInForm>();
  const { errors } = useFormState({
    control,
  });

  const onSubmit: SubmitHandler<ISignInForm> = async (data) => {
    await dispatch(fetchDataLogin(data));
  };

  useEffect(() => {
    console.log(isAuth, 'error');
    if (isAuth) navigate('/main');
  }, [isAuth, navigate]);

  console.log(isAuth, 'error2');
  return (
    <div className={styles.formAuthPage}>
      <Typography variant="h4" component="div">
        Log in
      </Typography>
      <Typography
        variant="subtitle1"
        component="div"
        gutterBottom={true}
        className={styles.formAuthPageSubtitle}
      >
        to get access
      </Typography>
      <form className={styles.formAuthPageForm} onSubmit={handleSubmit(onSubmit)}>
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
          enter
        </Button>
      </form>
    </div>
  );
}
