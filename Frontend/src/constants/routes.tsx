import { Banner } from '@/components/banner';
import { DefaultFooter } from '@/components/footers';
import { HomeHeader } from '@/components/headers';
import { DefaultWrapper, HomeWrapper, PageWrapper } from '@/components/wrappers';
import {
  Login,
  Logout,
  Home,
  Signup,
  NotFound,
  PrivacyPolicy,
  Mou,
  Advisors,
  Post,
  Founder,
  ChairmanMessage,
  MissionAndHistory,
  OrgchartAndProject,
} from '@/pages';

interface RouteConfig {
  PATH: string;
  COMPONENT: () => JSX.Element;
  HEADER: () => JSX.Element;
  FOOTER: () => JSX.Element;
  BANNER?: () => JSX.Element;
  WRAPPER: ({ children }: { children: React.ReactNode }) => JSX.Element;
  AUTH: boolean;
}

type RouteMap = RouteConfig[];

export const ROUTE_MAP: RouteMap = [
  {
    PATH: '/',
    COMPONENT: Home,
    HEADER: HomeHeader,
    BANNER: Banner,
    FOOTER: DefaultFooter,
    WRAPPER: HomeWrapper,
    AUTH: false,
  },
  {
    PATH: '/login',
    COMPONENT: Login,
    HEADER: HomeHeader,
    FOOTER: DefaultFooter,
    WRAPPER: DefaultWrapper,
    AUTH: false,
  },
  {
    PATH: '/logout',
    COMPONENT: Logout,
    HEADER: HomeHeader,
    FOOTER: DefaultFooter,
    WRAPPER: DefaultWrapper,
    AUTH: false,
  },
  {
    PATH: '/signup',
    COMPONENT: Signup,
    HEADER: HomeHeader,
    FOOTER: DefaultFooter,
    WRAPPER: DefaultWrapper,
    AUTH: false,
  },
  {
    PATH: '/privacy-policy',
    COMPONENT: PrivacyPolicy,
    HEADER: HomeHeader,
    FOOTER: DefaultFooter,
    WRAPPER: PageWrapper,
    AUTH: false,
  },
  {
    PATH: '/mou',
    COMPONENT: Mou,
    HEADER: HomeHeader,
    FOOTER: DefaultFooter,
    WRAPPER: PageWrapper,
    AUTH: false,
  },
  {
    PATH: '/advisors',
    COMPONENT: Advisors,
    HEADER: HomeHeader,
    FOOTER: DefaultFooter,
    WRAPPER: PageWrapper,
    AUTH: false,
  },
  {
    PATH: '/post/:id',
    COMPONENT: Post,
    HEADER: HomeHeader,
    FOOTER: DefaultFooter,
    WRAPPER: PageWrapper,
    AUTH: false,
  },
  {
    PATH: '/introduction',
    COMPONENT: Founder,
    HEADER: HomeHeader,
    FOOTER: DefaultFooter,
    WRAPPER: PageWrapper,
    AUTH: false,
  },
  {
    PATH: '/introduction/founder',
    COMPONENT: Founder,
    HEADER: HomeHeader,
    FOOTER: DefaultFooter,
    WRAPPER: PageWrapper,
    AUTH: false,
  },
  {
    PATH: '/introduction/message',
    COMPONENT: ChairmanMessage,
    HEADER: HomeHeader,
    FOOTER: DefaultFooter,
    WRAPPER: PageWrapper,
    AUTH: false,
  },
  {
    PATH: '/introduction/mission_and_history',
    COMPONENT: MissionAndHistory,
    HEADER: HomeHeader,
    FOOTER: DefaultFooter,
    WRAPPER: PageWrapper,
    AUTH: false,
  },
  {
    PATH: '/introduction/orgchart_and_project',
    COMPONENT: OrgchartAndProject,
    HEADER: HomeHeader,
    FOOTER: DefaultFooter,
    WRAPPER: PageWrapper,
    AUTH: false,
  },
  {
    PATH: '*',
    COMPONENT: NotFound,
    HEADER: HomeHeader,
    FOOTER: DefaultFooter,
    WRAPPER: PageWrapper,
    AUTH: false,
  },
];
