import { IncomingHistoryMessage } from '../currentChat/currentChat.types';

export type Chat = {
  friendId: string;
  firstName: string;
  lastName: string;
  chatId: string;
  lastMessage: IncomingHistoryMessage;
};

export type ChatsState = {
  chats: Chat[];
  chatsLoading: boolean;
  chatsError: {
    status: boolean;
    value: null | any;
  };
};
