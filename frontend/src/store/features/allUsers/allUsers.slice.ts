import { createSlice } from '@reduxjs/toolkit';
import { AllUsersState } from './allUsers.types';
import { setAllUsers } from './allUsers.thunks';

const allUsersSlice = createSlice({
  name: 'allUsers',
  initialState: {
    allUsers: [],
    allUsersLoading: false,
    allUsersError: {
      status: false,
      value: null
    }
  } as AllUsersState,
  reducers: {
    unsetAllUsers(state) {
      state.allUsers = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(setAllUsers.pending, (state) => {
      state.allUsersError.status = false;
      state.allUsersError.value = null;
      state.allUsersLoading = true;
    });
    builder.addCase(setAllUsers.fulfilled, (state, action) => {
      state.allUsersLoading = false;
      state.allUsers = action.payload!;
    });
    builder.addCase(setAllUsers.rejected, (state, action) => {
      state.allUsersError.status = true;
      state.allUsersError.value = action.payload;
    });
  }
});

export const allUsersActions = {
  setAllUsers,
  unsetAllUsers: allUsersSlice.actions.unsetAllUsers
};

export default allUsersSlice.reducer;
