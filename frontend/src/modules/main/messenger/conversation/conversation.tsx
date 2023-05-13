import ConversationFooter from './conversation-footer/conversation-footer';
import ConversationHeader from './conversation-header/conversation-header';
import ConversationMain from './conversation-main/conversation-main';
import { Typography } from '@mui/material';
import { useAppSelector } from '../../../../store/hooks';
import styles from './conversation.module.scss';

export default function Conversation() {
  const { chatId } = useAppSelector((state) => state.currentChat);

  return (
    <div className={styles.conversation}>
      {chatId ? (
        <>
          <ConversationHeader />
          <ConversationMain />
          <ConversationFooter />
        </>
      ) : (
        <Typography variant="h3" sx={{ textAlign: 'center', pl: '1rem', pr: '1rem' }}>
          This is messenger. Start a conversation!
        </Typography>
      )}
    </div>
  );
}
