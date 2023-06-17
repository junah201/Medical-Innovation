import { Routes, Route } from 'react-router-dom';
import { Login } from '@/pages/auth/Login';
import { ROUTE_MAP } from '@/constants/routes';
import { AuthRoute } from '@/components/AuthRoute';

export const Router = () => {
  return (
    <Routes>
      {Object.entries(ROUTE_MAP).map(([ROUTE, DATA]) => {
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
