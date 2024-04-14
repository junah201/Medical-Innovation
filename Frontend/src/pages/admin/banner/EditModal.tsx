import { Button, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';

import { updateBannerById } from '@/api';
import BannerForm from '@/components/forms/BannerForm';
import { QUERY } from '@/constants';
import { RegisterField } from '@/constants/forms';
import { useCustomMutation } from '@/libs/Query';
import { Banner } from '@/types';

interface EditModalProps {
  row: Banner;
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
      updateBannerById(row.id, userInput),
    {
      SuccessMessage: `${row.id}번 배너이 수정되었습니다.`,
      SuccessQueryKey: QUERY.KEY.ALL_BANNER,
      ErrorMessage: `${row.id}번 배너 수정에 실패했습니다.`,
    }
  );

  return (
    <Grid container spacing={1} sx={{ mt: 1, mb: 1 }}>
      <BannerForm control={control} />
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
