import { Routes, Route } from 'react-router-dom';

import { AuthRoute } from '@/components/AuthRoute';
import { ROUTE_MAP } from '@/constants/routes';
import { Login } from '@/pages/auth/Login';

export const Router = () => {
  return (
    <Routes>
      {Object.entries(ROUTE_MAP).map(([ROUTE, DATA]) => {
        console.log(ROUTE, DATA);
        if (DATA.AUTH)
          return (
            <Route
              key={ROUTE}
              path={ROUTE}
              element={
                <AuthRoute
                  path={ROUTE}
                  element={
                    <>
                      <DATA.HEADER />
                      <DATA.WRAPPER>
                        <DATA.COMPONENT />
                      </DATA.WRAPPER>
                      {DATA.BANNER && <DATA.BANNER />}
                      <DATA.FOOTER />
                    </>
                  }
                />
              }
            />
          );
        return (
          <Route
            key={ROUTE}
            path={ROUTE}
            element={
              <>
                <DATA.HEADER />
                <DATA.WRAPPER>
                  <DATA.COMPONENT />
                </DATA.WRAPPER>
                {DATA.BANNER && <DATA.BANNER />}
                <DATA.FOOTER />
              </>
            }
          />
        );
      })}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
