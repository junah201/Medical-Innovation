import { validateToken } from '@/api';
import { COOKIE } from '@/constants';
import { getCookie } from '@/libs/Cookie';

export const checkAuth = async () => {
  const token = getCookie(COOKIE.KEY.ACCESS_TOKEN);
  if (!token) {
    return false;
  }
  try {
    const { status } = await validateToken();
    return status === 200;
  } catch (e) {
    return false;
  }
};

export const checkAdmin = async () => {
  const token = getCookie(COOKIE.KEY.ACCESS_TOKEN);
  if (!token) {
    return false;
  }
  try {
    const { data } = await validateToken();
    return data?.is_admin;
  } catch (e) {
    return false;
  }
};
