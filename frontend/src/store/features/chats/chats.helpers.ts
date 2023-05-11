import { RawChat } from '../../../shared/types';
import { Chat } from './chats.types';

export const normalizeChats = (currentUserId: string, rawChats: RawChat[]): Chat[] => {
  const chats = rawChats.map((chat) => {
    const filtered = chat.users.find((user) => user._id !== currentUserId)!;
    const chatObj = {
      chatId: chat._id,
      friendId: filtered._id,
      firstName: filtered.firstName,
      lastName: filtered.lastName,
      lastMessage: chat.lastMessage
    };
    return chatObj;
  });
  return chats;
};
