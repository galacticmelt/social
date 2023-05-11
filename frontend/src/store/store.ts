import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/auth.slice';
import profileReducer from './features/profile/profile.slice';
import currentUserReducer from './features/currentUser/currentUser.slice';
import chatsReducer from './features/chats/chats.slice';
import allUsersReducer from './features/allUsers/allUsers.slice';
import currentChatReducer from './features/currentChat/currentChat.slice';
import socketReducer from './features/socket/socket.slice';
import profilePostsReducer from './features/profilePosts/profilePosts.slice';
import feedPostsReducer from './features/feedPosts/feedPosts.slice';
import { authMiddleware } from './features/auth/auth.middleware';
import { socketMiddleware } from './features/socket/socket.middleware';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    currentUser: currentUserReducer,
    chats: chatsReducer,
    profilePosts: profilePostsReducer,
    feedPosts: feedPostsReducer,
    allUsers: allUsersReducer,
    currentChat: currentChatReducer,
    socket: socketReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware, socketMiddleware),
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
