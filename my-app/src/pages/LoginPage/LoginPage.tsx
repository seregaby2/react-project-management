import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { Button, LinearProgress, TextField } from '@mui/material';
import { useForm, Controller, SubmitHandler, useFormState } from 'react-hook-form';
import { loginValidation, passwordValidation } from '../../components/validation/validation';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ISignInForm } from '../../interfaces/interfaceAuth';
import { fetchDataLogin } from '../../api/actionSignin';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from './LoginPage.module.scss';

export function LoginPage() {
  const dispatch = useAppDispatch();
  const { isLoading, isTokenActive } = useAppSelector((state) => state.reducerSingupRequest);
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm<ISignInForm>();
  const { t } = useTranslation(['signin']);
  const { errors } = useFormState({
    control,
  });

  useEffect(() => {
    if (isTokenActive) navigate('/main');
  }, [isTokenActive, navigate]);

  const onSubmit: SubmitHandler<ISignInForm> = async (data) => {
    await dispatch(fetchDataLogin(data));
  };

  return (
    <div className={styles.formAuthPage}>
      {isLoading ? (
        <>
          <div className={styles.wrapperOverlay}></div>
          <LinearProgress style={{ marginTop: '2vh', width: '50%', zIndex: '300' }} />
        </>
      ) : (
        <>
          <Typography variant="h4" component="div">
            {t('logIn')}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            gutterBottom={true}
            className={styles.formAuthPageSubtitle}
          >
            {t('toGetaccess')}
          </Typography>
          <form className={styles.formAuthPageForm} onSubmit={handleSubmit(onSubmit)}>
            <Controller
              control={control}
              name="login"
              rules={loginValidation}
              render={({ field }) => (
                <TextField
                  label={t('login')}
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
                  label={t('password')}
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
              {t('enter')}
            </Button>
          </form>
        </>
      )}
    </div>
  );
}
