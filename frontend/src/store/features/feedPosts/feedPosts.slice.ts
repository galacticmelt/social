import { createSlice } from '@reduxjs/toolkit';
import { FeedPostsState } from './feedPosts.types';
import { setFeedPosts } from './feedPosts.thunks';

const feedPostsSlice = createSlice({
  name: 'feedPosts',
  initialState: {
    feedPosts: [],
    feedPostsLoading: false,
    feedPostsError: {
      status: false,
      value: null
    }
  } as FeedPostsState,
  reducers: {
    unsetFeedPosts(state) {
      state.feedPosts = [];
    },
    setLikedBy(state, action) {
      const { postId, likedBy } = action.payload;
      const updated = state.feedPosts.find((post) => post._id === postId);
      updated.likedBy = [...likedBy];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(setFeedPosts.pending, (state) => {
      state.feedPostsError.status = false;
      state.feedPostsError.value = null;
      state.feedPostsLoading = true;
    });
    builder.addCase(setFeedPosts.fulfilled, (state, action) => {
      state.feedPostsLoading = false;
      state.feedPosts = action.payload;
    });
    builder.addCase(setFeedPosts.rejected, (state, action) => {
      state.feedPostsLoading = false;
      state.feedPostsError.status = true;
      state.feedPostsError.value = action.payload;
    });
  }
});

export const feedPostsActions = {
  setFeedPosts,
  setLikedBy: feedPostsSlice.actions.setLikedBy,
  unsetFeedPosts: feedPostsSlice.actions.unsetFeedPosts
};

export default feedPostsSlice.reducer;
