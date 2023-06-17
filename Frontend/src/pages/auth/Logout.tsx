import { useEffect } from 'react';
import { removeCookie } from '@/libs/Cookie';
import { useNavigate } from 'react-router-dom';
import { COOKIE } from '@/constants';

export const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    removeCookie(COOKIE.KEY.ACCESS_TOKEN);
    navigate('/');
  }, []);

  return <div>Logout...</div>;
};
