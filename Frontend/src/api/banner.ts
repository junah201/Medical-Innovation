import { API_ROUTE, BANNER } from '@/constants';
import { Axios } from '@/libs/Axios';

const unAuthAxios = new Axios();
const authAxios = new Axios(true);

export const getActiveBanners = async () => {
  const res = await unAuthAxios.getByParams(
    API_ROUTE.BANNER.GET_ACTIVE_BANNERS,
    {
      skip: 0,
      limit: 1000,
    }
  );

  return res;
};

export const getBanners = async (skip: number, limit: number) => {
  const res = await authAxios.getByParams(
    API_ROUTE.BANNER.GET_BANNERS,
    {
      skip: skip,
      limit: limit,
    }
  );

  return res;
};
