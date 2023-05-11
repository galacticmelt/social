import { Card, Box, Skeleton } from '@mui/material';
import styles from './post-item.module.scss';

export default function PostItemSkeleton() {
  return (
    <Card sx={{ width: 1, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div className={styles.avatarWrapper}>
            <Skeleton variant="circular" sx={{ height: 1, width: 1 }} />
          </div>
          <Skeleton sx={{ height: '1rem', width: '10rem' }} />
        </Box>
      </div>
      <Skeleton sx={{ height: '1rem', width: '100%' }} />
      <Skeleton sx={{ height: '1rem', width: '100%' }} />
    </Card>
  );
}
