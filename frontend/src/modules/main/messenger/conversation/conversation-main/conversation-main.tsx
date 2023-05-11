import { useAppSelector } from '../../../../../store/hooks';
import { Typography, CircularProgress } from '@mui/material';
import MessageItem from '../message-item/message-item';
import styles from './conversation-main.module.scss';

export default function ConversationMain() {
  const { loggedUserId } = useAppSelector((state) => state.auth);
  const { messages, messagesLoading, chatId } = useAppSelector((state) => state.currentChat);
  const { liveMessages } = useAppSelector((state) => state.socket);

  if (messagesLoading) {
    return (
      <div className={styles.noMessages}>
        <CircularProgress />
      </div>
    );
  }
  if (!messages.length && !liveMessages.filter((message) => message.chatId === chatId).length) {
    return (
      <div className={styles.noMessages}>
        <Typography variant="h6">No messages yet &#129296;</Typography>
      </div>
    );
  }
  return (
    <div className={styles.conversationMain}>
      <div className={styles.messagesWrapper}>
        {liveMessages.length > 0 &&
          liveMessages
            .filter((message) => message.chatId === chatId)
            .map((message) => {
              const isCompanion = message.sender !== loggedUserId;
              return (
                <MessageItem
                  key={message.id}
                  isCompanion={isCompanion}
                  text={message.text}
                  time={message.createdAt}
                />
              );
            })}
        {messages.length > 0 &&
          messages.map((message) => {
            const isCompanion = message.sender !== loggedUserId;
            return (
              <MessageItem
                key={message._id}
                isCompanion={isCompanion}
                text={message.text}
                time={message.createdAt}
              />
            );
          })}
      </div>
    </div>
  );
}
