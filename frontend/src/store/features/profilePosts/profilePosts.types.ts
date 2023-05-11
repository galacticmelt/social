import { Post } from '../../../shared/types';

export interface ProfilePostsState {
  profilePosts: Post[];
  profilePostsLoading: boolean;
  profilePostsRequested: boolean;
  profilePostsError: {
    status: boolean;
    value: null | unknown;
  };
}
