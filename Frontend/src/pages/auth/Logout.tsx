import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { COOKIE } from '@/constants';
import { removeCookie } from '@/libs/Cookie';

export const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    removeCookie(COOKIE.KEY.ACCESS_TOKEN);
    navigate('/');
  }, []);

  return <div>Logout...</div>;
};
