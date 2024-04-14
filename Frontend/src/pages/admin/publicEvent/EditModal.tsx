import { Button, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';

import { updatePublicEventById } from '@/api';
import PublicEventForm from '@/components/forms/PublicEventForm';
import { QUERY } from '@/constants';
import { RegisterField } from '@/constants/forms';
import { useCustomMutation } from '@/libs/Query';
import { PublicEvent } from '@/types';

interface EditModalProps {
  row: PublicEvent;
}

const EditModal = ({ row }: EditModalProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterField, any>({
    defaultValues: {
      ...row,
    },
  });

  const { mutate, isLoading } = useCustomMutation(
    (userInput: RegisterField) =>
      updatePublicEventById(row.id, userInput),
    {
      SuccessMessage: `${row.id}번 공개 행사가 수정되었습니다.`,
      SuccessQueryKey: QUERY.KEY.ALL_PUBLIC_EVENT,
      ErrorMessage: `${row.id}번 공개 행사 수정에 실패했습니다.`,
    }
  );

  return (
    <Grid container spacing={1} sx={{ mt: 1, mb: 1 }}>
      <PublicEventForm control={control} />
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
