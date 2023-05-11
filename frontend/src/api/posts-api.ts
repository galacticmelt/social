import { API_ROUTES } from '../shared/constants';
import { bearerRequest } from './templates';
import { PostData, PostUpdate } from '../shared/types';

export const fetchPostsByUser = async (userId: string) => {
  return await bearerRequest.get(API_ROUTES.POSTS_GET_BY_USER + userId).json();
};

export const fetchPostsByFriends = async (friends: string[]) => {
  console.log(friends);
  return await bearerRequest
    .post(API_ROUTES.POSTS_GET_BY_FRIENDS, {
      body: JSON.stringify({ friends })
    })
    .json();
};

export const createPost = async (post: PostData) => {
  return await bearerRequest
    .post(API_ROUTES.POSTS_ROOT, {
      body: JSON.stringify(post)
    })
    .json();
};

export const deletePost = async (postId: string) => {
  return await bearerRequest.delete(API_ROUTES.POSTS_ROOT + postId).json();
};

export const updatePost = async (postId: string, update: PostUpdate) => {
  console.log(update);
  return await bearerRequest
    .patch(API_ROUTES.POSTS_ROOT + postId, {
      body: JSON.stringify(update)
    })
    .json();
};
