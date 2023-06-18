import { API_ROUTE } from '@/constants';
import { Axios } from '@/libs/Axios';

const unAuthAxios = new Axios();
const authAxios = new Axios(true);

export const getPublicEvents = async (skip: number, limit: number) => {
  const res = await unAuthAxios.getByParams(API_ROUTE.PUBLIC_EVENT.GET_PUBLIC_EVENTS, {
    skip: skip,
    limit: limit,
  });

  return res;
};

export const getPublicEventById = async (id: number | string) => {
  const res = await unAuthAxios.get(API_ROUTE.PUBLIC_EVENT.GET_PUBLIC_EVENT_BY_ID(id));

  return res;
};
