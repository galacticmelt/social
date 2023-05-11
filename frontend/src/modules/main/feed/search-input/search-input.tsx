import { TextField, InputAdornment } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function SearchInput() {
  return (
    <TextField
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <AccountCircleIcon />
          </InputAdornment>
        )
      }}
      variant="outlined"
      size="small"
      placeholder="Search"
      hiddenLabel
      sx={{ width: 1 }}
    />
  );
}
