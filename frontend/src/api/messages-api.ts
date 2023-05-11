import { API_ROUTES } from '../shared/constants';
import { OutcomingHistoryMessage } from '../store/features/currentChat/currentChat.types';
import { bearerRequest } from './templates';

export const fetchMessages = async (chatId: string) => {
  return await bearerRequest.get(API_ROUTES.MESSAGES_GET_BY_CHAT + chatId).json();
};

export const postMessage = async (message: OutcomingHistoryMessage) => {
  return await bearerRequest
    .post(API_ROUTES.MESSAGES_ROOT, {
      body: JSON.stringify(message)
    })
    .json();
};
