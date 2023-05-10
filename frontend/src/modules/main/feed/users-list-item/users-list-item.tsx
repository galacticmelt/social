import { Typography } from '@mui/material';
import UserAvatar from '../../shared/components/user-avatar/user-avatar';
import styles from './users-list-item.module.scss';

interface UsersListItemProps {
  firstName: string;
  lastName: string;
  isOnline: boolean;
  onClick: React.MouseEventHandler;
}

export default function UsersListItem({
  firstName,
  lastName,
  isOnline,
  onClick
}: UsersListItemProps) {
  return (
    <div className={styles.usersListItem} onClick={onClick}>
      <div className={styles.avatarWrapper}>
        <UserAvatar firstName={firstName} lastName={lastName} isOnline={isOnline} />
      </div>
      <div className={styles.userName}>
        <Typography variant="subtitle1" textOverflow="ellipsis">
          {firstName} {lastName}
        </Typography>
      </div>
    </div>
  );
}
