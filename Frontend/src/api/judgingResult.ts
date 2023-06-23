import { API_ROUTE } from '@/constants';
import { Axios } from '@/libs/Axios';
import { JudgingResult } from '@/types';

const unAuthAxios = new Axios();
const authAxios = new Axios(true);

export const getJudgingResult = async (
  EvendId: number | string,
  ParticipantId: number | string,
  nth: number | string
) => {
  const res = await authAxios.getByParams(
    API_ROUTE.JUDGING_RESULT.GET_JUDGING_RESULT,
    {
      judging_event_id: EvendId,
      participant_id: ParticipantId,
      nth: nth,
    }
  );

  return res;
};

export const submitJudgingResult = async (data: JudgingResult) => {
  const res = await authAxios.post(
    API_ROUTE.JUDGING_RESULT.SUBMIT_JUDGING_RESULT,
    data
  );

  return res;
};

export const getJudgingResultsByEventId = async (
  id: number | string,
  skip: number,
  limit: number
) => {
  const res = await authAxios.getByParams(
    API_ROUTE.JUDGING_RESULT.GET_JUDGING_RESULTS_BY_EVENT_ID(id),
    {
      skip: skip,
      limit: limit,
    }
  );

  return res;
};
