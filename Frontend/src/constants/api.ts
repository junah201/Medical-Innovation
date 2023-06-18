const AUTH = Object.freeze({
  LOG_IN: '/api/v1/user/login',
  SIGN_UP: '/api/v1/user/create',
  VALIDATE_TOKEN: '/api/v1/user/me',
  ME: '/api/v1/user/me',
});

const BANNER = Object.freeze({
  GET_ACTIVE_BANNERS: '/api/v1/banner/all/active',
});

const MOU = Object.freeze({
  GET_MOUS: '/api/v1/mou/all',
});

const ADVISOR = Object.freeze({
  GET_ADVISORS: '/api/v1/advisor/all',
});

const POST = Object.freeze({
  GET_POSTS: '/api/v1/post/all',
  GET_POSTS_BY_BOARD: (id: number) => `/api/v1/post/${id}/all`,
  GET_POST_BY_ID: (id: number) => `/api/v1/post/${id}`,
});

const POPUP = Object.freeze({
  GET_POPUPS: '/api/v1/popup/all',
  GET_ACTIVE_POPUPS: '/api/v1/popup/all/active',
});

const SUPPORTING_STARTUP = Object.freeze({
  GET_SUPPORTING_STARTUPS: '/api/v1/supporting_startup/all',
});

const HISTORY = Object.freeze({
  GET_HISTORIES: '/api/v1/history/all',
});

const PUBLIC_EVENT = Object.freeze({
  GET_PUBLIC_EVENTS: '/api/v1/public_event/all',
  GET_PUBLIC_EVENT_BY_ID: (id: number | string) => `/api/v1/public_event/get/${id}`,
});

export const API_ROUTE = Object.freeze({
  AUTH,
  BANNER,
  MOU,
  ADVISOR,
  POST,
  POPUP,
  SUPPORTING_STARTUP,
  HISTORY,
  PUBLIC_EVENT,
});
