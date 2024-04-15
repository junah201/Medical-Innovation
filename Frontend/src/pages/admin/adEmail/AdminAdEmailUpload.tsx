import { Button, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { uploadBannerV2 } from '@/api';
import AdEmailForm from '@/components/forms/AdEmailFrom';
import { QUERY } from '@/constants';
import { RegisterField } from '@/constants/forms';
import { useCustomMutation } from '@/libs/Query';

export const AdminAdEmailUpload = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterField, any>({
    defaultValues: {},
  });

  const { mutate, isLoading } = useCustomMutation(
    (userInput: RegisterField) => uploadBannerV2(userInput),
    {
      SuccessMessage: '광고 이메일이 추가되었습니다.',
      SuccessQueryKey: QUERY.KEY.ALL_AD_EMALL,
      ErrorMessage: '광고 수신 이메일 추가에 실패했습니다.',
      onSuccess: () => {
        navigate(-1);
      },
    }
  );

  return (
    <Grid container spacing={2} sx={{ mt: 1, mb: 1 }}>
      <Grid item xs={12}>
        <Typography variant="h5" fontWeight="bold">
          광고 수신 이메일 추가
        </Typography>
      </Grid>
      <AdEmailForm control={control} />
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
          광고 수신 이메일 추가
        </Button>
      </Grid>
    </Grid>
  );
};
