import { createSlice } from '@reduxjs/toolkit';
import { ProfileState } from './profile.types';
import { setProfile } from './profile.thunks';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profileUserId: '',
    firstName: '',
    lastName: '',
    friends: [],
    profileLoading: true,
    profileError: {
      status: false,
      value: null
    }
  } as ProfileState,
  reducers: {
    unsetProfile(state) {
      state.profileUserId = '';
      state.firstName = '';
      state.lastName = '';
      state.friends = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(setProfile.pending, (state) => {
      state.profileError.status = false;
      state.profileError.value = '';
      state.profileLoading = true;
    });
    builder.addCase(setProfile.fulfilled, (state, action) => {
      const { _id, firstName, lastName, dateOfBirth, location, almaMater, friends } =
        action.payload.user;
      state.profileLoading = false;
      state.profileUserId = _id;
      state.firstName = firstName;
      state.lastName = lastName;
      state.dateOfBirth = dateOfBirth;
      state.location = location;
      state.almaMater = almaMater;
      state.friends = friends;
    });
    builder.addCase(setProfile.rejected, (state, action) => {
      state.profileLoading = false;
      state.profileError.status = true;
      state.profileError.value = action.payload;
    });
  }
});

export const profileActions = {
  setProfile,
  unsetProfile: profileSlice.actions.unsetProfile
};

export default profileSlice.reducer;
