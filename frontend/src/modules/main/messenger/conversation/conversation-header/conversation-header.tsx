import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import { Avatar, Typography } from '@mui/material';
import { stringAvatar, stringToColor } from '../../../shared/helpers';
import styles from './conversation-header.module.scss';

export default function ConversationHeader() {
  const { firstName, lastName, friendId } = useAppSelector((state) => state.currentChat);
  const { onlineUsers } = useAppSelector((state) => state.socket);

  return (
    <div className={styles.conversationHeader}>
      <div className={styles.currentContactInfo}>
        <div className={styles.avatarWrapper}>
          <Avatar sx={{ height: 1, width: 1, bgcolor: stringToColor(firstName, lastName) }}>
            {stringAvatar(firstName, lastName)}
          </Avatar>
        </div>
        <div className={styles.nameAndStatus}>
          <Typography variant="subtitle1">
            {firstName} {lastName}
          </Typography>
          {onlineUsers.find((user) => user.userId === friendId) ? (
            <Typography variant="subtitle2" color="green">
              Online
            </Typography>
          ) : (
            <Typography variant="subtitle2" color="gray">
              Offline
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
}
