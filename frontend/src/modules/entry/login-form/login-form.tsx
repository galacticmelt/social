import { TextField, Typography, Button, CircularProgress, Box } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { emailValidation, passValidation } from '../shared/constants';
import { LogInData } from '../../../shared/types';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { authActions } from '../../../store/features/auth/auth.slice';
import styles from './login-form.module.scss';

export default function LogInForm() {
  const { authError, authLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LogInData>({ reValidateMode: 'onChange' });

  const onSubmit: SubmitHandler<LogInData> = (data) => {
    const user = {
      email: data.email,
      password: data.password
    };
    console.log(user);
    dispatch(authActions.logIn(user));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.logInForm}>
      <Typography variant="h2">Log in</Typography>
      <TextField
        {...register('email', emailValidation)}
        label="Email"
        size="small"
        fullWidth={true}
        error={errors.email ? true : false}
        helperText={errors.email?.message}
      />
      <TextField
        {...register('password', passValidation)}
        type="password"
        label="Password"
        size="small"
        fullWidth={true}
        error={errors.password ? true : false}
        helperText={errors.password?.message}
      />
      {authError.status && (
        <Typography variant="caption" color="error">
          Whoops! {authError.value}
        </Typography>
      )}
      <Box sx={{ position: 'relative' }}>
        <Button type="submit" variant="contained" disabled={authLoading}>
          Showtime!
        </Button>
        {authLoading && (
          <CircularProgress
            size={20}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-10px',
              marginLeft: '-10px'
            }}
          />
        )}
      </Box>
    </form>
  );
}
