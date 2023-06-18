import { API_ROUTE } from '@/constants';
import { Axios } from '@/libs/Axios';

const unAuthAxios = new Axios();
const authAxios = new Axios(true);

export const getPopups = async () => {
  const res = await unAuthAxios.get(API_ROUTE.POPUP.GET_POPUPS);

  return res;
};

export const getActivePopups = async () => {
  const res = await unAuthAxios.get(API_ROUTE.POPUP.GET_ACTIVE_POPUPS);

  return res;
};
