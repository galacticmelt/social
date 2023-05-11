import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllUsers } from '../../../api/user-api';

export const setAllUsers = createAsyncThunk('chats/setAllUsers', async (_, { rejectWithValue }) => {
  try {
    const data = await fetchAllUsers();
    return data.user;
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.name + ': ' + e.message);
      return rejectWithValue(e.message);
    }
  }
});
