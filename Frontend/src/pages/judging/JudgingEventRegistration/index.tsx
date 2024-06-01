import { useNavigate, useParams } from 'react-router-dom';

import { getJudgingEventById } from '@/api';
import { useCustomQuery } from '@/libs/Query';
import { Toast } from '@/libs/Toast';

import Form from './Form';
import Info from './Info';

export const JudgingEventRegistration = () => {
  const navigate = useNavigate();
  const params = useParams() as {
    [key: string]: string;
  };

  const { data, isLoading } = useCustomQuery(
    ['JUDGING_EVENT', params.event_id],
    () => getJudgingEventById(params.event_id),
    {
      retry: 0,
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

  return (
    <>
      {isLoading || !data ? (
        <></>
      ) : (
        <Info data={data.data} />
      )}
      <Form event_id={params.event_id} />
    </>
  );
};
