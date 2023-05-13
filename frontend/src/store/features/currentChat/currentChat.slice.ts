import { createSlice } from '@reduxjs/toolkit';
import { CurrentChatState } from './currentChat.types';
import { setMessages, sendMessage, initNewChat } from './currentChat.thunks';

const currentChatSlice = createSlice({
  name: 'currentChat',
  initialState: {
    chatId: '',
    friendId: '',
    firstName: '',
    lastName: '',
    messagesRequested: false,
    messages: [],
    messagesLoading: false,
    messagesError: {
      status: false,
      value: null
    },
    initNewChatError: {
      status: false,
      value: null
    }
  } as CurrentChatState,
  reducers: {
    unsetCurrentChat(state) {
      state.chatId = '';
      state.friendId = '';
      state.firstName = '';
      state.lastName = '';
      state.messages = [];
      state.messagesRequested = false;
    },
    setCurrentChat(state, action) {
      const { chatId, friendId, firstName, lastName } = action.payload;
      state.chatId = chatId;
      state.friendId = friendId;
      state.firstName = firstName;
      state.lastName = lastName;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(setMessages.pending, (state) => {
      state.messagesError.status = false;
      state.messagesError.value = null;
      state.messagesLoading = true;
      state.messagesRequested = true;
    });
    builder.addCase(setMessages.fulfilled, (state, action) => {
      state.messagesLoading = false;
      state.messages = action.payload;
    });
    builder.addCase(setMessages.rejected, (state, action) => {
      state.messagesLoading = false;
      state.messagesError.status = true;
      state.messagesError.value = action.payload;
    });
    builder.addCase(sendMessage.pending, (state) => {
      return state;
    });
    builder.addCase(sendMessage.fulfilled, (state) => {
      return state;
    });
    builder.addCase(sendMessage.rejected, (state, action) => {
      state.messagesError.status = true;
      state.messagesError.value = action.payload;
    });
    builder.addCase(initNewChat.pending, (state) => {
      return state;
    });
    builder.addCase(initNewChat.fulfilled, (state, action) => {
      return state;
    });
    builder.addCase(initNewChat.rejected, (state, action) => {
      return state;
    });
  }
});

export const currentChatActions = {
  setMessages,
  sendMessage,
  initNewChat,
  unsetCurrentChat: currentChatSlice.actions.unsetCurrentChat,
  setCurrentChat: currentChatSlice.actions.setCurrentChat
};

export default currentChatSlice.reducer;
