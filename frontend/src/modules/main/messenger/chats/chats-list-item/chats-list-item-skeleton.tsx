import { useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';
import { randomIntFromInterval } from '../../../shared/helpers';
import styles from './chats-list-item.module.scss';

export default function ChatsListItemSkeleton() {
  const [nameLength, setNameLength] = useState<number | null>(null);
  const [lastMessageLength, setLastMessageLength] = useState<number | null>(null);

  useEffect(() => {
    setNameLength(randomIntFromInterval(30, 70));
    setLastMessageLength(randomIntFromInterval(20, 100));
  }, []);

  return (
    <div className={styles.chatsListItem}>
      <div className={styles.avatarWrapper}>
        <Skeleton variant="circular" sx={{ height: 1, width: 1 }} />
      </div>
      <div className={styles.nameAndLastMessage}>
        <Skeleton height={28} width={`${nameLength}%`} />
        <Skeleton height={28} width={`${lastMessageLength}%`} />
      </div>
    </div>
  );
}
