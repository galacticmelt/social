import { useEffect, useState } from 'react';
import { Typography, TextField, IconButton, ButtonGroup } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import CreateIcon from '@mui/icons-material/Create';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { profilePostsActions } from '../../../../store/features/profilePosts/profilePosts.slice';
import { createPost, deletePost, updatePost } from '../../../../api/posts-api';
import { convertToBase64 } from '../../shared/helpers';
import deleteIcon from '../../../../assets/red_circle.png';
import PostsList from '../../shared/components/posts-list/posts-list';
import styles from './posts.module.scss';

export default function Posts() {
  const { loggedUserId } = useAppSelector((state) => state.auth);
  const { profileUserId } = useAppSelector((state) => state.profile);
  const { profilePosts, profilePostsLoading } = useAppSelector((state) => state.profilePosts);
  const { onlineUsers } = useAppSelector((state) => state.socket);

  const [postText, setPostText] = useState('');
  const [postImage, setPostImage] = useState<string | null | undefined>(null);
  const [createPostErr, setCreatePostErr] = useState(null);
  const [delPostErr, setDelPostErr] = useState(null);
  const [postImageErr, setPostImageErr] = useState(null);

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
        text: postText,
        image: postImage
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
    setPostImage(null);
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

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostImageErr(null);
    const file = e.currentTarget.files?.[0];
    if (file) {
      convertToBase64(file)
      .then((based) => setPostImage(based))
      .catch((err) => setPostImageErr(err));
    }
  };

  const handleDeleteImage = () => {
    setPostImage(null);
  };

  return (
    <div className={styles.posts}>
      <Typography variant="h5" sx={{ width: 1 }}>
        Posts
      </Typography>
      {profileUserId === loggedUserId && (
        <form className={styles.postForm}>
          <TextField
            multiline
            sx={{ width: 1 }}
            value={postText}
            onChange={handleTextChange}
            placeholder="Type what is on your mind..."
          />
          <ButtonGroup sx={{ display: 'flex', alignItems: 'center' }}>
            {postImageErr && <Typography>{postImageErr}</Typography>}
            {postImage && (
              <div className={styles.postImageWrapper}>
                <img
                  className={styles.postImageDelete}
                  src={deleteIcon}
                  onClick={handleDeleteImage}
                />
                <img className={styles.postImage} src={postImage} />
              </div>
            )}
            <IconButton component="label">
              <ImageIcon />
              <input type="file" hidden onChange={handleUploadImage} />
            </IconButton>
            <IconButton onClick={handleCreatePost}>
              <CreateIcon />
            </IconButton>
          </ButtonGroup>
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
