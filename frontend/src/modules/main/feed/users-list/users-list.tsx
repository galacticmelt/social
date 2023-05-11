import UsersListItem from '../users-list-item/users-list-item';
import UsersListItemSkeleton from '../users-list-item/users-list-item-skeleton';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { Typography } from '@mui/material';
import { tenElemsMockArray } from '../../shared/constants';
import styles from './users-list.module.scss';
import { profileActions } from '../../../../store/features/profile/profile.slice';
import { useNavigate } from 'react-router-dom';

export default function UsersList() {
  const navigate = useNavigate();

  const { allUsers, allUsersLoading } = useAppSelector((state) => state.allUsers);
  const { onlineUsers } = useAppSelector((state) => state.socket);

  const dispatch = useAppDispatch();
  const handleOpenProfile = (userId: string) => {
    dispatch(profileActions.setProfile(userId));
    navigate('/');
  };

  if (!allUsers.length && !allUsersLoading) {
    return (
      <div className={styles.noUsers}>
        <Typography>Where&apos;s everybody gone?&#129300;</Typography>
      </div>
    );
  }
  return (
    <div
      className={allUsersLoading ? styles.usersList : `${styles.usersList} ${styles.scrollable}`}
    >
      {allUsersLoading ? (
        <>
          {tenElemsMockArray.map((elem) => {
            return <UsersListItemSkeleton key={elem} />;
          })}
        </>
      ) : (
        allUsers.map((user) => {
          return (
            <UsersListItem
              key={user._id}
              firstName={user.firstName}
              lastName={user.lastName}
              isOnline={onlineUsers.some((onlineUser) => onlineUser.userId === user._id)}
              onClick={() => handleOpenProfile(user._id)}
            />
          );
        })
      )}
    </div>
  );
}
