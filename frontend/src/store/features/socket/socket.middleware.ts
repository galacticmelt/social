import { io } from 'socket.io-client';
import { Middleware } from 'redux';
import { socketActions } from './socket.slice';
import { chatsActions } from '../chats/chats.slice';
import { Socket } from 'socket.io-client';
import { currentChatActions } from '../currentChat/currentChat.slice';

export const socketMiddleware: Middleware = (store) => {
  let socket: Socket;

  return (next) => (action) => {
    if (socketActions.setSocket.match(action)) {
      socket = io(import.meta.env.VITE_BASE_URL);
      socket.on('connect', () => {
        console.log('connected to socket server');
      });
      socket.on('getUsers', (users) => {
        console.log(users);
        store.dispatch(socketActions.setOnlineUsers(users));
      });
      socket.on('newMessage', (message) => {
        store.dispatch(socketActions.setLiveMessages(message));
        store.dispatch(
          chatsActions.setSocketLastMessage({
            chatId: message.chatId,
            socketMessage: message
          })
        );
      });
      socket.on('contactsChanged', ({ updateType, initiatorId }) => {
        const { loggedUserId } = store.getState().auth;
        const { companionId } = store.getState().currentChat;
        if (updateType === 'delete' && companionId === initiatorId) {
          store.dispatch(currentChatActions.unsetCurrentChat());
        }
        store.dispatch(chatsActions.setChats(loggedUserId));
      });
    }
    if (socketActions.unsetSocket.match(action)) {
      socket.disconnect();
      console.log('disconnected from socket server');
    }
    if (socketActions.sendUserId.match(action)) {
      socket.emit('addUser', action.payload);
      return;
    }
    if (socketActions.sendMessage.match(action)) {
      const { receiverId, message } = action.payload;
      socket.emit('sendMessage', {
        users: [socket.id, receiverId],
        message: message
      });
      return;
    }
    if (socketActions.notifyAboutContactsUpd.match(action)) {
      const { companionId, updateType } = action.payload;
      const { loggedUserId } = store.getState().auth;
      const { onlineUsers } = store.getState().socket;
      const isOnline = onlineUsers.filter((user) => user.userId === companionId);
      if (isOnline[0]) {
        socket.emit('contactsUpdate', {
          receiverId: isOnline[0].socketId,
          initiatorId: loggedUserId,
          updateType
        });
        return;
      }
    }
    return next(action);
  };
};
