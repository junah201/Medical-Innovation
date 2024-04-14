import { Button, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';

import { updateSponsoringCompanyById } from '@/api';
import SponsoringCompanyForm from '@/components/forms/SponsoringCompanyForm';
import { QUERY } from '@/constants';
import { RegisterField } from '@/constants/forms';
import { useCustomMutation } from '@/libs/Query';
import { SponsoringCompany } from '@/types';

interface EditModalProps {
  row: SponsoringCompany;
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
      updateSponsoringCompanyById(row.id, userInput),
    {
      SuccessMessage: `${row.id}번 후원 기업이 수정되었습니다.`,
      SuccessQueryKey: QUERY.KEY.ALL_SPONSORING_COMPANY,
      ErrorMessage: `${row.id}번 후원 기업 수정에 실패했습니다.`,
    }
  );

  return (
    <Grid container spacing={1} sx={{ mt: 1, mb: 1 }}>
      <SponsoringCompanyForm control={control} />
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
