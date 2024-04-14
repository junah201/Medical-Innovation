import { Button, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import {
  getPublicParticipantById,
  updatePublicParticipantById,
} from '@/api';
import RegistForm from '@/components/forms/RegistForm';
import { QUERY } from '@/constants';
import { RegisterField } from '@/constants/forms';
import {
  useCustomMutation,
  useCustomQuery,
} from '@/libs/Query';

export const AdminPublicParticipantEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<RegisterField, any>();

  useCustomQuery(
    [
      QUERY.KEY.PUBLIC_PARTICIPANT,
      {
        id: id,
      },
    ],
    () => getPublicParticipantById(id),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      onSuccess: (res) => {
        Object.entries(res.data.application).forEach(
          ([key, value]) => {
            setValue(key, value);
          }
        );
      },
    }
  );

  const { mutate, isLoading } = useCustomMutation(
    (userInput) =>
      updatePublicParticipantById(id, userInput),
    {
      onSuccess: () => {
        navigate(-1);
      },
      SuccessMessage: '수정되었습니다.',
      ErrorMessage: '수정에 실패했습니다.',
    }
  );

  return (
    <>
      <h1>참가 신청 수정</h1>
      <form
        onSubmit={handleSubmit((userInput: RegisterField) =>
          mutate(userInput)
        )}
      >
        <Grid container spacing={2}>
          <RegistForm control={control} />
        </Grid>
        <Button
          color={
            !Object.keys(errors)[0]
              ? 'primary'
              : 'secondary'
          }
          variant="contained"
          fullWidth
          type="submit"
          disabled={isSubmitting || isLoading}
          sx={{
            color: '#ffffff',
            marginTop: '10px',
            borderRadius: '5px',
            fontSize: '20px',
          }}
        >
          수정하기
        </Button>
      </form>
    </>
  );
};
