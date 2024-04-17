import { Button, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { submitJudgingResult } from '@/api';
import Judging1stStandardForm from '@/components/forms/Judging1stStandardForm';
import ResearchPlanReviewForm from '@/components/forms/ResearchPlanReviewForm';
import { QUERY } from '@/constants';
import { RegisterField } from '@/constants/forms';
import { useCustomMutation } from '@/libs/Query';

interface FormProps {
  event_id: number | string;
  nth: number | string;
  participant_id: number | string;
  data: object | null;
  form: string;
}

const Form = ({
  event_id,
  nth,
  participant_id,
  data,
  form,
}: FormProps) => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterField, any>({
    defaultValues: {
      ...data,
    },
  });

  const { mutate, isLoading } = useCustomMutation(
    (userInput) =>
      submitJudgingResult(
        event_id,
        participant_id,
        nth,
        userInput
      ),
    {
      onSuccess: () => navigate(-1),
      SuccessMessage: '제출에 성공했습니다.',
      ErrorMessage: '제출에 실패했습니다.',
      SuccessQueryKey: QUERY.KEY.JUDGING_PARTICIPANT,
    }
  );

  return (
    <Grid container spacing={2} mt={2}>
      {form === '기본' ? (
        <Judging1stStandardForm control={control} />
      ) : (
        <ResearchPlanReviewForm control={control} />
      )}
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
