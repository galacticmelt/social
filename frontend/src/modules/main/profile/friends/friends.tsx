import { Typography } from '@mui/material';
import UserAvatar from '../../shared/components/user-avatar/user-avatar';
import { Friend } from '../../../../shared/types';
import { SocketUser } from '../../../../store/features/socket/socket.types';
import { profileActions } from '../../../../store/features/profile/profile.slice';
import styles from './friends.module.scss';
import { useAppDispatch } from '../../../../store/hooks';
import FriendsSkeleton from './friends-skeleton';

interface FriendsGridProps {
  friends: Friend[];
  onlineUsers: SocketUser[];
  friendsLoading: boolean;
}

export default function Friends({ friends, onlineUsers, friendsLoading }: FriendsGridProps) {
  const dispatch = useAppDispatch();

  const handleOpenProfile = (userId: string) => {
    dispatch(profileActions.setProfile(userId));
  };

  if (friendsLoading) {
    return <FriendsSkeleton />;
  }

  return (
    <div className={styles.friends}>
      <Typography variant="h5" sx={{ width: 1 }}>
        Friends:
      </Typography>
      {!friends.length && <Typography>No friends</Typography>}
      <div className={styles.friendsGrid}>
        {friends.map((friend) => {
          return (
            <div
              className={styles.friendsGridItem}
              key={friend._id}
              onClick={() => handleOpenProfile(friend._id)}
            >
              <div className={styles.avatarWrapper}>
                <UserAvatar
                  firstName={friend.firstName}
                  lastName={friend.lastName}
                  isOnline={onlineUsers.some((user) => user.userId === friend._id)}
                />
              </div>
              <div>
                <Typography variant="subtitle2">{friend.firstName}</Typography>
                <Typography variant="subtitle2">{friend.lastName}</Typography>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
