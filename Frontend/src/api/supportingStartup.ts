import { API_ROUTE } from '@/constants';
import { Axios } from '@/libs/Axios';

const unAuthAxios = new Axios();
const authAxios = new Axios(true);

export const getSupportingStartups = async (
  skip: number,
  limit: number
) => {
  const res = await unAuthAxios.getByParams(
    API_ROUTE.SUPPORTING_STARTUP.GET_SUPPORTING_STARTUPS,
    {
      skip: skip,
      limit: limit,
    }
  );

  return res;
};
