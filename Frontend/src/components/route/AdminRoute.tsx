import { useState, useEffect } from 'react';
import {
  Navigate,
  NavigateProps,
  RouteProps,
} from 'react-router-dom';

import { ROUTE } from '@/constants';
import { checkAdmin } from '@/util/validateToken';

export type AdminRouteProps = {
  element: JSX.Element;
  [key: string]: any;
} & RouteProps;

export function AdminRoute({ element, ...rest }: AdminRouteProps) {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkValidation = async () => {
      const auth = await checkAdmin();
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
