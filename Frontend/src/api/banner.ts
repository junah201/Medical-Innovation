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

export const uploadBanner = async (
  name: string,
  link: string,
  file: File,
  banner_end_at: string
) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('link', link);
  formData.append('file', file);
  formData.append('year', '2023');
  formData.append('banner_end_at', banner_end_at);

  const res = await authAxios.postMultipartFormData(
    API_ROUTE.BANNER.UPLOAD_BANNER,
    formData
  );

  return res;
};

export const uploadBannerV2 = async (
  name: string,
  link: string,
  filename: string,
  banner_end_at: string
) => {
  const res = await authAxios.post(
    API_ROUTE.BANNER_V2.UPLOAD_BANNER,
    {
      name: name,
      link: link,
      filename: filename,
      year: '2023',
      banner_end_at: banner_end_at,
    }
  );

  return res;
};

export const deleteBannerById = async (id: number | string) => {
  const res = await authAxios.delete(
    API_ROUTE.BANNER.DELETE_BANNER_BY_ID(id)
  );

  return res;
};

export const getBannerById = async (id: number | string) => {
  const res = await authAxios.get(
    API_ROUTE.BANNER.GET_BANNER_BY_ID(id)
  );

  return res;
};

export const updateBannerById = async (
  id: number | string,
  name: string,
  link: string,
  bannerEndAt: string,
  filename: string
) => {
  const res = await authAxios.put(
    API_ROUTE.BANNER_V2.UPDATE_BANNER_BY_ID(id),
    {
      name: name,
      link: link,
      banner_end_at: bannerEndAt,
      filename: filename,
    }
  );

  return res;
};
