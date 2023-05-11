import { Typography } from '@mui/material';
import ContactsList from './chats-list/chats-list';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { currentChatActions } from '../../../../store/features/currentChat/currentChat.slice';
import { socketActions } from '../../../../store/features/socket/socket.slice';
import { Chat } from '../../../../store/features/chats/chats.types';
import styles from './chats.module.scss';

export default function Chats() {
  const { loggedUserId } = useAppSelector((state) => state.auth);
  const { chats, chatsLoading } = useAppSelector((state) => state.chats);
  const { onlineUsers } = useAppSelector((state) => state.socket);
  const dispatch = useAppDispatch();

  const startChatFromContacts = (chat: Chat) => {
    dispatch(currentChatActions.setCurrentChat(chat));
    dispatch(currentChatActions.setMessages(chat.chatId));
    dispatch(socketActions.unsetLiveMessages());
  };

  return (
    <div className={styles.chats}>
      <Typography variant="h4">Chats</Typography>
      <ContactsList
        loggedUserId={loggedUserId}
        chatsList={chats}
        onlineUsers={onlineUsers}
        chatsLoading={chatsLoading}
        onClick={startChatFromContacts}
      />
    </div>
  );
}
