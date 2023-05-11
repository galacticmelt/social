import { createSlice } from '@reduxjs/toolkit';
import { CurrentUserState } from './currentUser.types';
import { setCurrentUser } from './currentUser.thunks';

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: {
    userId: '',
    firstName: '',
    lastName: '',
    friends: [],
    userLoading: true,
    userError: {
      status: false,
      value: null
    }
  } as CurrentUserState,
  reducers: {
    unsetUser(state) {
      state.userId = '';
      state.firstName = '';
      state.lastName = '';
      state.friends = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(setCurrentUser.pending, (state) => {
      state.userError.status = false;
      state.userError.value = '';
      state.userLoading = true;
    });
    builder.addCase(setCurrentUser.fulfilled, (state, action) => {
      const { _id, firstName, lastName, friends } = action.payload.user;
      state.userLoading = false;
      state.userId = _id;
      state.firstName = firstName;
      state.lastName = lastName;
      state.friends = friends;
    });
    builder.addCase(setCurrentUser.rejected, (state, action) => {
      state.userLoading = false;
      state.userError.status = true;
      state.userError.value = action.payload;
    });
  }
});

export const currentUserActions = {
  setCurrentUser,
  unsetCurrentUser: currentUserSlice.actions.unsetUser
};

export default currentUserSlice.reducer;
