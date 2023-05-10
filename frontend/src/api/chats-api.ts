import { API_ROUTES } from '../shared/constants';
import { bearerRequest } from './templates';

export const fetchChats = async (userId: string) => {
  return await bearerRequest.get(API_ROUTES.CHATS_GET_BY_USER + userId).json();
};

export const createChat = async (users: string[]) => {
  return await bearerRequest
    .post(API_ROUTES.CHATS_ROOT, {
      body: JSON.stringify({ users })
    })
    .json();
};

export const deleteChat = async (chatId: string) => {
  return await bearerRequest.delete(API_ROUTES.CHATS_ROOT + chatId).json();
};
