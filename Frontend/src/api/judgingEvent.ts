import { API_ROUTE } from '@/constants';
import { Axios } from '@/libs/Axios';

const unAuthAxios = new Axios();
const authAxios = new Axios(true);

export const getJudgingEvents = async (
  skip: number,
  limit: number
) => {
  const res = await unAuthAxios.getByParams(
    API_ROUTE.JUDGING_EVENT.GET_JUDGING_EVENTS,
    {
      skip: skip,
      limit: limit,
    }
  );

  return res;
};

export const getJudgingEventById = async (id: number | string) => {
  const res = await unAuthAxios.get(
    API_ROUTE.JUDGING_EVENT.GET_JUDGING_EVENT_BY_ID(id)
  );

  return res;
};
