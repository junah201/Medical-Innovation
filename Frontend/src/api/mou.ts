import { API_ROUTE } from '@/constants';
import { Axios } from '@/libs/Axios';

const unAuthAxios = new Axios();
const authAxios = new Axios(true);

export const getMous = async (skip = 0, limit = 1000) => {
  const res = await unAuthAxios.getByParams(API_ROUTE.MOU.GET_MOUS, {
    skip: skip,
    limit: limit,
  });

  return res;
};

export const deleteMouById = async (id: string | number) => {
  const res = await authAxios.delete(
    API_ROUTE.MOU.DELETE_MOU_BY_ID(id)
  );

  return res;
};

export const uploadMou = async (
  name: string,
  link: string,
  file: File
) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('link', link);
  formData.append('file', file);

  const res = await authAxios.postMultipartFormData(
    API_ROUTE.MOU.UPLOAD_MOU,
    formData
  );

  return res;
};

export const getMouById = async (id: string | number) => {
  const res = await authAxios.get(API_ROUTE.MOU.GET_MOU_BY_ID(id));

  return res;
};

export const updateMouById = async (
  id: string | number,
  name: string,
  link: string
) => {
  const res = await authAxios.put(
    API_ROUTE.MOU.UPDATE_MOU_BY_ID(id),
    {
      name: name,
      link: link,
    }
  );

  return res;
};
