import { Card, Box, Typography, IconButton } from '@mui/material';
import UserAvatar from '../user-avatar/user-avatar';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './post-item.module.scss';
import { normalizePostTime } from '../../helpers';
import { SocketUser } from '../../../../../store/features/socket/socket.types';

interface PostItemProps {
  loggedUserId: string;
  postText: string;
  postImage: string;
  creatorId: string;
  creatorFirstName: string;
  creatorLastName: string;
  createdAt: Date;
  likesCount: number;
  likedByLoggedUser: boolean;
  onlineUsers: SocketUser[];
  handleLikePost: () => void;
  handleUnlikePost: () => void;
  handleDelPost: () => void;
}

export default function PostItem({
  loggedUserId,
  postText,
  postImage,
  creatorId,
  creatorFirstName,
  creatorLastName,
  createdAt,
  likesCount,
  likedByLoggedUser,
  onlineUsers,
  handleLikePost,
  handleUnlikePost,
  handleDelPost
}: PostItemProps) {
  return (
    <Card
      sx={{
        width: 1,
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        border: '1px solid lightgray'
      }}
    >
      <div>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div className={styles.avatarWrapper}>
              <UserAvatar
                firstName={creatorFirstName}
                lastName={creatorLastName}
                isOnline={onlineUsers.some((onlineUser) => onlineUser.userId === creatorId)}
              />
            </div>
            <Typography variant="h6">
              {creatorFirstName} {creatorLastName}
            </Typography>
            <Typography variant="subtitle1">{normalizePostTime(createdAt)}</Typography>
          </Box>
          {loggedUserId === creatorId && (
            <IconButton onClick={handleDelPost}>
              <DeleteIcon color="disabled" />
            </IconButton>
          )}
        </Box>
      </div>
      {postImage && <img className={styles.postImage} src={postImage} />}
      <Typography variant="subtitle1">{postText}</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        {likedByLoggedUser ? (
          <IconButton onClick={handleUnlikePost}>
            <FavoriteIcon />
          </IconButton>
        ) : (
          <IconButton onClick={handleLikePost}>
            <FavoriteBorderIcon />
          </IconButton>
        )}
        <Typography variant="subtitle2">{likesCount}</Typography>
      </Box>
    </Card>
  );
}
