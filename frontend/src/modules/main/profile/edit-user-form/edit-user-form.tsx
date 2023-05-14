import React, { SetStateAction, useState } from 'react';
import { TextField, Button, ButtonGroup } from '@mui/material';
import { DateField, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { profileActions } from '../../../../store/features/profile/profile.slice';
import { updateUser } from '../../../../api/user-api';
import styles from './edit-user-form.module.scss';
import dayjs from 'dayjs';
import { currentUserActions } from '../../../../store/features/currentUser/currentUser.slice';

interface EditUserFormProps {
  handleToggleEditMode: () => void;
}

export default function EditUserForm({ handleToggleEditMode }: EditUserFormProps) {
  const { profileUserId, firstName, lastName, dateOfBirth, location, almaMater } = useAppSelector(
    (state) => state.profile
  );
  const dispatch = useAppDispatch();

  const [firstNameField, setFirstNameField] = useState(firstName);
  const [lastNameField, setLastNameField] = useState(lastName);
  const [birthDateField, setBirthDateField] = useState(dateOfBirth);
  const [locationField, setLocationField] = useState(location);
  const [almaMaterField, setAlmaMaterField] = useState(almaMater);

  const [editUserErr, setEditUserErr] = useState(null);

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    stateSetter: React.Dispatch<SetStateAction<unknown>>
  ) => {
    stateSetter(e.currentTarget.value);
  };

  const handleSubmitEdit = async () => {
    const editData = {
      firstName: firstNameField,
      lastName: lastNameField,
      dateOfBirth: birthDateField,
      location: locationField,
      almaMater: almaMaterField
    };
    try {
      const res = await updateUser(profileUserId, editData);
      if (res) {
        dispatch(profileActions.setProfile(profileUserId));
        dispatch(currentUserActions.setCurrentUser(profileUserId));
        handleToggleEditMode();
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        setEditUserErr(e.message);
      }
    }
  };

  return (
    <div className={styles.editUserForm}>
      <TextField
        variant="standard"
        size="small"
        placeholder="First Name"
        value={firstNameField}
        onChange={(e) => handleFieldChange(e, setFirstNameField)}
      />
      <TextField
        variant="standard"
        size="small"
        placeholder="Last Name"
        value={lastNameField}
        onChange={(e) => handleFieldChange(e, setLastNameField)}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateField
          variant="standard"
          size="small"
          placeholder="Date of birth"
          value={dayjs(birthDateField)}
          onChange={(date) => setBirthDateField(date)}
        />
      </LocalizationProvider>
      <TextField
        variant="standard"
        size="small"
        placeholder="Location"
        value={locationField}
        onChange={(e) => handleFieldChange(e, setLocationField)}
      />
      <TextField
        variant="standard"
        size="small"
        placeholder="Alma mater"
        value={almaMaterField}
        onChange={(e) => handleFieldChange(e, setAlmaMaterField)}
      />
      <ButtonGroup>
        <Button variant="text" onClick={handleSubmitEdit}>
          Apply
        </Button>
        <Button variant="text" onClick={handleToggleEditMode}>
          Cancel
        </Button>
      </ButtonGroup>
    </div>
  );
}

