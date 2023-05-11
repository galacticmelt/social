import { Skeleton } from '@mui/material';
import { randomIntFromInterval } from '../../shared/helpers';
import styles from './users-list-item.module.scss';

export default function UsersListItemSkeleton() {
  return (
    <div className={styles.usersListItem}>
      <div className={styles.avatarWrapper}>
        <Skeleton variant="circular" sx={{ height: 1, width: 1 }} />
      </div>
      <div className={styles.userName}>
        <Skeleton height={28} width={`${randomIntFromInterval(30, 70)}%`} />
      </div>
    </div>
  );
}
