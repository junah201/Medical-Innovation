import { useParams } from 'react-router-dom';

import { getJudgingEventById } from '@/api';
import { useCustomQuery } from '@/libs/Query';

import Form from './Form';
import Info from './Info';

export const JudgingEventRegistration = () => {
  const params = useParams() as {
    [key: string]: string;
  };

  const { data, isLoading } = useCustomQuery(
    ['JUDGING_EVENT', params.event_id],
    () => getJudgingEventById(params.event_id),
    {
      retry: 0,
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
