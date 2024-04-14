import { Grid } from '@mui/material';
import { Control } from 'react-hook-form';

import { ControlInput } from '@/components/CustomInput';
import { INPUT, RegisterField } from '@/constants/forms';

interface AdvisorFormProps {
  control: Control<RegisterField, any>;
}

const AdvisorForm = ({ control }: AdvisorFormProps) => {
  const fields = [
    INPUT.ADVISOR_NAME,
    INPUT.ADVISOR_TYPE,
    INPUT.ADVISOR_DESCRIPTION,
    INPUT.ADVISOR_PROFILE_IMAGE,
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

export default AdvisorForm;
