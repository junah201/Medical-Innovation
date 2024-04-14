import { Grid } from '@mui/material';
import { Control } from 'react-hook-form';

import { ControlInput } from '@/components/CustomInput';
import { INPUT, RegisterField } from '@/constants/forms';

interface SignupFormProps {
  control: Control<RegisterField, any>;
}

const SignupForm = ({ control }: SignupFormProps) => {
  const fields = [
    INPUT.NAME,
    INPUT.PHONE,
    INPUT.BIRTH,
    INPUT.EMAIL,
    INPUT.PASSWORD,
    INPUT.CONFIRM_PASSWORD,
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

export default SignupForm;
