import { Grid } from '@mui/material';
import { Control } from 'react-hook-form';

import { ControlInput } from '@/components/CustomInput';
import { INPUT, RegisterField } from '@/constants/forms';

interface JudgingEventFormProps {
  control: Control<RegisterField, any>;
}

const JudgingEventForm = ({
  control,
}: JudgingEventFormProps) => {
  const fields = [
    INPUT.JUDGING_EVENT_NAME,
    INPUT.JUDGING_EVENT_DESCRIPTION,
    INPUT.JUDGING_EVENT_JOIN_START_DATE,
    INPUT.JUDGING_EVENT_JOIN_END_DATE,
    INPUT.JUDGING_EVENT_1ST_START_DATE,
    INPUT.JUDGING_EVENT_1ST_END_DATE,
    INPUT.JUDGING_EVENT_2ND_START_DATE,
    INPUT.JUDGING_EVENT_2ND_END_DATE,
    INPUT.JUDGING_EVENT_IMAGE,
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

export default JudgingEventForm;
