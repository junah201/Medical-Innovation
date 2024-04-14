import { API_ROUTE } from '@/constants';
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

export const getBanners = async (
  skip: number,
  limit: number
) => {
  const res = await authAxios.getByParams(
    API_ROUTE.BANNER.GET_BANNERS,
    {
      skip: skip,
      limit: limit,
    }
  );

  return res;
};

export const uploadBanner = async (
  name: string,
  link: string,
  filename: string,
  banner_end_at: string
) => {
  const res = await authAxios.post(
    API_ROUTE.BANNER.UPLOAD_BANNER,
    {
      name: name,
      link: link,
      filename: filename,
      banner_end_at: banner_end_at,
    }
  );

  return res;
};

interface BannerCreate {
  name: string;
  link: string;
  filename: string;
  banner_end_at: string;
}

export const uploadBannerV2 = async (
  userInput: BannerCreate
) => {
  const res = await authAxios.post(
    API_ROUTE.BANNER.UPLOAD_BANNER,
    userInput
  );

  return res;
};

export const deleteBannerById = async (
  id: number | string
) => {
  const res = await authAxios.delete(
    API_ROUTE.BANNER.DELETE_BANNER_BY_ID(id)
  );

  return res;
};

export const getBannerById = async (
  id: number | string
) => {
  const res = await authAxios.get(
    API_ROUTE.BANNER.GET_BANNER_BY_ID(id)
  );

  return res;
};

type BannerUpdate = BannerCreate;

export const updateBannerById = async (
  id: number | string,
  userInput: BannerUpdate
) => {
  const res = await authAxios.put(
    API_ROUTE.BANNER.UPDATE_BANNER_BY_ID(id),
    userInput
  );

  return res;
};
