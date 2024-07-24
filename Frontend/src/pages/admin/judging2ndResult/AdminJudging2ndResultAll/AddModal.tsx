import { Button, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { submitJudging2ndResult } from '@/api/judging2ndResult';
import {
  BasicInput,
  ControlInput,
} from '@/components/CustomInput';
import { INPUT_TYPE, REGISTER_TYPE } from '@/constants';
import { INPUT, RegisterField } from '@/constants/forms';
import { useCustomMutation } from '@/libs/Query';
import { Toast } from '@/libs/Toast';
import { Judging2ndResultSubmitInfo } from '@/types';

import { BioForm, TechForm } from './forms';

interface AddModalProps {
  event_id: number;
}

const AddModal = ({ event_id }: AddModalProps) => {
  const navigate = useNavigate();

  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterField, any>({
    defaultValues: {
      judging_event_id: event_id,
    },
  });

  const { mutate } = useCustomMutation(
    (userInput) => {
      const data: Judging2ndResultSubmitInfo = {
        ...userInput,
        judging_event_id: event_id,
      };

      return submitJudging2ndResult(data);
    },
    {
      SuccessMessage: '업로드 완료',
      ErrorMessage: '업로드에 실패했습니다.',
    }
  );

  const onValid = (userInput: RegisterField) =>
    mutate(userInput);

  return (
    <Grid container spacing={1} sx={{ mt: 1, mb: 1 }}>
      <Grid item xs={12}>
        <ControlInput
          control={control}
          name="심사종류"
          label="심사 종류"
          helperText="심사 종류를 선택해주세요."
          type={INPUT_TYPE.SELECT}
          options={[
            { value: 'bio', label: '바이오' },
            { value: 'tech', label: '테크' },
          ]}
        />
      </Grid>
      <Grid item xs={12}>
        <ControlInput
          control={control}
          {...INPUT.USER_ID}
        />
      </Grid>
      <Grid item xs={12}>
        <ControlInput
          control={control}
          {...INPUT.PARTICIPANT_ID}
        />
      </Grid>
      <Grid item xs={12}>
        {watch()['심사종류'] === 'bio' ? (
          <BioForm register={register} errors={errors} />
        ) : (
          <TechForm register={register} errors={errors} />
        )}
      </Grid>
      <Grid item xs={12}>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isSubmitting}
          onClick={handleSubmit(
            (userInput: RegisterField) => onValid(userInput)
          )}
        >
          업로드
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddModal;
