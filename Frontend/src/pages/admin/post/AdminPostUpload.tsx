import {
  Button,
  Grid,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { uploadPostV2 } from '@/api';
import PostForm from '@/components/forms/PostForm';
import { QUERY } from '@/constants';
import { RegisterField } from '@/constants/forms';
import { useCustomMutation } from '@/libs/Query';

export const AdminPostUpload = () => {
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
      uploadPostV2(userInput),
    {
      SuccessMessage:
        '게시물이 업로드되었습니다.',
      SuccessQueryKey: QUERY.KEY.ALL_POST,
      ErrorMessage:
        '게시물 업로드에 실패했습니다.',
      onSuccess: () => {
        navigate(-1);
      },
    }
  );

  return (
    <Grid
      container
      spacing={1}
      sx={{ mt: 1, mb: 1 }}
    >
      <Grid item xs={12}>
        <Typography
          variant="h5"
          fontWeight="bold"
        >
          게시물 업로드
        </Typography>
      </Grid>
      <PostForm control={control} />
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
          게시물 업로드
        </Button>
      </Grid>
    </Grid>
  );
};
