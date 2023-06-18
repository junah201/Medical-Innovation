import { API_ROUTE } from '@/constants';
import { Axios } from '@/libs/Axios';

const unAuthAxios = new Axios();
const authAxios = new Axios(true);

export const getMous = async () => {
  const res = await unAuthAxios.getByParams(API_ROUTE.MOU.GET_MOUS, {
    skip: 0,
    limit: 1000,
  });

  return res;
};
