import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMessages, postMessage } from '../../../api/messages-api';
import { createChat } from '../../../api/chats-api';
import { OutcomingHistoryMessage } from './currentChat.types';
import { normalizeMessages } from './currentChat.helpers';
import { normalizeToCurrentChat } from './currentChat.helpers';

export const setMessages = createAsyncThunk(
  'currentChat/setMessages',
  async (id: string, { rejectWithValue }) => {
    try {
      const messages = await fetchMessages(id);
      const normalized = normalizeMessages(messages);
      return normalized;
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.name + ': ' + e.message);
        return rejectWithValue(e.message);
      }
    }
  }
);

export const sendMessage = createAsyncThunk(
  'currentChat/sendMessage',
  async (message: OutcomingHistoryMessage, { rejectWithValue }) => {
    try {
      await postMessage(message);
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
        return rejectWithValue(e.name + ': ' + e.message);
      }
    }
  }
);

export const initNewChat = createAsyncThunk(
  'currentChat/initNewChat',
  async (users: string[], { rejectWithValue }) => {
    try {
      const newChat = await createChat(users);
      return normalizeToCurrentChat(users[0], newChat);
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.name + ': ' + e.message);
        return rejectWithValue(e.message);
      }
    }
  }
);
