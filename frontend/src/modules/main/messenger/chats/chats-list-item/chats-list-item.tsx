import { Typography } from '@mui/material';
import UserAvatar from '../../../shared/components/user-avatar/user-avatar';
import { IncomingHistoryMessage } from '../../../../../shared/types';
import { normalizeLastMessageTime, prepareLastMessage } from '../../../shared/helpers';
import styles from './chats-list-item.module.scss';

interface ChatsListItemProps {
  friendFirstName: string;
  friendLastName: string;
  isOnline: boolean;
  lastMessage: IncomingHistoryMessage;
  loggedUserId: string;
  onClick: React.MouseEventHandler;
}

export default function ChatsListItem({
  friendFirstName,
  friendLastName,
  isOnline,
  lastMessage,
  loggedUserId,
  onClick
}: ChatsListItemProps) {
  return (
    <div className={styles.chatsListItem} onClick={onClick}>
      <div className={styles.avatarWrapper}>
        <UserAvatar firstName={friendFirstName} lastName={friendLastName} isOnline={isOnline} />
      </div>
      <div className={styles.nameAndLastMessage}>
        <div className={styles.nameAndTime}>
          <Typography variant="subtitle1" textOverflow="ellipsis">
            {friendFirstName} {friendLastName}
          </Typography>
          <Typography variant="caption" color={'grey'} sx={{ alignSelf: 'flex-start' }}>
            {lastMessage ? normalizeLastMessageTime(lastMessage?.createdAt) : ''}
          </Typography>
        </div>
        <Typography
          variant="subtitle1"
          color={'grey'}
          sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
        >
          {lastMessage ? prepareLastMessage(loggedUserId, lastMessage) : ''}
        </Typography>
      </div>
    </div>
  );
}
