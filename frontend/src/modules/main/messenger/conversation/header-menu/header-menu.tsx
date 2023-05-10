import { Menu, MenuItem, Typography } from '@mui/material';

interface HeaderMenuProps {
  anchorEl: HTMLElement | null;
  closeHandler: () => void;
  open: boolean;
  options: {
    name: string;
    handler: (arg: unknown) => void;
  }[];
}

export default function HeaderMenu({ anchorEl, closeHandler, open, options }: HeaderMenuProps) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClick={closeHandler}
      onClose={closeHandler}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0
          }
        }
      }}
    >
      {options.map((option, i) => {
        return (
          <MenuItem key={i} onClick={option.handler}>
            <Typography variant="subtitle2">{option.name}</Typography>
          </MenuItem>
        );
      })}
    </Menu>
  );
}
