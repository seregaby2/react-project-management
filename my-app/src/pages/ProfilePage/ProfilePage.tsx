import React from 'react';
import Typography from '@mui/material/Typography';
import { Button, LinearProgress, TextField } from '@mui/material';
import { useForm, Controller, SubmitHandler, useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  loginValidation,
  nameValidation,
  passwordValidation,
} from '../../components/validation/validation';
import { fetchUpdateUser } from '../../api/actionUpdateUser';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ISingUp } from '../../interfaces/interfaceAuth';
import { useNavigate } from 'react-router-dom';
import { fetchDeleteUser } from '../../api/actionDeleteUser';
import { HelpVarSlice } from '../../store/reducers/helpVarSlice';
import styles from '../SignupPage/SignupPage.module.scss';
import { ConfirmModal } from '../../components/ConfirmModal/ConfirmModal';

interface ISignInForm {
  name: string;
  login: string;
  password: string;
}

export function ProfilePage() {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.reducerSingupRequest);
  const { isConfirmalModal } = useAppSelector((state) => state.reducerHelpVars);
  const navigate = useNavigate();
  const { handleSubmit, reset, control } = useForm<ISignInForm>();
  const { t } = useTranslation(['editProfile', 'confirmModal']);
  const { errors } = useFormState({
    control,
  });

  const dataUser: ISingUp = JSON.parse(localStorage.getItem('dataUser') || '');

  const onSubmit: SubmitHandler<ISignInForm> = async (data) => {
    await dispatch(fetchUpdateUser(data));
    reset({
      password: '',
    });
  };

  const deleteUser = async () => {
    await dispatch(fetchDeleteUser());
    navigate('/');
    dispatch(HelpVarSlice.actions.setIsConfirmalModal(false));
  };

  const confirmDelete = () => {
    dispatch(HelpVarSlice.actions.setIsConfirmalModal(true));
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
          {isConfirmalModal && (
            <ConfirmModal
              text={t('deleteUserModal', { ns: 'confirmModal' })}
              onYes={() => deleteUser()}
              onNo={() => dispatch(HelpVarSlice.actions.setIsConfirmalModal(false))}
            />
          )}
          <Typography variant="h4" component="div">
            {t('editProfile')}
          </Typography>
          <form className={styles.formAuthPageForm} onSubmit={handleSubmit(onSubmit)}>
            <Controller
              control={control}
              name="name"
              defaultValue={dataUser.name || ''}
              rules={nameValidation}
              render={({ field }) => (
                <TextField
                  label={t('name')}
                  size="small"
                  margin="normal"
                  fullWidth
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
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
              defaultValue={dataUser.login || ''}
              rules={loginValidation}
              render={({ field }) => (
                <TextField
                  label={t('login')}
                  size="small"
                  margin="normal"
                  fullWidth
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
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
                  onChange={(e) => {
                    field.onChange(e);
                  }}
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
                {t('edit')}
              </Button>
              <Button
                type="button"
                variant="contained"
                fullWidth
                color="error"
                onClick={confirmDelete}
                sx={{
                  marginTop: 2,
                }}
              >
                {t('deleteUser')}
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
