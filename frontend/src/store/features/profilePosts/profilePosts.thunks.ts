import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPostsByUser } from '../../../api/posts-api';

export const setProfilePosts = createAsyncThunk(
  'profilePosts/setProfilePosts',
  async (id: string, { rejectWithValue }) => {
    try {
      return await fetchPostsByUser(id);
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.name + ': ' + e.message);
        return rejectWithValue(e.message);
      }
    }
  }
);
