import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchChats, deleteChat } from '../../../api/chats-api';
import { normalizeChats } from './chats.helpers';

export const setChats = createAsyncThunk(
  'chats/setChats',
  async (userId: string, { rejectWithValue }) => {
    try {
      const rawChats = await fetchChats(userId);
      const normalized = normalizeChats(userId, rawChats);
      return normalized;
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.name + ': ' + e.message);
        return rejectWithValue(e.message);
      }
    }
  }
);

export const terminateChat = createAsyncThunk(
  'chats/terminateChat',
  async (chatId: string, { rejectWithValue }) => {
    try {
      console.log(chatId);
      return await deleteChat(chatId);
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.name + ': ' + e.message);
        return rejectWithValue(e.message);
      }
    }
  }
);
