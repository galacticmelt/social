import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Header from './header/header';
import { Outlet } from 'react-router-dom';
import { profileActions } from '../../store/features/profile/profile.slice';
import { chatsActions } from '../../store/features/chats/chats.slice';
import { allUsersActions } from '../../store/features/allUsers/allUsers.slice';
import { socketActions } from '../../store/features/socket/socket.slice';
import { currentChatActions } from '../../store/features/currentChat/currentChat.slice';
import styles from './main.module.scss';
import { currentUserActions } from '../../store/features/currentUser/currentUser.slice';

export default function Main() {
  const { loggedUserId } = useAppSelector((state) => state.auth);
  const { allUsersError } = useAppSelector((state) => state.allUsers);
  const { chatsError } = useAppSelector((state) => state.chats);
  const { initNewChatError, messagesError } = useAppSelector((state) => state.currentChat);
  const { profileError } = useAppSelector((state) => state.profile);
  const { userError } = useAppSelector((state) => state.currentUser);

  const errors = [
    allUsersError,
    chatsError,
    initNewChatError,
    messagesError,
    profileError,
    userError
  ];
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(profileActions.setProfile(loggedUserId));
    dispatch(currentUserActions.setCurrentUser(loggedUserId));
    dispatch(chatsActions.setChats(loggedUserId));
    dispatch(allUsersActions.setAllUsers());
    dispatch(socketActions.setSocket());
    dispatch(socketActions.sendUserId(loggedUserId));
    return () => {
      dispatch(socketActions.unsetSocket());
      dispatch(profileActions.unsetProfile());
      dispatch(chatsActions.unsetChats());
      dispatch(allUsersActions.unsetAllUsers());
      dispatch(currentChatActions.unsetCurrentChat());
      dispatch(socketActions.unsetLiveMessages());
    };
  }, []);

  useEffect(() => {
    if (errors.some((err) => err.status)) {
      const caughtError = errors.find((err) => err.status);
      throw new Error(caughtError?.value);
    }
  }, [errors]);

  return (
    <div className={styles.main}>
      <Header />
      <Outlet />
    </div>
  );
}
