import { Banner } from '@/components/banner';
import { DefaultFooter } from '@/components/footers';
import { HomeHeader } from '@/components/headers';
import { DefaultWrapper } from '@/components/wrappers';
import { Login, Logout, Home, Signup } from '@/pages';

interface RouteConfig {
  COMPONENT: () => JSX.Element;
  HEADER: () => JSX.Element;
  FOOTER: () => JSX.Element;
  BANNER?: () => JSX.Element;
  WRAPPER: ({ children }: { children: React.ReactNode }) => JSX.Element;
  AUTH: boolean;
}

type RouteMap = Record<string, Readonly<RouteConfig>>;

export const ROUTE_MAP: RouteMap = Object.freeze({
  '/': {
    COMPONENT: Home,
    HEADER: HomeHeader,
    BANNER: Banner,
    FOOTER: DefaultFooter,
    WRAPPER: DefaultWrapper,
    AUTH: false,
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
  '/signup': {
    COMPONENT: Signup,
    HEADER: HomeHeader,
    FOOTER: DefaultFooter,
    WRAPPER: DefaultWrapper,
    AUTH: false,
  },
});
