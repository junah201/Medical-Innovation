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

export const uploadJudgingEvent = async (
  name: string,
  description: string,
  join_start_date: string,
  join_end_date: string,
  judging_1st_start_date: string,
  judging_1st_end_date: string,
  judging_2nd_start_date: string,
  judging_2nd_end_date: string,
  file: string
) => {
  const res = await authAxios.post(
    API_ROUTE.JUDGING_EVENT.UPLOAD_JUDGING_EVENT,
    {
      name: name,
      description: description,
      join_start_date: join_start_date,
      join_end_date: join_end_date,
      judging_1st_start_date: judging_1st_start_date,
      judging_1st_end_date: judging_1st_end_date,
      judging_2nd_start_date: judging_2nd_start_date,
      judging_2nd_end_date: judging_2nd_end_date,
      thumbnail_filename: file,
    }
  );

  return res;
};

export const updateJudgingEventById = async (
  id: number | string,
  name: string,
  description: string,
  join_start_date: string,
  join_end_date: string,
  judging_1st_start_date: string,
  judging_1st_end_date: string,
  judging_2nd_start_date: string,
  judging_2nd_end_date: string,
  file: string
) => {
  const res = await authAxios.put(
    API_ROUTE.JUDGING_EVENT.UPDATE_JUDGING_EVENT_BY_ID(id),
    {
      name: name,
      description: description,
      join_start_date: join_start_date,
      join_end_date: join_end_date,
      judging_1st_start_date: judging_1st_start_date,
      judging_1st_end_date: judging_1st_end_date,
      judging_2nd_start_date: judging_2nd_start_date,
      judging_2nd_end_date: judging_2nd_end_date,
      thumbnail_filename: file,
    }
  );

  return res;
};
