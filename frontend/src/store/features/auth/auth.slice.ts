import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from './auth.types';
import { logIn } from './auth.thunks';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loggedUserId: sessionStorage.getItem('userId') || '',
    authLoading: false,
    authError: {
      status: false,
      value: null
    }
  } as AuthState,
  reducers: {
    logOut(state) {
      state.loggedUserId = '';
    }
  },
  extraReducers: (builder) => {
    builder.addCase(logIn.pending, (state) => {
      state.authError.status = false;
      state.authError.value = null;
      state.authLoading = true;
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.authLoading = false;
      state.loggedUserId = action.payload.userId;
    });
    builder.addCase(logIn.rejected, (state, action) => {
      state.authLoading = false;
      state.authError.status = true;
      state.authError.value = action.payload;
    });
  }
});

export const authActions = {
  logOut: authSlice.actions.logOut,
  logIn
};

export default authSlice.reducer;
