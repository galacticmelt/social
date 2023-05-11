import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAuthData } from '../../../api/auth-api';
import { LogInData } from '../../../shared/types';

export const logIn = createAsyncThunk<any, LogInData>(
  'auth/setTokens',
  async (credentials, { rejectWithValue }) => {
    try {
      const authData = await fetchAuthData(credentials);
      return authData;
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.name + ': ' + e.message);
        return rejectWithValue(e.message);
      }
    }
  }
);
