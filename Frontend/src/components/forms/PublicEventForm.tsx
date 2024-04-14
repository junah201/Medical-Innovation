import { Grid } from '@mui/material';
import { Control } from 'react-hook-form';

import { ControlInput } from '@/components/CustomInput';
import { INPUT, RegisterField } from '@/constants/forms';

interface PublicEventFormProps {
  control: Control<RegisterField, any>;
}

const PublicEventForm = ({
  control,
}: PublicEventFormProps) => {
  const fields = [
    INPUT.PUBLIC_EVENT_NAME,
    INPUT.PUBLIC_EVENT_ENGLISH_NAME,
    INPUT.PUBLIC_EVENT_DESCRIPTION,
    INPUT.PUBLIC_EVENT_START_DATE,
    INPUT.PUBLIC_EVENT_END_DATE,
    INPUT.PUBLIC_EVENT_JOIN_START_DATE,
    INPUT.PUBLIC_EVENT_JOIN_END_DATE,
    INPUT.PUBLIC_EVENT_IMAGE,
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

export default PublicEventForm;
