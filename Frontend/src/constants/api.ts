const AUTH = Object.freeze({
  LOG_IN: '/api/v1/user/login',
  SIGN_UP: '/api/v1/user/create',
  VALIDATE_TOKEN: '/api/v1/user/me',
  ME: '/api/v1/user/me',
});

const BANNER = Object.freeze({
  GET_ACTIVE_BANNERS: '/api/v1/banner/all/active',
  GET_BANNERS: '/api/v1/banner/all',
  GET_BANNER_BY_ID: (id: number | string) => `/api/v1/banner/${id}`,
  UPLOAD_BANNER: '/api/v1/banner/create',
  DELETE_BANNER_BY_ID: (id: number | string) =>
    `/api/v1/banner/${id}`,
  UPDATE_BANNER_BY_ID: (id: number | string) =>
    `/api/v1/banner/${id}`,
});

const MOU = Object.freeze({
  GET_MOUS: '/api/v1/mou/all',
});

const ADVISOR = Object.freeze({
  GET_ADVISORS: '/api/v1/advisor/all',
});

const POST = Object.freeze({
  GET_POSTS: '/api/v1/post/all',
  GET_POSTS_BY_BOARD: (id: number | string) =>
    `/api/v1/post/${id}/all`,
  GET_POST_BY_ID: (id: number | string) => `/api/v1/post/${id}`,
  GET_POST_BOARDS: '/api/v1/board/all',
  UPDATE_POST_BY_ID: (id: number | string) => `/api/v1/post/${id}`,
  UPLOAD_POST: '/api/v1/post/create',
  DELETE_POST_BY_ID: (id: number | string) => `/api/v1/post/${id}`,
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
  GET_PUBLIC_EVENT_BY_ID: (id: number | string) =>
    `/api/v1/public_event/get/${id}`,
});

const PUBLIC_PARTICIPANT = Object.freeze({
  SUBMIT_PUBLIC_EVENT: (id: number | string) =>
    `/api/v1/participant/${id}/create`,
});

const JUDGING_EVENT = Object.freeze({
  GET_JUDGING_EVENTS: '/api/v1/judging_event/all',
  GET_JUDGING_EVENT_BY_ID: (id: number | string) =>
    `/api/v1/judging_event/get/${id}`,
});

const JUDGING_PARTICIPANT = Object.freeze({
  SUBMIT_JUDGING_EVENT: '/api/v1/judging_participant/create',
  GET_JUDGING_PARTICIPANTS: (id: number | string) =>
    `/api/v1/judging_participant/${id}/all`,
  GET_JUDGING_PARTICIPANT_BY_ID: (id: number | string) =>
    `/api/v1/judging_participant/get/${id}`,
});

const JUDGING_RESULT = Object.freeze({
  SUBMIT_JUDGING_RESULT: '/api/v1/judging_result/create',
  GET_JUDGING_RESULT: '/api/v1/judging_result/get',
  GET_JUDGING_RESULT_BY_ID: (id: number | string) =>
    `/api/v1/judging_result/get/${id}`,
});

const SPONSORING_COMPANY = Object.freeze({
  GET_SPONSORING_COMPANIES: '/api/v1/sponsoring_company/all',
  DELETE_SPONSORING_COMPANY_BY_ID: (id: number | string) =>
    `/api/v1/sponsoring_company/${id}`,
  GET_SPONSORING_COMPANY_BY_ID: (id: number | string) =>
    `/api/v1/sponsoring_company/get/${id}`,
  UPLOAD_SPONSORING_COMPANY: '/api/v1/sponsoring_company/create',
});

const SPONSOR = Object.freeze({
  GET_SPONSORS: '/api/v1/sponsor/all',
  SUBMIT_SPONSOR: '/api/v1/sponsor/create',
});

const FILE = Object.freeze({
  UPLOAD_FILE: '/api/v1/file/upload',
  UPLOAD_FILES: '/api/v1/file/uploads',
  DOWNLOAD_FILE: (filename: string) =>
    `/api/v1/file/download/${filename}`,
});

const PRIVATE_PARTICIPANT = Object.freeze({
  SUBMIT_PRIVATE_EVENT: '/api/v1/private_participant/create',
});

const USER = Object.freeze({
  GET_USERS: '/api/v1/user/all',
  GET_USER_BY_ID: (id: number | string) => `/api/v1/user/${id}/get`,
  UPDATE_JUDGING_PERMISSION: (
    userId: number | string,
    judgingEventId: number | string
  ) => `/api/v1/user/${userId}/judging_permission/${judgingEventId}`,
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
  PUBLIC_PARTICIPANT,
  JUDGING_EVENT,
  JUDGING_PARTICIPANT,
  JUDGING_RESULT,
  SPONSORING_COMPANY,
  SPONSOR,
  FILE,
  PRIVATE_PARTICIPANT,
  USER,
});
