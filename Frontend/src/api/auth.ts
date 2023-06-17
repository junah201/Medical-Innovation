import { Axios } from '@/libs/Axios';
import { API_ROUTE } from '@/constants';
import { AuthInfo } from '@/types';

const unAuthAxios = new Axios();

export const login = async ({ email, password }: AuthInfo) => {
  const res = await unAuthAxios.postFormUnlencoded(API_ROUTE.AUTH.LOG_IN, {
    email,
    password,
  });

  return res;
};
