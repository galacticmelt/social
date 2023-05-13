import { useState } from 'react';
import { TextField, Typography, Button } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../../../store/hooks';

export default function EditUserForm() {
  const { location, almaMater } = useAppSelector(
    (state) => state.profile
  );
  const [locationField, setLocationField] = useState(location);
  const [almaMaterField, setAlmaMaterField] = useState(almaMater);

  return (
    <>
      <div>
        <TextField size="small" placeholder="First Name" />
        <TextField size="small" placeholder="Last Name" />
      </div>
      <TextField size="small" placeholder="Date of birth" />
      <TextField size="small" placeholder="City" />
      <TextField size="small" placeholder="School" />
      <Button>Apply</Button>
    </>
  );
}
