import { AuthRoute } from '@/components';
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

export const getSupportingStartupById = async (
  id: number | string
) => {
  const res = await authAxios.get(
    API_ROUTE.SUPPORTING_STARTUP.GET_SUPPORTING_STARTUP_BY_ID(id)
  );
  return res;
};

export const uploadSupportingStartup = async (
  name: string,
  link: string,
  content: string
) => {
  const res = await authAxios.post(
    API_ROUTE.SUPPORTING_STARTUP.UPLOAD_SUPPORTING_STARTUP,
    {
      name: name,
      link: link,
      content: content,
    }
  );

  return res;
};

export const deleteSupportingStartupById = async (
  id: number | string
) => {
  const res = await authAxios.delete(
    API_ROUTE.SUPPORTING_STARTUP.DELETE_SUPPORTING_STARTUP_BY_ID(id)
  );

  return res;
};

export const updateSupportingStartupById = async (
  id: number | string,
  name: string,
  link: string,
  content: string
) => {
  const res = await authAxios.put(
    API_ROUTE.SUPPORTING_STARTUP.UPDATE_SUPPORTING_STARTUP_BY_ID(id),
    {
      name: name,
      link: link,
      content: content,
    }
  );

  return res;
};
