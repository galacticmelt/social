import { useRouteError } from 'react-router-dom';
import { Typography } from '@mui/material';
import styles from './error-page.module.scss';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  return (
    <div className={styles.errorPage}>
      <Typography variant="h1">Whoopsie!</Typography>
      <Typography variant="h3">{error.message}</Typography>
    </div>
  );
}
