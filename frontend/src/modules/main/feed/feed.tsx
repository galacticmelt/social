import { useEffect } from 'react';
import { Skeleton, Typography } from '@mui/material';
import SearchInput from './search-input/search-input';
import UsersList from './users-list/users-list';
import Posts from './posts/posts';
import { feedPostsActions } from '../../../store/features/feedPosts/feedPosts.slice';
import styles from './feed.module.scss';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

export default function Feed() {
  const { friends } = useAppSelector((state) => state.currentUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (friends) {
      const friendsIds = friends.map((friend) => friend._id);
      dispatch(feedPostsActions.setFeedPosts(friendsIds));
    }
    return () => {
      dispatch(feedPostsActions.unsetFeedPosts());
    };
  }, [friends]);

  return (
    <div className={styles.feed}>
      <div className={styles.leftColumn}>
        <Typography variant="h5">Search for new friends</Typography>
        <div className={styles.searchWrapper}>
          <SearchInput />
        </div>
        <UsersList />
      </div>
      <div className={styles.rightColumn}>
        <Posts />
      </div>
    </div>
  );
}
