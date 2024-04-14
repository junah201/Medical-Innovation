import { API_ROUTE } from '@/constants';
import { Axios } from '@/libs/Axios';

const unAuthAxios = new Axios();
const authAxios = new Axios(true);

export const getMous = async (skip = 0, limit = 1000) => {
  const res = await unAuthAxios.getByParams(
    API_ROUTE.MOU.GET_MOUS,
    {
      skip: skip,
      limit: limit,
    }
  );

  return res;
};

export const deleteMouById = async (
  id: string | number
) => {
  const res = await authAxios.delete(
    API_ROUTE.MOU.DELETE_MOU_BY_ID(id)
  );

  return res;
};

interface MouCreate {
  name: string;
  link: string;
  filename: string;
}

export const uploadMou = async (userInput: MouCreate) => {
  const res = await authAxios.post(
    API_ROUTE.MOU.UPLOAD_MOU,
    userInput
  );

  return res;
};

export const getMouById = async (id: string | number) => {
  const res = await authAxios.get(
    API_ROUTE.MOU.GET_MOU_BY_ID(id)
  );

  return res;
};

export const updateMouById = async (
  id: string | number,
  userInput: MouCreate
) => {
  const res = await authAxios.put(
    API_ROUTE.MOU.UPDATE_MOU_BY_ID(id),
    userInput
  );

  return res;
};
