import { useState, useEffect } from 'react';
import {
  Navigate,
  NavigateProps,
  RouteProps,
} from 'react-router-dom';

import { ROUTE } from '@/constants';
import { Toast } from '@/libs/Toast';
import { checkAuth } from '@/util/validateToken';

export type AuthRouteProps = {
  element: JSX.Element;
  [key: string]: any;
} & RouteProps;

export function AuthRoute({ element, ...rest }: AuthRouteProps) {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkValidation = async () => {
      const auth = await checkAuth();
      if (!auth) Toast('로그인이 필요합니다.', 'error');
      setIsAuth(auth);
      setLoading(false);
    };

    checkValidation();
  }, []);

  if (loading) return <>Loading...</>;

  return isAuth ? (
    element
  ) : (
    <Navigate
      to={
        {
          pathname: ROUTE.LOGIN,
          state: { from: rest.location },
        } as NavigateProps['to']
      }
      replace
    />
  );
}
