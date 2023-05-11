import { Avatar, styled } from '@mui/material';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { stringAvatar, stringToColor } from '../../helpers';

interface UserAvatarProps {
  firstName: string;
  lastName: string;
  isOnline: boolean;
}

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
  }
}));

export default function UserAvatar({ firstName, lastName, isOnline }: UserAvatarProps) {
  if (!isOnline) {
    return (
      <Avatar sx={{ height: 1, width: 1, bgcolor: stringToColor(firstName, lastName) }}>
        {stringAvatar(firstName, lastName)}
      </Avatar>
    );
  }
  return (
    <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      variant="dot"
      sx={{ height: 1, width: 1 }}
    >
      <Avatar sx={{ height: 1, width: 1, bgcolor: stringToColor(firstName, lastName) }}>
        {stringAvatar(firstName, lastName)}
      </Avatar>
    </StyledBadge>
  );
}
