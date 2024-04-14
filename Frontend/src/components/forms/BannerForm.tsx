import { Grid } from '@mui/material';
import { Control } from 'react-hook-form';

import { ControlInput } from '@/components/CustomInput';
import { INPUT, RegisterField } from '@/constants/forms';

interface BannerFormProps {
  control: Control<RegisterField, any>;
}

const BannerForm = ({ control }: BannerFormProps) => {
  const fields = [
    INPUT.BANNER_COMPANY_NAME,
    INPUT.BANNER_LINK,
    INPUT.BANNER_END_AT,
    INPUT.BANNER_IMAGE,
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

export default BannerForm;
