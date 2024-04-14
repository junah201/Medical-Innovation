import { Grid } from '@mui/material';
import { Control } from 'react-hook-form';

import { ControlInput } from '@/components/CustomInput';
import { INPUT, RegisterField } from '@/constants/forms';

interface PostFormProps {
  control: Control<RegisterField, any>;
}

const PostForm = ({ control }: PostFormProps) => {
  const fields = [
    INPUT.POST_TITLE,
    INPUT.BOARD_ID,
    INPUT.POST_CONTENT,
    INPUT.POST_FILES,
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

export default PostForm;
