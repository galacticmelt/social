import { Typography } from '@mui/material';
import { Post } from '../../../../../shared/types';
import PostItemSkeleton from '../post-item/post-item-skeleton';
import PostItem from '../post-item/post-item';
import { tenElemsMockArray } from '../../constants';
import { SocketUser } from '../../../../../store/features/socket/socket.types';
import styles from './posts-list.module.scss';

interface PostListProps {
  posts: Post[];
  postsLoading: boolean;
  onlineUsers: SocketUser[];
  loggedUserId: string;
  handleLikePost: (postId: string, likedBy: string[]) => void;
  handleUnlikePost: (postId: string, likedBy: string[]) => void;
  handleDelPost: (postId: string) => void;
}

export default function PostsList({
  posts,
  postsLoading,
  onlineUsers,
  loggedUserId,
  handleDelPost,
  handleLikePost,
  handleUnlikePost
}: PostListProps) {
  if (!posts.length && !postsLoading) {
    return <Typography>No posts yet</Typography>;
  }
  return (
    <div className={styles.postsList}>
      {postsLoading
        ? tenElemsMockArray.map((elem) => <PostItemSkeleton key={elem} />)
        : posts.map((post) => (
            <PostItem
              key={post._id}
              loggedUserId={loggedUserId}
              creatorId={post.creator._id}
              creatorFirstName={post.creator.firstName}
              creatorLastName={post.creator.lastName}
              createdAt={post.createdAt}
              postText={post.text}
              likesCount={post.likedBy.length}
              likedByLoggedUser={post.likedBy.some((userId) => userId === loggedUserId)}
              onlineUsers={onlineUsers}
              handleLikePost={() => handleLikePost(post._id, post.likedBy)}
              handleDelPost={() => handleDelPost(post._id)}
              handleUnlikePost={() => handleUnlikePost(post._id, post.likedBy)}
            />
          ))}
    </div>
  );
}
