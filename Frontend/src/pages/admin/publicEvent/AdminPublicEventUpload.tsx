import { Button, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { uploadPublicEvent } from '@/api';
import PublicEventForm from '@/components/forms/PublicEventForm';
import { QUERY } from '@/constants';
import { RegisterField } from '@/constants/forms';
import { useCustomMutation } from '@/libs/Query';

export const AdminPublicEventUpload = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterField, any>({
    defaultValues: {},
  });

  const { mutate, isLoading } = useCustomMutation(
    (userInput: RegisterField) =>
      uploadPublicEvent(userInput),
    {
      SuccessMessage: '공개 행사가 업로드되었습니다.',
      SuccessQueryKey: QUERY.KEY.ALL_PUBLIC_EVENT,
      ErrorMessage: '공개 행사 업로드에 실패했습니다.',
      onSuccess: () => {
        navigate(-1);
      },
    }
  );

  return (
    <Grid container spacing={2} sx={{ mt: 1, mb: 1 }}>
      <Grid item xs={12}>
        <Typography variant="h5" fontWeight="bold">
          공개 행사 업로드
        </Typography>
      </Grid>
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
          variant="outlined"
          color={
            !Object.keys(errors)[0]
              ? 'primary'
              : 'secondary'
          }
        >
          공개 행사 업로드
        </Button>
      </Grid>
    </Grid>
  );
};
