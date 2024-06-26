import { Grid, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { getPublicEventById } from '@/api';
import { submitPublicEvnet } from '@/api/publicParticipant';
import { Message, PostContent } from '@/components';
import RegistForm from '@/components/forms/RegistForm';
import { QUERY } from '@/constants';
import { RegisterField } from '@/constants/forms';
import {
  useCustomMutation,
  useCustomQuery,
} from '@/libs/Query';
import { Toast } from '@/libs/Toast';

export const EventRegistration = () => {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };

  const { data } = useCustomQuery(
    [
      QUERY.KEY.PUBLIC_EVENT,
      {
        id: id,
      },
    ],
    () => getPublicEventById(id),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      onSuccess: (res) => {
        const now = new Date().toISOString().slice(0, 10);

        if (res.data.join_start_date > now) {
          Toast('아직 신청 기간이 아닙니다.', 'error');
          navigate(-1);
          return;
        }
        if (res.data.join_end_date < now) {
          Toast('신청 기간이 종료되었습니다.', 'error');
          navigate(-1);
          return;
        }
      },
    }
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterField, any>();

  const { mutate, isLoading } = useCustomMutation(
    (userInput) => submitPublicEvnet(id, userInput),
    {
      onSuccess: () => {
        navigate(-1);
      },
      SuccessMessage: '제출에 성공했습니다.',
      ErrorMessage: '제출에 실패했습니다.',
    }
  );

  return (
    <>
      <h1>참가 신청</h1>
      <Message>
        {data?.data && (
          <PostContent content={data.data.description} />
        )}
      </Message>
      <br />
      <form
        onSubmit={handleSubmit((userInput: RegisterField) =>
          mutate(userInput)
        )}
      >
        <Grid container spacing={2}>
          <RegistForm control={control} />
        </Grid>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isSubmitting || isLoading}
          color={
            !Object.keys(errors)[0]
              ? 'primary'
              : 'secondary'
          }
          sx={{
            color: '#ffffff',
            marginTop: '10px',
            borderRadius: '5px',
            fontSize: '20px',
          }}
        >
          신청하기
        </Button>
      </form>
    </>
  );
};
