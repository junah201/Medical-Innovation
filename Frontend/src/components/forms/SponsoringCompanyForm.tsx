import { Grid } from '@mui/material';
import { Control } from 'react-hook-form';

import { ControlInput } from '@/components/CustomInput';
import { INPUT, RegisterField } from '@/constants/forms';

interface SponsoringCompanyFormProps {
  control: Control<RegisterField, any>;
}

const SponsoringCompanyForm = ({
  control,
}: SponsoringCompanyFormProps) => {
  const fields = [
    INPUT.SPONSORING_COMPANY_NAME,
    INPUT.SPONSORING_COMPANY_LINK,
    INPUT.SPONSORING_COMPANY_YEAR,
    INPUT.SPONSORING_COMPANY_FILE,
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

export default SponsoringCompanyForm;
