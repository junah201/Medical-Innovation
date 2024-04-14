import { Button, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';

import { updatePostByIdV2 } from '@/api';
import PostForm from '@/components/forms/PostForm';
import { QUERY } from '@/constants';
import { useCustomMutation } from '@/libs/Query';
import { Post } from '@/types';

interface EditModalProps {
  row: Post;
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
      updatePostByIdV2(row.id, userInput),
    {
      SuccessMessage: `${row.id}번 게시물이 수정되었습니다.`,
      SuccessQueryKey: QUERY.KEY.ALL_POST,
      ErrorMessage: `${row.id}번 게시물 수정에 실패했습니다.`,
    }
  );

  return (
    <Grid
      container
      spacing={1}
      sx={{ mt: 1, mb: 1 }}
    >
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
          variant="contained"
          color={
            !Object.keys(errors)[0]
              ? 'info'
              : 'secondary'
          }
        >
          수정
        </Button>
      </Grid>
    </Grid>
  );
};

export default EditModal;
