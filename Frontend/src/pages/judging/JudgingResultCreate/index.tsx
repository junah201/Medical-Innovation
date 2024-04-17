import { useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';

import {
  getJudgingParticipantById,
  getJudgingResult,
  getMe,
} from '@/api';
import { QUERY } from '@/constants';
import { useCustomQuery } from '@/libs/Query';
import { Toast } from '@/libs/Toast';
import { JudgingPermission } from '@/types';

import Form from './Form';
import ParticipantInfo from './ParticipantInfo';

export const JudgingResultCreate = () => {
  const navigate = useNavigate();
  const { event_id, participant_id, nth } = useParams() as {
    [key: string]: string | number;
  };

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
              parseInt(event_id)
            );
          }
        );

        if (!JudgingPermission) return false;

        if (
          nth === '1' &&
          JudgingPermission.first_judging_permission ===
            true
        )
          return true;

        if (
          nth === '2' &&
          JudgingPermission.second_judging_permission ===
            true
        )
          return true;

        return false;
      };
      if (
        checkJudgingPermission(res.data.judging_permissions)
      )
        return;

      Toast('심사 권한이 없습니다.', 'error');
      navigate(-1);
    },
  });

  const {
    data: participant_data,
    isLoading: participant_is_loading,
  } = useCustomQuery(
    [
      QUERY.KEY.JUDGING_PARTICIPANT,
      'participant_id',
      participant_id,
    ],
    () => getJudgingParticipantById(participant_id),
    {
      retry: 0,
    }
  );

  const { data, isLoading } = useCustomQuery(
    ['JUDGING_RESULT', event_id, participant_id, nth],
    () => getJudgingResult(event_id, participant_id, nth),
    {
      retry: 0,
      disableErrorToast: true,
    }
  );

  return (
    <>
      <ParticipantInfo data={participant_data?.data} />
      {isLoading && participant_is_loading ? (
        <></>
      ) : (
        <Form
          event_id={event_id}
          form={
            nth === '1'
              ? participant_data?.data.event
                  .judging_1st_form_type || ''
              : participant_data?.data.event
                  .judging_2nd_form_type || ''
          }
          nth={nth}
          participant_id={participant_id}
          data={data?.data?.results || null}
        />
      )}
    </>
  );
};
