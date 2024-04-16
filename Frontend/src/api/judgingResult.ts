import { API_ROUTE } from '@/constants';
import { Axios } from '@/libs/Axios';
import { JudgingResult, JudgingResultList } from '@/types';

const authAxios = new Axios(true);

export const getJudgingResult = async (
  EvendId: number | string,
  ParticipantId: number | string,
  nth: number | string
) => {
  const res = await authAxios.getByParams<JudgingResult>(
    API_ROUTE.JUDGING_RESULT.GET_JUDGING_RESULT,
    {
      judging_event_id: EvendId,
      participant_id: ParticipantId,
      nth: nth,
    }
  );

  return res;
};

export const submitJudgingResult = async (
  event_id: number | string,
  participant_id: number | string,
  nth: number | string,
  data: object
) => {
  const res = await authAxios.post(
    API_ROUTE.JUDGING_RESULT.SUBMIT_JUDGING_RESULT(
      event_id,
      participant_id,
      nth
    ),
    data
  );

  return res;
};

export const getJudgingResultsByEventId = async (
  id: number | string,
  skip: number,
  limit: number
) => {
  const res =
    await authAxios.getByParams<JudgingResultList>(
      API_ROUTE.JUDGING_RESULT.GET_JUDGING_RESULTS_BY_EVENT_ID(
        id
      ),
      {
        skip: skip,
        limit: limit,
      }
    );

  return res;
};

export const getJudgingResultById = async (
  id: number | string
) => {
  const res = await authAxios.get(
    API_ROUTE.JUDGING_RESULT.GET_JUDGING_RESULT_BY_ID(id)
  );

  return res;
};
