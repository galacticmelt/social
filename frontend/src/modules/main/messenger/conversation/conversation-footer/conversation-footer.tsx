import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import { useMenu } from '../../../shared/hooks';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { socketActions } from '../../../../../store/features/socket/socket.slice';
import { createSocketMessage, createHistoryMessage } from '../../../shared/helpers';
import { currentChatActions } from '../../../../../store/features/currentChat/currentChat.slice';
import { chatsActions } from '../../../../../store/features/chats/chats.slice';
import styles from './conversation-footer.module.scss';
import EmojiBoard from '../emoji-board/emoji-board';

export default function ConversationFooter() {
  const [messageText, setMessageText] = useState('');
  const { onlineUsers } = useAppSelector((state) => state.socket);
  const { loggedUserId } = useAppSelector((state) => state.auth);
  const { chatId, friendId } = useAppSelector((state) => state.currentChat);
  const dispatch = useAppDispatch();

  const { open, anchorEl, anchorHandler, closeHandler } = useMenu();

  const addEmojiHandler = (number: number) => {
    setMessageText((prevState) => prevState + String.fromCodePoint(number));
  };

  const sendMessageHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!messageText) return;
    const historyMessage = createHistoryMessage(chatId, loggedUserId, messageText);
    dispatch(currentChatActions.sendMessage(historyMessage));
    const socketMessage = createSocketMessage(
      onlineUsers,
      chatId,
      friendId,
      loggedUserId,
      messageText
    );
    dispatch(socketActions.sendMessage(socketMessage));
    dispatch(chatsActions.setSocketLastMessage({ chatId, socketMessage: socketMessage.message }));
    setMessageText('');
  };

  return (
    <div className={styles.conversationFooter}>
      <div className={styles.attachmentWrapper}>
        <IconButton sx={{ p: 0 }} onClick={anchorHandler}>
          <InsertEmoticonIcon />
        </IconButton>
        <EmojiBoard
          anchorEl={anchorEl}
          closeHandler={closeHandler}
          open={open}
          addEmojiHandler={addEmojiHandler}
        />
      </div>
      <form className={styles.messageForm} onSubmit={sendMessageHandler}>
        <TextField
          className={styles.messageInput}
          placeholder="Type your message here"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" onClick={sendMessageHandler}>
                <IconButton edge="end">
                  <SendRoundedIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
          value={messageText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessageText(e.target.value)}
        />
      </form>
    </div>
  );
}
