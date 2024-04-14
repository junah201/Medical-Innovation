import { Grid } from '@mui/material';
import { Control } from 'react-hook-form';

import { ControlInput } from '@/components/CustomInput';
import { INPUT, RegisterField } from '@/constants/forms';

interface RegistFormProps {
  control: Control<RegisterField, any>;
}

const RegistForm = ({ control }: RegistFormProps) => {
  const fields = [
    INPUT.NAME,
    INPUT.ENGLISH_NAME,
    INPUT.GENDER,
    INPUT.BIRTH,
    INPUT.PHONE,
    INPUT.EMAIL,
    INPUT.INTEREST_FIELD,
    INPUT.ORGANIZATION_TYPE,
    INPUT.ORGANIZATION_NAME,
    INPUT.ORGANIZATION_ENGLISH_NAME,
    INPUT.JOB_POSITION,
    INPUT.ADDRESS,
    INPUT.FINAL_DEGREE,
    INPUT.ENGAGEMENT_TYPE,
    INPUT.PARTICIPANT_MOTIVATION,
    INPUT.PARTICIPANT_TYPE,
    INPUT.INTEREST_DISEASE,
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

export default RegistForm;
