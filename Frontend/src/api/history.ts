import { API_ROUTE } from '@/constants';
import { Axios } from '@/libs/Axios';

const unAuthAxios = new Axios();
const authAxios = new Axios(true);

export const getHistorys = async (skip: number, limit: number) => {
  const res = await unAuthAxios.getByParams(
    API_ROUTE.HISTORY.GET_HISTORIES,
    {
      skip: skip,
      limit: limit,
    }
  );

  return res;
};

export const getHistoryById = async (id: number | string) => {
  const res = await authAxios.get(
    API_ROUTE.HISTORY.GET_HISTORY_BY_ID(id)
  );

  return res;
};

export const deleteHistoryById = async (id: number | string) => {
  const res = await authAxios.delete(
    API_ROUTE.HISTORY.DELETE_HISTORY_BY_ID(id)
  );

  return res;
};

export const uploadHistory = async (
  title: string,
  content: string
) => {
  const res = await authAxios.post(API_ROUTE.HISTORY.UPLOAD_HISTORY, {
    title: title,
    content: content,
  });

  return res;
};

export const updateHistoryById = async (
  id: number | string,
  title: string,
  content: string
) => {
  const res = await authAxios.put(
    API_ROUTE.HISTORY.UPDATE_HISTORY_BY_ID(id),
    {
      title: title,
      content: content,
    }
  );

  return res;
};
