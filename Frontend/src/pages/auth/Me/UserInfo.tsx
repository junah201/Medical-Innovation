import { Button, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { updateUserInfo } from '@/api';
import UserInfoUpdateForm from '@/components/forms/UserInfoUpdateForm';
import { RegisterField } from '@/constants/forms';
import { useCustomMutation } from '@/libs/Query';
import { User } from '@/types';

interface UserInfoProps {
  row: User;
}

const UserInfo = ({ row }: UserInfoProps) => {
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
    (userInput: RegisterField) => updateUserInfo(userInput),
    {
      SuccessMessage: `${row.name}님의 정보가 수정되었습니다.`,
      ErrorMessage: `${row.name}님의 정보 수정에 실패했습니다.`,
    }
  );

  return (
    <Grid container spacing={1} sx={{ mt: 1, mb: 1 }}>
      <Grid item xs={12}>
        <Typography variant="h3">내 정보</Typography>
      </Grid>
      <UserInfoUpdateForm control={control} />
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
              ? 'primary'
              : 'secondary'
          }
        >
          수정
        </Button>
      </Grid>
    </Grid>
  );
};

export default UserInfo;
