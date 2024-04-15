import { Button, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';

import { updatePublicParticipantById } from '@/api';
import JudgingRegistForm from '@/components/forms/JudgingRegistForm';
import { QUERY } from '@/constants';
import { RegisterField } from '@/constants/forms';
import { useCustomMutation } from '@/libs/Query';
import { JudgingParticipant } from '@/types';

interface EditModalProps {
  row: JudgingParticipant;
}

const EditModal = ({ row }: EditModalProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterField, any>({
    defaultValues: {
      ...row.application,
    },
  });

  const { mutate, isLoading } = useCustomMutation(
    (userInput: RegisterField) =>
      updatePublicParticipantById(row.id, userInput),
    {
      SuccessMessage: `${row.id}번 심사 참가자가 수정되었습니다.`,
      SuccessQueryKey: QUERY.KEY.ALL_JUDGING_PARTICIPANT,
      ErrorMessage: `${row.id}번 심사 참가자 수정에 실패했습니다.`,
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
          수정
        </Button>
      </Grid>
    </Grid>
  );
};

export default EditModal;
