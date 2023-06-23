import { Routes, Route } from 'react-router-dom';

import { AuthRoute, AdminRoute } from '@/components';
import { ROUTE_MAP } from '@/constants/routes';

export const Router = () => {
  return (
    <Routes>
      {ROUTE_MAP.map((DATA) => {
        if (DATA.ADMIN) {
          return (
            <Route
              key={DATA.PATH}
              path={DATA.PATH}
              element={
                <AdminRoute
                  path={DATA.PATH}
                  element={
                    <>
                      <DATA.HEADER />
                      <DATA.WRAPPER>
                        <DATA.COMPONENT />
                      </DATA.WRAPPER>
                      {DATA.BANNER && <DATA.BANNER />}
                      {DATA.FOOTER && <DATA.FOOTER />}
                    </>
                  }
                />
              }
            />
          );
        } else if (DATA.AUTH) {
          return (
            <Route
              key={DATA.PATH}
              path={DATA.PATH}
              element={
                <AuthRoute
                  path={DATA.PATH}
                  element={
                    <>
                      <DATA.HEADER />
                      <DATA.WRAPPER>
                        <DATA.COMPONENT />
                      </DATA.WRAPPER>
                      {DATA.BANNER && <DATA.BANNER />}
                      {DATA.FOOTER && <DATA.FOOTER />}
                    </>
                  }
                />
              }
            />
          );
        } else {
          return (
            <Route
              key={DATA.PATH}
              path={DATA.PATH}
              element={
                <>
                  <DATA.HEADER />
                  <DATA.WRAPPER>
                    <DATA.COMPONENT />
                  </DATA.WRAPPER>
                  {DATA.BANNER && <DATA.BANNER />}
                  {DATA.FOOTER && <DATA.FOOTER />}
                </>
              }
            />
          );
        }
      })}
    </Routes>
  );
};
