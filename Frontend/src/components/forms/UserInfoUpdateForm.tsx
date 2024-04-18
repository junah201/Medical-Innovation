import { Grid } from '@mui/material';
import { Control } from 'react-hook-form';

import { ControlInput } from '@/components/CustomInput';
import { INPUT, RegisterField } from '@/constants/forms';

interface UserInfoUpdateFormProps {
  control: Control<RegisterField, any>;
}

const UserInfoUpdateForm = ({
  control,
}: UserInfoUpdateFormProps) => {
  const fields = [
    INPUT.NAME,
    INPUT.EMAIL,
    INPUT.PHONE,
    INPUT.BIRTH,
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

export default UserInfoUpdateForm;
