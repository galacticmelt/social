import { IncomingHistoryMessage } from '../../../shared/types';
import { RawChat } from '../../../shared/types';
import { Chat } from '../chats/chats.types';

export const normalizeMessages = (messages: IncomingHistoryMessage[]) => {
  return messages.reverse();
};

export const normalizeToCurrentChat = (currentUserId: string, chat: RawChat): Chat => {
  const friend = chat.users.find((user) => user._id !== currentUserId)!;
  const normalized = {
    chatId: chat._id,
    friendId: friend._id,
    firstName: friend.firstName,
    lastName: friend.lastName,
    lastMessage: chat.lastMessage
  };
  return normalized;
};
