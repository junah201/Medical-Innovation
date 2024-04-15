import { Grid } from '@mui/material';
import { useForm } from 'react-hook-form';

import Judging1stStandardForm from '@/components/forms/Judging1stStandardForm';
import ResearchPlanReviewForm from '@/components/forms/ResearchPlanReviewForm';
import { RegisterField } from '@/constants/forms';
import { JudgingResult } from '@/types';

interface EditModalProps {
  row: JudgingResult;
}

const DetailModal = ({ row }: EditModalProps) => {
  const { control } = useForm<RegisterField, any>({
    defaultValues: {
      ...row.results,
    },
  });

  return (
    <Grid container spacing={1} sx={{ mt: 1, mb: 1 }}>
      <Judging1stStandardForm control={control} />
    </Grid>
  );
};

export default DetailModal;
