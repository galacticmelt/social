import { AppBar, Typography, Tooltip, IconButton, Box, Avatar } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { authActions } from '../../../store/features/auth/auth.slice';
import { stringAvatar, stringToColor } from '../shared/helpers';
import styles from './header.module.scss';
import { profileActions } from '../../../store/features/profile/profile.slice';

export default function Header() {
  const { loggedUserId } = useAppSelector((state) => state.auth);
  const { firstName, lastName } = useAppSelector((state) => state.currentUser);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(authActions.logOut());
  };
  const handleNavFeed = () => {
    navigate('/feed');
  };
  const handleNavMessenger = () => {
    navigate('/messenger');
  };
  const handleNavHome = () => {
    dispatch(profileActions.setProfile(loggedUserId));
    navigate('/');
  };
  return (
    <AppBar position="fixed" sx={{ height: '3rem' }}>
      <div className={styles.headerContentWrapper}>
        <Typography>WOW</Typography>
        <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Typography sx={{ cursor: 'pointer' }} onClick={handleNavFeed}>
            Feed
          </Typography>
          <Typography sx={{ cursor: 'pointer' }} onClick={handleNavMessenger}>
            Messenger
          </Typography>
          <Box sx={{ height: '2rem', width: '2rem' }}>
            <Avatar
              sx={{
                height: 1,
                width: 1,
                bgcolor: stringToColor(firstName, lastName),
                cursor: 'pointer'
              }}
              onClick={handleNavHome}
            >
              {stringAvatar(firstName, lastName)}
            </Avatar>
          </Box>
          <Tooltip title="Log out" arrow>
            <IconButton onClick={handleLogOut} size="small">
              <LogoutIcon sx={{ color: 'white' }} />
            </IconButton>
          </Tooltip>
        </Box>
      </div>
    </AppBar>
  );
}
