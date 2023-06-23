import { API_ROUTE } from '@/constants';
import { Axios } from '@/libs/Axios';

const unAuthAxios = new Axios();
const authAxios = new Axios(true);

export const getPopups = async (skip: number, limit: number) => {
  const res = await authAxios.getByParams(
    API_ROUTE.POPUP.GET_POPUPS,
    {
      skip: skip,
      limit: limit,
    }
  );

  return res;
};

export const getActivePopups = async () => {
  const res = await unAuthAxios.get(
    API_ROUTE.POPUP.GET_ACTIVE_POPUPS
  );

  return res;
};

export const getPopupById = async (id: string | number) => {
  const res = await authAxios.get(
    API_ROUTE.POPUP.GET_POPUP_BY_ID(id)
  );

  return res;
};

export const deletePopupById = async (id: string | number) => {
  const res = await authAxios.delete(
    API_ROUTE.POPUP.DELETE_POPUP_BY_ID(id)
  );

  return res;
};
