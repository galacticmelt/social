import { TextField, Typography, Button } from '@mui/material';
import React from 'react';

export default function EditUserForm() {
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
