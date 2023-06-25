import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';

import { getJudgingEventById, getMe } from '@/api';
import { Table, HtmlContent, Message } from '@/components';
import { TABLE_CONFIG } from '@/constants/tableConfig';
import { JudgingEvent, JudgingPermission } from '@/types';

export const JudgingParticipantAll = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [eventDetail, setEventDetail] = useState<JudgingEvent>();

  useQuery(
    'JudgingEventDetail',
    () => getJudgingEventById(params.event_id),
    {
      retry: false,
      onSuccess: (res) => {
        setEventDetail(res.data);
      },
    }
  );

  return (
    <>
      {eventDetail && (
        <>
          <h1>{eventDetail.name || '로딩 중'}</h1>
          <Message>
            <HtmlContent content={eventDetail.description} />
          </Message>
        </>
      )}
      <h1>1차 심사 목록</h1>
      <Table
        queryId="judging_1st_participant"
        id={params.event_id}
        {...TABLE_CONFIG.JUDGING_1ST_PARTICIPANT}
      />
      <h1>2차 심사 목록</h1>
      <Table
        queryId="judging_2nd_participant"
        id={params.event_id}
        {...TABLE_CONFIG.JUDGING_2ND_PARTICIPANT}
      />
    </>
  );
};
