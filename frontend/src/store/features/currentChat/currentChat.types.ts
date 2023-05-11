import { IncomingHistoryMessage } from '../../../shared/types';

export type CurrentChatState = {
  chatId: string;
  friendId: string;
  firstName: string;
  lastName: string;
  messagesRequested: boolean;
  messages: IncomingHistoryMessage[];
  messagesLoading: boolean;
  messagesError: {
    status: boolean;
    value: null | unknown;
  };
  initNewChatError: {
    status: boolean;
    value: null | unknown;
  };
};
