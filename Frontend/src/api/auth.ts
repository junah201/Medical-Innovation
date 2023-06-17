import { Axios } from '@/libs/Axios';
import { API_ROUTE } from '@/constants';
import { AuthInfo } from '@/types';

const unAuthAxios = new Axios();
const authAxios = new Axios(true);

export const login = async ({ email, password }: AuthInfo) => {
  const res = await unAuthAxios.postFormUnlencoded(API_ROUTE.AUTH.LOG_IN, {
    username: email,
    password: password,
  });

  return res;
};

export const validateToken = async () => {
  const res = await authAxios.get(API_ROUTE.AUTH.VALIDATE_TOKEN);

  return res;
};
