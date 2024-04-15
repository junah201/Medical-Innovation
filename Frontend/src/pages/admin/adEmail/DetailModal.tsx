import { Grid } from '@mui/material';
import { useForm } from 'react-hook-form';

import AdEmailForm from '@/components/forms/AdEmailFrom';
import { RegisterField } from '@/constants/forms';
import { AdEmail } from '@/types';

interface EditModalProps {
  row: AdEmail;
}

const DetailModal = ({ row }: EditModalProps) => {
  const { control } = useForm<RegisterField, any>({
    defaultValues: {
      ...row,
    },
  });

  return (
    <Grid container spacing={1} sx={{ mt: 1, mb: 1 }}>
      <AdEmailForm control={control} />
    </Grid>
  );
};

export default DetailModal;
