import { Button, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';

import {
  updatePublicEventById,
  updatePublicParticipantById,
} from '@/api';
import RegistForm from '@/components/forms/RegistForm';
import { QUERY } from '@/constants';
import { RegisterField } from '@/constants/forms';
import { useCustomMutation } from '@/libs/Query';
import { PublicParticipant } from '@/types';

interface EditModalProps {
  row: PublicParticipant;
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
      SuccessMessage: `${row.id}번 공개 참가자가 수정되었습니다.`,
      SuccessQueryKey: QUERY.KEY.ALL_PUBLIC_PARTICIPANT,
      ErrorMessage: `${row.id}번 공개 참가자 수정에 실패했습니다.`,
    }
  );

  return (
    <Grid container spacing={1} sx={{ mt: 1, mb: 1 }}>
      <RegistForm control={control} />
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
