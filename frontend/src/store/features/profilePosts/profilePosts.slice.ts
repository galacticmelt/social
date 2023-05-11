import { createSlice } from '@reduxjs/toolkit';
import { ProfilePostsState } from './profilePosts.types';
import { setProfilePosts } from './profilePosts.thunks';

const profilePostsSlice = createSlice({
  name: 'profilePosts',
  initialState: {
    profilePosts: [],
    profilePostsLoading: false,
    profilePostsRequested: false,
    profilePostsError: {
      status: false,
      value: null
    }
  } as ProfilePostsState,
  reducers: {
    unsetProfilePosts(state) {
      state.profilePosts = [];
    },
    setLikedBy(state, action) {
      const { postId, likedBy } = action.payload;
      const updated = state.profilePosts.find((post) => post._id === postId);
      updated.likedBy = [...likedBy];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(setProfilePosts.pending, (state) => {
      state.profilePostsError.status = false;
      state.profilePostsError.value = null;
      state.profilePostsLoading = true;
    });
    builder.addCase(setProfilePosts.fulfilled, (state, action) => {
      state.profilePostsLoading = false;
      state.profilePosts = action.payload;
      state.profilePostsRequested = true;
    });
    builder.addCase(setProfilePosts.rejected, (state, action) => {
      state.profilePostsLoading = false;
      state.profilePostsError.status = true;
      state.profilePostsError.value = action.payload;
    });
  }
});

export const profilePostsActions = {
  setProfilePosts,
  setLikedBy: profilePostsSlice.actions.setLikedBy,
  unsetProfilePosts: profilePostsSlice.actions.unsetProfilePosts
};

export default profilePostsSlice.reducer;
