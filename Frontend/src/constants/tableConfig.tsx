import { Link } from 'react-router-dom';

import { getJudgingParticipants } from '@/api';
import { StatusButton } from '@/components';
import { JudgingParticipant } from '@/types';

const JUDGING_PARTICIPANTS = Object.freeze({
  headers: [
    '이름',
    '이메일',
    '소속',
    '직위',
    '1차 심사 여부',
    '1차 심사',
    '2차 심사 여부',
    '2차 심사',
  ],
  size: 40,
  getDatas: async (
    eventId: number | string,
    page: number,
    size: number
  ) => {
    return getJudgingParticipants(eventId, page, size);
  },
  itemToElement: (item: JudgingParticipant, id: number) => {
    return (
      <tr>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.organization_name}</td>
        <td>{item.job_position}</td>
        <td>
          {item.first_judging_result ? (
            <StatusButton color="green">
              심사 완료 ({item.first_judging_result?.total_score}
              점)
            </StatusButton>
          ) : (
            <StatusButton color="gray">미심사</StatusButton>
          )}
        </td>
        <td>
          <Link to={`/judging/result/${id}/${item.id}/1/create`}>
            심사하기
          </Link>
        </td>
        <td>
          {item.second_judging_result ? (
            <StatusButton color="green">
              심사 완료 ({item.second_judging_result?.total_score}
              점)
            </StatusButton>
          ) : (
            <StatusButton color="gray">미심사</StatusButton>
          )}
        </td>
        <td>
          <Link to={`/judging/result/${id}/${item.id}/2/create`}>
            심사하기
          </Link>
        </td>
      </tr>
    );
  },
});

export const TABLE_CONFIG = Object.freeze({ JUDGING_PARTICIPANTS });
