import { useAppSelector } from '../../../../store/hooks';
import { Typography } from '@mui/material';
import UserAvatar from '../../shared/components/user-avatar/user-avatar';
import { profileActions } from '../../../../store/features/profile/profile.slice';
import styles from './friends.module.scss';
import { useAppDispatch } from '../../../../store/hooks';
import FriendsSkeleton from './friends-skeleton';

export default function Friends() {
  const { friends, profileLoading } = useAppSelector((state) => state.profile);
  const { onlineUsers } = useAppSelector((state) => state.socket);
  const dispatch = useAppDispatch();

  const handleOpenProfile = (userId: string) => {
    dispatch(profileActions.setProfile(userId));
  };

  if (profileLoading) {
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
              className={`${styles.friendsGridItem} ${styles.hoverVisible}`}
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
