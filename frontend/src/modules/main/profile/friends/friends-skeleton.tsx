import { Typography, Skeleton } from '@mui/material';
import styles from './friends.module.scss';
import { sixElemsMockArray } from '../../shared/constants';

export default function FriendsSkeleton() {
  return (
    <div className={styles.friends}>
      <Typography variant="h5" sx={{ width: 1 }}>
        Friends:
      </Typography>
      <div className={styles.friendsGrid}>
        {sixElemsMockArray.map((elem) => {
          return (
            <div className={styles.friendsGridItem} key={elem}>
              <div className={styles.avatarWrapper}>
                <Skeleton variant="circular" sx={{ height: 1, width: 1 }} />
              </div>
              <div>
                <Skeleton sx={{ height: 22, width: '3rem' }} />
                <Skeleton sx={{ height: 22, width: '3rem' }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
