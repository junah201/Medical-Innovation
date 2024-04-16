import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';

import { getJudgingEventById } from '@/api';
import { Table, HtmlContent, Message } from '@/components';
import { QUERY } from '@/constants';
import { TABLE_CONFIG } from '@/constants/tableConfig';
import { useCustomQuery } from '@/libs/Query';

import { JudgingTable } from './JudgingTable';

export const JudgingParticipantAll = () => {
  const { event_id } = useParams() as {
    event_id: string;
  };

  const { data, isLoading } = useCustomQuery(
    [QUERY.KEY.JUDGING_EVENT_BY_ID, event_id],
    () => getJudgingEventById(event_id),
    {
      retry: 0,
    }
  );

  if (isLoading || !data) {
    return <div>로딩 중</div>;
  }

  const event = data?.data;

  return (
    <>
      <h1>{event.name}</h1>
      <Message>
        <HtmlContent content={event.description} />
      </Message>
      <JudgingTable event_id={event_id} nth={1} />
      <JudgingTable event_id={event_id} nth={2} />
    </>
  );
};
