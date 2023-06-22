import { API_ROUTE } from '@/constants';
import { Axios } from '@/libs/Axios';

const unAuthAxios = new Axios();
const authAxios = new Axios(true);

export const getAdvisors = async (skip = 0, limit = 1000) => {
  const res = await unAuthAxios.getByParams(
    API_ROUTE.ADVISOR.GET_ADVISORS,
    {
      skip: skip,
      limit: limit,
    }
  );

  return res;
};
