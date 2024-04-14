import { Button, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { uploadMou } from '@/api';
import MouForm from '@/components/forms/MouForm';
import { QUERY } from '@/constants';
import { RegisterField } from '@/constants/forms';
import { useCustomMutation } from '@/libs/Query';

export const AdminMouUpload = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterField, any>({
    defaultValues: {},
  });

  const { mutate, isLoading } = useCustomMutation(
    (userInput: RegisterField) => uploadMou(userInput),
    {
      SuccessMessage: 'MOU가 업로드되었습니다.',
      SuccessQueryKey: QUERY.KEY.ALL_MOU,
      ErrorMessage: 'MOU 업로드에 실패했습니다.',
      onSuccess: () => {
        navigate(-1);
      },
    }
  );

  return (
    <Grid container spacing={2} sx={{ mt: 1, mb: 1 }}>
      <Grid item xs={12}>
        <Typography variant="h5" fontWeight="bold">
          MOU 업로드
        </Typography>
      </Grid>
      <MouForm control={control} />
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
          MOU 업로드
        </Button>
      </Grid>
    </Grid>
  );
};
