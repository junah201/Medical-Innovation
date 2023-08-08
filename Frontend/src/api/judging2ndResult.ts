import { API_ROUTE } from '@/constants';
import { Axios } from '@/libs/Axios';
import { Judging2ndResult } from '@/types';

const unAuthAxios = new Axios();
const authAxios = new Axios(true);

export const getJudging2ndResult = async (
  EvendId: number | string,
  ParticipantId: number | string,
  nth: number | string
) => {
  const res = await authAxios.getByParams(
    API_ROUTE.JUDGING_2ND_RESULT.GET_JUDGING_RESULT,
    {
      judging_event_id: EvendId,
      participant_id: ParticipantId,
      nth: nth,
    }
  );

  return res;
};

export const submitJudging2ndResult = async (
  data: Judging2ndResult
) => {
  const res = await authAxios.post(
    API_ROUTE.JUDGING_2ND_RESULT.SUBMIT_JUDGING_RESULT,
    data
  );

  return res;
};

export const getJudging2ndResultsByEventId = async (
  id: number | string,
  skip: number,
  limit: number
) => {
  const res = await authAxios.getByParams(
    API_ROUTE.JUDGING_2ND_RESULT.GET_JUDGING_RESULTS_BY_EVENT_ID(id),
    {
      skip: skip,
      limit: limit,
    }
  );

  return res;
};

export const getJudging2ndResultById = async (
  id: number | string
) => {
  const res = await authAxios.get(
    API_ROUTE.JUDGING_2ND_RESULT.GET_JUDGING_RESULT_BY_ID(id)
  );

  return res;
};

export const deleteJudging2ndResultById = async (
  id: number | string
) => {
  const res = await authAxios.delete(
    API_ROUTE.JUDGING_2ND_RESULT.DELETE_JUDGING_RESULT_BY_ID(id)
  );

  return res;
};
