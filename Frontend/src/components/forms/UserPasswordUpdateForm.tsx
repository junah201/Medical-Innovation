import { Grid } from '@mui/material';
import { Control } from 'react-hook-form';

import { ControlInput } from '@/components/CustomInput';
import { INPUT, RegisterField } from '@/constants/forms';

interface UserPasswordUpdateFormProps {
  control: Control<RegisterField, any>;
}

const UserPasswordUpdateForm = ({
  control,
}: UserPasswordUpdateFormProps) => {
  const fields = [
    INPUT.PASSWORD,
    INPUT.NEW_PASSWORD,
    INPUT.CONFIRM_NEW_PASSWORD,
  ];

  return (
    <>
      {fields.map((field) => (
        <Grid item xs={12} key={field.name}>
          <ControlInput control={control} {...field} />
        </Grid>
      ))}
    </>
  );
};

export default UserPasswordUpdateForm;
