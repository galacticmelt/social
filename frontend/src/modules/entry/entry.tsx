import { useState } from 'react';
import { Button } from '@mui/material';
import LogInForm from './login-form/login-form';
import SignUpForm from './signup-form/signup-form';
import styles from './entry.module.scss';

export default function Entry() {
  const [hasAccount, setHasAccount] = useState(true);

  const hasAccountToggle = () => {
    setHasAccount((prevState) => !prevState);
  };

  return (
    <div className={styles.auth}>
      {hasAccount ? (
        <>
          <LogInForm />
          <Button onClick={hasAccountToggle} size="small" sx={{ mt: 1 }}>
            No account?
          </Button>
        </>
      ) : (
        <>
          <SignUpForm />
          <Button onClick={hasAccountToggle} size="small" sx={{ mt: 1 }}>
            Already signed up?
          </Button>
        </>
      )}
    </div>
  );
}
