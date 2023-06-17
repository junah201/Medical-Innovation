import { Login, Logout } from '@/pages';
import { HomeHeader } from '@/components/headers';
import { DefaultWrapper } from '@/components/wrappers';
import { DefaultFooter } from '@/components/footers';

interface RouteConfig {
  COMPONENT: () => JSX.Element;
  HEADER: () => JSX.Element;
  FOOTER: () => JSX.Element;
  WRAPPER: ({ children }: { children: React.ReactNode }) => JSX.Element;
  AUTH: boolean;
}

type RouteMap = Record<string, Readonly<RouteConfig>>;

export const ROUTE_MAP: RouteMap = Object.freeze({
  '/': {
    COMPONENT: Login,
    HEADER: HomeHeader,
    FOOTER: DefaultFooter,
    WRAPPER: DefaultWrapper,
  },
  '/login': {
    COMPONENT: Login,
    HEADER: HomeHeader,
    FOOTER: DefaultFooter,
    WRAPPER: DefaultWrapper,
    AUTH: false,
  },
  '/logout': {
    COMPONENT: Logout,
    HEADER: HomeHeader,
    FOOTER: DefaultFooter,
    WRAPPER: DefaultWrapper,
    AUTH: false,
  },
});
