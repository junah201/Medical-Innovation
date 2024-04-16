import { Button, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';

import { submitJudgingEvent } from '@/api';
import JudgingRegistForm from '@/components/forms/JudgingRegistForm';
import { RegisterField } from '@/constants/forms';
import { useCustomMutation } from '@/libs/Query';

interface FormProps {
  event_id: string;
}

const Form = ({ event_id }: FormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterField, any>();

  const { mutate, isLoading } = useCustomMutation(
    (userInput: RegisterField) =>
      submitJudgingEvent(event_id, userInput),
    {
      SuccessMessage: '제출되었습니다.',
      ErrorMessage: '제출 실패했습니다.',
    }
  );

  return (
    <Grid container spacing={1} sx={{ mt: 1, mb: 1 }}>
      <JudgingRegistForm control={control} />
      <Grid item xs={12}>
        <Button
          fullWidth
          onClick={handleSubmit((userInput) =>
            mutate(userInput)
          )}
          disabled={isLoading || isSubmitting}
          disableElevation
          size="large"
          variant="contained"
          color={
            !Object.keys(errors)[0] ? 'info' : 'secondary'
          }
        >
          제출하기
        </Button>
      </Grid>
    </Grid>
  );
};

export default Form;
