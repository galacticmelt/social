import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPostsByFriends } from '../../../api/posts-api';

export const setFeedPosts = createAsyncThunk(
  'feedPosts/setFeedPosts',
  async (friends: string[], { rejectWithValue }) => {
    try {
      return await fetchPostsByFriends(friends);
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.name + ': ' + e.message);
        return rejectWithValue(e.message);
      }
    }
  }
);
