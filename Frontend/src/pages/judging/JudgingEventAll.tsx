import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { getJudgingEvents, getMe } from '@/api';
import { Events } from '@/components';
import { JudgingEventList, JudgingPermission } from '@/types';
import { Toast } from '@/libs/Toast';
import { AxiosResponse } from 'axios';

export const JudgingEventAll = () => {
  const [events, setEvents] = useState<JudgingEventList>();
  const navigate = useNavigate();

  useQuery('checkJudgingPermission', getMe, {
    retry: false,
    onSuccess: (res) => {
      const checkJudgingPermission = (
        JudgingPermissions: JudgingPermission[]
      ) => {
        if (JudgingPermissions === undefined) return false;
        if (JudgingPermissions.length === 0) return false;

        for (let i = 0; i < JudgingPermissions.length; i++) {
          if (
            JudgingPermissions[i].first_judging_permission ||
            JudgingPermissions[i].second_judging_permission
          ) {
            return true;
          }
        }

        return false;
      };

      if (checkJudgingPermission(res.data.judging_permissions))
        return;

      Toast('심사 권한이 없습니다.', 'error');
      navigate(-1);
    },
  });

  useQuery('judging_events', () => getJudgingEvents(0, 1000), {
    retry: false,
    onSuccess: (res: AxiosResponse) => {
      setEvents(res.data);
    },
  });

  return (
    <>
      <h1>심사 행사</h1>
      {events && (
        <Events
          events={events.items}
          itemToLink={(item) => {
            return `/judging/result/${item.id}/all`;
          }}
        />
      )}
    </>
  );
};
