import { API_ROUTE } from '@/constants';
import { Axios } from '@/libs/Axios';

const unAuthAxios = new Axios();
const authAxios = new Axios(true);

export const getPrivateEvents = async (
  skip: number,
  limit: number
) => {
  const res = await unAuthAxios.getByParams(
    API_ROUTE.PRIVATE_EVENT.GET_PRIVATE_EVENTS,
    {
      skip: skip,
      limit: limit,
    }
  );

  return res;
};

export const getPrivateEventById = async (id: number | string) => {
  const res = await unAuthAxios.get(
    API_ROUTE.PRIVATE_EVENT.GET_PRIVATE_EVENT_BY_ID(id)
  );

  return res;
};

export const uploadPrivateEvent = async (
  name: string,
  description: string,
  joinStartDate: string,
  joinEndDate: string
) => {
  const res = await authAxios.post(
    API_ROUTE.PRIVATE_EVENT.UPLOAD_PRIVATE_EVENT,
    {
      name: name,
      description: description,
      join_start_date: joinStartDate,
      join_end_date: joinEndDate,
    }
  );

  return res;
};

export const updatePrivateEventById = async (
  id: number | string,
  name: string,
  description: string,
  joinStartDate: string,
  joinEndDate: string
) => {
  const res = await authAxios.put(
    API_ROUTE.PRIVATE_EVENT.UPDATE_PRIVATE_EVENT_BY_ID(id),
    {
      name: name,
      description: description,
      join_start_date: joinStartDate,
      join_end_date: joinEndDate,
    }
  );

  return res;
};
