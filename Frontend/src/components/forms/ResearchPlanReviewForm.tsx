import { Grid } from '@mui/material';
import { Control } from 'react-hook-form';

import { ControlInput } from '@/components/CustomInput';
import { INPUT, RegisterField } from '@/constants/forms';

interface ResearchPlanReviewFormProps {
  control: Control<RegisterField, any>;
}

const ResearchPlanReviewForm = ({ control }: ResearchPlanReviewFormProps) => {
  const fields = [
    INPUT.RESEARCH_PLAN_SCORE_1,
    INPUT.RESEARCH_PLAN_SCORE_2,
    INPUT.RESEARCH_PLAN_SCORE_3,
    INPUT.RESEARCH_PLAN_SCORE_4,
    INPUT.RESEARCH_PLAN_SCORE_5,
    INPUT.RESEARCH_PLAN_COMMENT,
  ];

  return (
    <>
      {fields.map((field) => (
        <Grid item xs={12} key={field.name}>
          <ControlInput control={control} {...field} />
        </Grid>
      ))}
    </>
  );
};

export default ResearchPlanReviewForm;
