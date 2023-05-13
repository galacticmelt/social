import { useState } from 'react';
import { Typography, Box, CircularProgress, Avatar, Button } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import SchoolIcon from '@mui/icons-material/School';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { currentChatActions } from '../../../../store/features/currentChat/currentChat.slice';
import { chatsActions } from '../../../../store/features/chats/chats.slice';
import { stringAvatar, stringToColor, calculateAge } from '../../shared/helpers';
import styles from './user-info.module.scss';
import { profileActions } from '../../../../store/features/profile/profile.slice';

interface UserInfoProps {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  userLoading: boolean;
}

export default function UserInfo({ firstName, lastName, dateOfBirth, userLoading }: UserInfoProps) {
  const { loggedUserId } = useAppSelector((state) => state.auth);
  const { profileUserId } = useAppSelector((state) => state.profile);
  const { chats } = useAppSelector((state) => state.chats);

  const [editMode, setEditMode] = useState(false);

  const dispatch = useAppDispatch();

  const handleAddFriend = () => {
    dispatch(currentChatActions.initNewChat([profileUserId, loggedUserId])).then(() => {
      dispatch(chatsActions.setChats(loggedUserId));
      dispatch(profileActions.setProfile(profileUserId));
    });
  };

  const handleDeleteFriend = () => {
    const chat = chats.find((chat) => chat.friendId === profileUserId);
    if (chat) {
      dispatch(chatsActions.terminateChat(chat.chatId)).then(() => {
        dispatch(chatsActions.setChats(loggedUserId));
        dispatch(profileActions.setProfile(profileUserId));
      });
    }
  };

  if (userLoading) {
    return (
      <div className={styles.userInfo}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={styles.userInfo}>
      <div className={styles.avatarWrapper}>
        <Avatar
          variant="square"
          sx={{
            height: 1,
            width: 1,
            bgcolor: stringToColor(firstName, lastName),
            fontSize: '3rem'
          }}
        >
          {stringAvatar(firstName, lastName)}
        </Avatar>
      </div>
      <Box sx={{ display: 'flex', gap: '0.5rem' }}>
        <Typography variant="h5">{firstName}</Typography>
        <Typography variant="h5">{lastName}</Typography>
      </Box>
      <Typography variant="subtitle1">{calculateAge(dateOfBirth)} y.o</Typography>
      <Box sx={{ display: 'flex' }}>
        <PlaceIcon color="disabled" sx={{ mr: 0.4 }} />
        <Typography variant="subtitle1">City</Typography>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <SchoolIcon color="disabled" sx={{ mr: 1 }} />
        <Typography variant="subtitle1">School</Typography>
      </Box>
      {profileUserId === loggedUserId ? (
        <Button variant="outlined">Edit profile</Button>
      ) : chats.some((chat) => chat.friendId === profileUserId) ? (
        <Button variant="outlined" onClick={handleDeleteFriend}>
          Delete friend
        </Button>
      ) : (
        <Button variant="outlined" onClick={handleAddFriend}>
          Become friends
        </Button>
      )}
    </div>
  );
}
