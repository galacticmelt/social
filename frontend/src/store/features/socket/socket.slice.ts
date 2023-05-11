import { createSlice } from '@reduxjs/toolkit';
import { SocketState } from './socket.types';

const socketSlice = createSlice({
  name: 'socket',
  initialState: {
    onlineUsers: [],
    liveMessages: []
  } as SocketState,
  reducers: {
    setSocket(state) {
      return state;
    },
    unsetSocket(state) {
      return state;
    },
    setOnlineUsers(state, action) {
      state.onlineUsers = action.payload;
    },
    setLiveMessages(state, action) {
      state.liveMessages.unshift(action.payload);
    },
    unsetLiveMessages(state) {
      state.liveMessages = [];
    },
    sendUserId(state, action) {
      return state;
    },
    sendMessage(state, action) {
      return state;
    },
    notifyAboutContactsUpd(state, action) {
      return state;
    }
  }
});

export const socketActions = {
  setSocket: socketSlice.actions.setSocket,
  unsetSocket: socketSlice.actions.unsetSocket,
  setOnlineUsers: socketSlice.actions.setOnlineUsers,
  setLiveMessages: socketSlice.actions.setLiveMessages,
  unsetLiveMessages: socketSlice.actions.unsetLiveMessages,
  sendUserId: socketSlice.actions.sendUserId,
  sendMessage: socketSlice.actions.sendMessage,
  notifyAboutContactsUpd: socketSlice.actions.notifyAboutContactsUpd
};

export default socketSlice.reducer;
