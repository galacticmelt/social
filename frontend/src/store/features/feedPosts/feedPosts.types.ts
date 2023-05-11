import { Post } from '../../../shared/types';

export interface FeedPostsState {
  feedPosts: Post[];
  feedPostsLoading: boolean;
  feedPostsError: {
    status: boolean;
    value: null | unknown;
  };
}
