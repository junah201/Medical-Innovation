import { Button, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { updateUserPassword } from '@/api';
import UserPasswordUpdateForm from '@/components/forms/UserPasswordUpdateForm';
import { RegisterField } from '@/constants/forms';
import { useCustomMutation } from '@/libs/Query';
import { User } from '@/types';

interface UserPasswordProps {
  row: User;
}

const UserPassword = ({ row }: UserPasswordProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterField, any>();

  const { mutate, isLoading } = useCustomMutation(
    (userInput: RegisterField) =>
      updateUserPassword(userInput),
    {
      SuccessMessage: `${row.name}님의 비밀번호가 수정되었습니다.`,
      ErrorMessage: `${row.name}님의 비밀번호 수정에 실패했습니다.`,
    }
  );

  return (
    <Grid container spacing={1} sx={{ mt: 1, mb: 1 }}>
      <Grid item xs={12}>
        <Typography variant="h3">비밀번호 수정</Typography>
      </Grid>
      <UserPasswordUpdateForm control={control} />
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
          비밀번호 수정
        </Button>
      </Grid>
    </Grid>
  );
};

export default UserPassword;
