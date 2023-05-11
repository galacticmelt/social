import { useEffect, useState } from 'react';
import { Typography, TextField, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { profilePostsActions } from '../../../../store/features/profilePosts/profilePosts.slice';
import { createPost, deletePost, updatePost } from '../../../../api/posts-api';
import PostsList from '../../shared/components/posts-list/posts-list';
import styles from './posts.module.scss';

export default function Posts() {
  const { loggedUserId } = useAppSelector((state) => state.auth);
  const { profileUserId } = useAppSelector((state) => state.profile);
  const { profilePosts, profilePostsLoading } = useAppSelector((state) => state.profilePosts);
  const { onlineUsers } = useAppSelector((state) => state.socket);
  const [postText, setPostText] = useState('');
  const [createPostErr, setCreatePostErr] = useState(null);
  const [delPostErr, setDelPostErr] = useState(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(profilePostsActions.setProfilePosts(profileUserId));
    return () => {
      dispatch(profilePostsActions.unsetProfilePosts());
    };
  }, [profileUserId]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostText(e.currentTarget.value);
  };

  const handleCreatePost = async () => {
    try {
      const res = await createPost({
        creator: loggedUserId,
        text: postText
      });
      if (res) {
        dispatch(profilePostsActions.setProfilePosts(loggedUserId));
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        setCreatePostErr(e.message);
      }
    }
    setPostText('');
  };

  const handleDelPost = async (postId: string) => {
    try {
      const res = await deletePost(postId);
      if (res) {
        dispatch(profilePostsActions.setProfilePosts(loggedUserId));
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        setDelPostErr(e.message);
      }
    }
  };

  const handleLikePost = async (postId: string, likedBy: string[]) => {
    dispatch(profilePostsActions.setLikedBy({ postId, likedBy: [...likedBy, loggedUserId] }));
    try {
      await updatePost(postId, { likedBy: [...likedBy, loggedUserId] });
    } catch (e: unknown) {
      if (e instanceof Error) {
        setDelPostErr(e.message);
      }
    }
  };

  const handleUnlikePost = async (postId: string, likedBy: string[]) => {
    const filtered = likedBy.filter((userId) => userId !== loggedUserId);
    dispatch(profilePostsActions.setLikedBy({ postId, likedBy: [...filtered] }));
    try {
      await updatePost(postId, { likedBy: [...filtered] });
    } catch (e: unknown) {
      if (e instanceof Error) {
        setDelPostErr(e.message);
      }
    }
  };

  return (
    <div className={styles.posts}>
      <Typography variant="h5" sx={{ width: 1 }}>
        Posts
      </Typography>
      {profileUserId === loggedUserId && (
        <form className={styles.postForm}>
          <TextField multiline sx={{ width: 1 }} value={postText} onChange={handleTextChange} />
          <Button onClick={handleCreatePost}>Make a post</Button>
        </form>
      )}
      <PostsList
        posts={profilePosts}
        postsLoading={profilePostsLoading}
        onlineUsers={onlineUsers}
        loggedUserId={loggedUserId}
        handleLikePost={handleLikePost}
        handleUnlikePost={handleUnlikePost}
        handleDelPost={handleDelPost}
      />
    </div>
  );
}
