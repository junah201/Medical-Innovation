import { Grid } from '@mui/material';
import { Control } from 'react-hook-form';

import { ControlInput } from '@/components/CustomInput';
import { INPUT, RegisterField } from '@/constants/forms';

interface MouFormProps {
  control: Control<RegisterField, any>;
}

const MouForm = ({ control }: MouFormProps) => {
  const fields = [
    INPUT.MOU_COMPANY_NAME,
    INPUT.MOU_COMPANY_LINK,
    INPUT.MOU_COMPANY_FILE,
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

export default MouForm;
