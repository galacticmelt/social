import ChatsListItem from '../chats-list-item/chats-list-item';
import ChatsListItemSkeleton from '../chats-list-item/chats-list-item-skeleton';
import { Typography } from '@mui/material';
import { Chat } from '../../../../../store/features/chats/chats.types';
import { SocketUser } from '../../../../../store/features/socket/socket.types';
import { tenElemsMockArray } from '../../../shared/constants';
import styles from './chats-list.module.scss';

interface ChatsListProps {
  chatsList: Chat[];
  onlineUsers: SocketUser[];
  chatsLoading: boolean;
  loggedUserId: string;
  onClick: (contact: Chat) => void;
}

export default function ChatsList({
  chatsList,
  onlineUsers,
  chatsLoading,
  loggedUserId,
  onClick
}: ChatsListProps) {
  if (!chatsList.length && !chatsLoading) {
    return (
      <div className={styles.noChats}>
        <Typography>No contacts&#129300;</Typography>
      </div>
    );
  }
  return (
    <div className={styles.chatsList}>
      {chatsLoading
        ? tenElemsMockArray.map((elem) => {
            return <ChatsListItemSkeleton key={elem} />;
          })
        : chatsList
            .filter((chat) => chat.lastMessage)
            .sort(
              (a, b) =>
                new Date(b.lastMessage.createdAt).valueOf() -
                new Date(a.lastMessage.createdAt).valueOf()
            )
            .concat(chatsList.filter((chat) => !chat.lastMessage))
            .map((chat) => {
              return (
                <ChatsListItem
                  key={chat.chatId}
                  loggedUserId={loggedUserId}
                  friendFirstName={chat.firstName}
                  friendLastName={chat.lastName}
                  isOnline={onlineUsers.some((onlineUser) => onlineUser.userId === chat.friendId)}
                  lastMessage={chat.lastMessage}
                  onClick={() => onClick(chat)}
                />
              );
            })}
    </div>
  );
}
