import { useState } from 'react';
import { Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import PostsList from '../../shared/components/posts-list/posts-list';
import { deletePost, updatePost } from '../../../../api/posts-api';
import { feedPostsActions } from '../../../../store/features/feedPosts/feedPosts.slice';
import styles from './posts.module.scss';

export default function Posts() {
  const { feedPosts, feedPostsLoading } = useAppSelector((state) => state.feedPosts);
  const { onlineUsers } = useAppSelector((state) => state.socket);
  const { loggedUserId } = useAppSelector((state) => state.auth);

  const [likeErr, setLikeErr] = useState(null);
  const [delPostErr, setDelPostErr] = useState(null);

  const dispatch = useAppDispatch();

  const handleDelPost = async (postId: string) => {
    try {
      await deletePost(postId);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setDelPostErr(e.message);
      }
    }
  };

  const handleLikePost = async (postId: string, likedBy: string[]) => {
    dispatch(feedPostsActions.setLikedBy({ postId, likedBy: [...likedBy, loggedUserId] }));
    try {
      await updatePost(postId, { likedBy: [...likedBy, loggedUserId] });
    } catch (e: unknown) {
      if (e instanceof Error) {
        setLikeErr(e.message);
      }
    }
  };

  const handleUnlikePost = async (postId: string, likedBy: string[]) => {
    const filtered = likedBy.filter((userId) => userId !== loggedUserId);
    dispatch(feedPostsActions.setLikedBy({ postId, likedBy: [...filtered] }));
    try {
      await updatePost(postId, { likedBy: [...filtered] });
    } catch (e: unknown) {
      if (e instanceof Error) {
        setLikeErr(e.message);
      }
    }
  };

  return (
    <div className={styles.posts}>
      <Typography variant="h4" sx={{ width: 1 }}>
        Feed
      </Typography>
      <PostsList
        posts={feedPosts}
        postsLoading={feedPostsLoading}
        onlineUsers={onlineUsers}
        loggedUserId={loggedUserId}
        handleLikePost={handleLikePost}
        handleUnlikePost={handleUnlikePost}
        handleDelPost={handleDelPost}
      />
    </div>
  );
}
