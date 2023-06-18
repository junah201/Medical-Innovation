import { API_ROUTE } from '@/constants';
import { Axios } from '@/libs/Axios';
import { AuthInfo, SignupInfo } from '@/types';

const unAuthAxios = new Axios();
const authAxios = new Axios(true);

export const login = async ({ email, password }: AuthInfo) => {
  const res = await unAuthAxios.postFormUnlencoded(API_ROUTE.AUTH.LOG_IN, {
    username: email,
    password: password,
  });

  return res;
};

export const signup = async ({
  name,
  phone,
  email,
  password,
  confirmPassword,
  birth,
}: SignupInfo) => {
  const res = await unAuthAxios.post(API_ROUTE.AUTH.SIGN_UP, {
    name: name,
    phone: phone,
    email: email,
    password: password,
    confirm_password: confirmPassword,
    birth: birth,
    email_enable: true,
  });

  return res;
};

export const validateToken = async () => {
  const res = await authAxios.get(API_ROUTE.AUTH.VALIDATE_TOKEN);

  return res;
};
