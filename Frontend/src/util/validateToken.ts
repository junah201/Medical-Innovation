import { getCookie } from '@/libs/Cookie';
import { COOKIE } from '@/constants';
import { validateToken } from '@/api';

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
