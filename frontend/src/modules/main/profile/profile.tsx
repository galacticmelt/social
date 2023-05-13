import { useEffect } from 'react';
import styles from './profile.module.scss';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import UserInfo from './user-info/user-info';
import Friends from './friends/friends';
import { profilePostsActions } from '../../../store/features/profilePosts/profilePosts.slice';
import Posts from './posts/posts';

export default function Profile() {
  const { profileUserId, firstName, lastName, dateOfBirth, friends, profileLoading } =
    useAppSelector((state) => state.profile);
  const { onlineUsers } = useAppSelector((state) => state.socket);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(profilePostsActions.setProfilePosts(profileUserId));
    return () => {
      dispatch(profilePostsActions.unsetProfilePosts());
    };
  }, [profileUserId]);

  return (
    <div className={styles.profile}>
      <div className={styles.leftColumn}>
        <UserInfo
          firstName={firstName}
          lastName={lastName}
          dateOfBirth={dateOfBirth}
          userLoading={profileLoading}
        />
        <Friends friends={friends} onlineUsers={onlineUsers} friendsLoading={profileLoading} />
      </div>
      <div className={styles.rightColumn}>
        <Posts />
      </div>
    </div>
  );
}
