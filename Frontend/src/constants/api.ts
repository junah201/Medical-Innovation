const AUTH = Object.freeze({
  LOG_IN: '/api/v1/user/login',
  SIGN_UP: '/api/v1/user/create',
  VALIDATE_TOKEN: '/api/v1/user/me',
  ME: '/api/v1/user/me',
});

const BANNER = Object.freeze({
  GET_ACTIVE_BANNERS: '/api/v1/banner/all/active',
});

export const API_ROUTE = Object.freeze({
  AUTH,
  BANNER,
});
