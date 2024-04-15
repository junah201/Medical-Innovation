import { Grid } from '@mui/material';
import { Control } from 'react-hook-form';

import { ControlInput } from '@/components/CustomInput';
import { INPUT, RegisterField } from '@/constants/forms';

interface AdEmailFormProps {
  control: Control<RegisterField, any>;
}

const AdEmailForm = ({ control }: AdEmailFormProps) => {
  const fields = [INPUT.EMAIL, INPUT.AD_EMAIL_INFO];

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

export default AdEmailForm;
