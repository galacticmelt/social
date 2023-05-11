import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Typography, Button, CircularProgress } from '@mui/material';
import { DateField, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { emailValidation, passValidation } from '../shared/constants';
import { SignUpData } from '../../../shared/types';
import { registerUser } from '../../../api/user-api';
import { capitalizeWord } from '../shared/helpers';
import styles from './signup-form.module.scss';

export default function SignUpForm() {
  const [regLoading, setRegLoading] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);
  const [regError, setRegError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (regSuccess) {
      setTimeout(() => navigate('/'), 3000);
    }
  }, [regSuccess]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm<SignUpData>({ reValidateMode: 'onChange' });

  const onSubmit: SubmitHandler<SignUpData> = async (data) => {
    setRegError(null);
    const user = {
      firstName: capitalizeWord(data.firstName),
      lastName: capitalizeWord(data.lastName),
      dateOfBirth: data.dateOfBirth.toDate(),
      email: data.email,
      password: data.password
    };
    setRegLoading(true);
    try {
      const res = await registerUser(user);
      console.log(res);
      if (res) {
        setRegLoading(false);
        setRegSuccess(true);
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        setRegLoading(false);
        setRegError(e.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.signUpForm}>
      <Typography variant="h2">Sign up</Typography>
      <TextField
        {...register('firstName', { required: 'Please enter your first name' })}
        label="First name"
        size="small"
        fullWidth={true}
        error={errors.firstName ? true : false}
        helperText={errors.firstName?.message}
        autoComplete="off"
      />
      <TextField
        {...register('lastName', { required: 'Please enter your last name' })}
        label="Last name"
        size="small"
        fullWidth={true}
        error={errors.lastName ? true : false}
        helperText={errors.lastName?.message}
        autoComplete="off"
      />
      <Controller
        name="dateOfBirth"
        control={control}
        rules={{ required: 'Please enter your date of birth' }}
        render={({ field }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              label="Date of birth"
              size="small"
              fullWidth={true}
              value={field.value}
              onChange={(date) => field.onChange(date)}
              slotProps={{
                textField: {
                  ...field,
                  error: errors.dateOfBirth ? true : false,
                  helperText: errors.dateOfBirth?.message
                }
              }}
            />
          </LocalizationProvider>
        )}
      ></Controller>
      <TextField
        {...register('email', emailValidation)}
        label="Email"
        size="small"
        fullWidth={true}
        error={errors.email ? true : false}
        helperText={errors.email?.message}
        autoComplete="off"
      />
      <TextField
        {...register('password', passValidation)}
        type="password"
        label="Password"
        size="small"
        fullWidth={true}
        error={errors.password ? true : false}
        helperText={errors.password?.message}
        autoComplete="off"
      />
      {regError && (
        <Typography variant="caption" color="error">
          Whoops! {regError}
        </Typography>
      )}
      <Button type="submit" variant="contained" disabled={regLoading}>
        Submit
      </Button>
      {regLoading && (
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
      {regSuccess && <Typography>Signed up! Redirecting to Log in page...</Typography>}
    </form>
  );
}
