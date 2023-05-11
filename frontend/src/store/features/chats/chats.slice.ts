import { createSlice } from '@reduxjs/toolkit';
import { ChatsState } from './chats.types';
import { setChats, terminateChat } from './chats.thunks';

const chatsSlice = createSlice({
  name: 'chats',
  initialState: {
    chats: [],
    chatsLoading: false,
    chatsError: {
      status: false,
      value: null
    }
  } as ChatsState,
  reducers: {
    unsetOneChat(state, action) {
      const chatId = action.payload;
      state.chats = state.chats.filter((contact) => contact.chatId !== chatId);
    },
    unsetChats(state) {
      state.chats = [];
    },
    setSocketLastMessage(state, action) {
      const { chatId, socketMessage } = action.payload;
      const chat = state.chats.find((contact) => contact.chatId === chatId);
      chat.lastMessage = socketMessage;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(setChats.pending, (state) => {
      state.chatsError.status = false;
      state.chatsError.value = null;
      state.chatsLoading = true;
    });
    builder.addCase(setChats.fulfilled, (state, action) => {
      state.chatsLoading = false;
      state.chats = action.payload!;
    });
    builder.addCase(setChats.rejected, (state, action) => {
      state.chatsError.status = true;
      state.chatsError.value = action.payload.message;
    });
    builder.addCase(terminateChat.pending, (state) => {
      state.chatsError.status = false;
      state.chatsError.value = null;
      state.chatsLoading = true;
    });
    builder.addCase(terminateChat.fulfilled, (state) => {
      state.chatsLoading = false;
    });
    builder.addCase(terminateChat.rejected, (state, action) => {
      state.chatsError.status = true;
      state.chatsError.value = action.payload;
    });
  }
});

export const chatsActions = {
  setChats,
  terminateChat,
  unsetChats: chatsSlice.actions.unsetChats,
  unsetOneChat: chatsSlice.actions.unsetOneChat,
  setSocketLastMessage: chatsSlice.actions.setSocketLastMessage
};

export default chatsSlice.reducer;
