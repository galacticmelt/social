import { Menu, MenuItem, Typography } from '@mui/material';
import { EMOJI_DECIMAL_CODES } from '../../../shared/constants';

interface EmojiBoardProps {
  anchorEl: HTMLElement | null;
  closeHandler: () => void;
  addEmojiHandler: (number: number) => void;
  open: boolean;
}

export default function EmojiBoard({
  anchorEl,
  closeHandler,
  addEmojiHandler,
  open
}: EmojiBoardProps) {
  return (
    <div>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={closeHandler}
        transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
        PaperProps={{
          elevation: 0,
          sx: {
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            height: 170,
            overflowY: 'scroll',
            '&::-webkit-scrollbar': {
              display: 'none'
            }
          }
        }}
      >
        {EMOJI_DECIMAL_CODES.map((code) => {
          return (
            <MenuItem key={code} onClick={() => addEmojiHandler(code)}>
              <Typography variant="subtitle1">{String.fromCodePoint(code)}</Typography>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
