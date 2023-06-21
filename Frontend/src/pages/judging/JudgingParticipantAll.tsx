import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';

import { getJudgingEventById, getMe } from '@/api';
import { Table, HtmlContent } from '@/components';
import { TABLE_CONFIG } from '@/constants/tableConfig';
import { JudgingEvent, JudgingPermission } from '@/types';

export const JudgingParticipantAll = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [eventDetail, setEventDetail] = useState<JudgingEvent>();

  useQuery('me', getMe, {
    retry: false,
    onSuccess: (res) => {
      const checkJudgingPermission = (
        JudgingPermissions: JudgingPermission[]
      ) => {
        if (JudgingPermissions === undefined) return false;
        if (JudgingPermissions.length === 0) return false;

        const JudgingPermission = JudgingPermissions.find(
          (permission) => {
            return (
              permission.judging_event_id ===
              parseInt(params.event_id)
            );
          }
        );

        if (!JudgingPermission) return false;

        if (
          JudgingPermission.first_judging_permission ||
          JudgingPermission.second_judging_permission
        )
          return true;

        return false;
      };

      if (checkJudgingPermission(res.data.judging_permissions))
        return;

      alert('심사 권한이 없습니다.');
      navigate(-1);
    },
  });

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
          <HtmlContent content={eventDetail.description} />
        </>
      )}
      <h1>심사 목록</h1>
      <Table
        id={params.event_id}
        {...TABLE_CONFIG.JUDGING_PARTICIPANT}
      />
    </>
  );
};
