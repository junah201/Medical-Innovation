import { API_ROUTE } from '@/constants';
import { Axios } from '@/libs/Axios';

const unAuthAxios = new Axios();
const authAxios = new Axios(true);

export const getHistorys = async (skip: number, limit: number) => {
  const res = await unAuthAxios.getByParams(API_ROUTE.HISTORY.GET_HISTORIES, {
    skip: skip,
    limit: limit,
  });

  return res;
};
