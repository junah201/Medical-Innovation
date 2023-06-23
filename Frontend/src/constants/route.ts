export const ROUTE = Object.freeze({
  HOME: '/',
  LOGIN: '/login',
  LOGOUT: '/logout',
  ME: '/me',
  SIGN_UP: '/signup',
  INTRODUCTION: Object.freeze({
    ROOT: '/introduction',
    FOUNDER: '/introduction/founder',
    MESSAGE: '/introduction/message',
    MISSION_AND_HISTORY: '/introduction/mission_and_history',
    ORGCHART_AND_PROJECT: '/introduction/orgchart_and_project',
  }),
  PROGRAM: Object.freeze({
    ROOT: '/programs',
    EVENT: '/programs/event',
    ACCELERATING: '/programs/accelerating',
    RESEARCH_SUPPORT_PROJECT: '/programs/research_support_project',
    TRAND: '/programs/trand',
  }),
  NEWS: Object.freeze({
    ROOT: '/news',
    ANNOUNCEMENT: '/news/announcement',
    PRESS_RELEASE: '/news/press_release',
    COLUMN: '/news/column',
    PHOTH: '/news/photo',
  }),
  SUPPORT: Object.freeze({
    ROOT: '/support',
    SPONSORSHIP: '/support/sponsorship',
    SPONSORS: '/support/sponsors',
    BENEFITS: '/support/benefits',
    HISTORY: '/support/history',
    APPLY: '/support/sponsorship/apply',
  }),
  MOU: '/mou',
  ADVISORS: '/advisors',
  PREPARING: '/preparing',
  PRIVACY_POLICY: '/privacy-policy',
  ADMIN: Object.freeze({
    ROOT: '/admin',
    USER: Object.freeze({
      ROOT: '/admin/user',
      ALL: '/admin/user/all',
    }),
    POST: Object.freeze({
      ROOT: '/admin/post',
      UPLOAD: '/admin/post/upload',
      ALL: '/admin/post/all',
    }),
    BANNER: Object.freeze({
      ROOT: '/admin/banner',
      UPLOAD: '/admin/banner/upload',
      ALL: '/admin/banner/all',
    }),
    SPONSORING_COMPANY: Object.freeze({
      ROOT: '/admin/sponsoring_company',
      UPLOAD: '/admin/sponsoring_company/upload',
      ALL: '/admin/sponsoring_company/all',
    }),
    SPONSOR: Object.freeze({
      ROOT: '/admin/sponsor',
      ALL: '/admin/sponsor/all',
    }),
    MOU: Object.freeze({
      ROOT: '/admin/mou',
      UPLOAD: '/admin/mou/upload',
      ALL: '/admin/mou/all',
    }),
    ADVISOR: Object.freeze({
      ROOT: '/admin/advisor',
      UPLOAD: '/admin/advisor/upload',
      ALL: '/admin/advisor/all',
    }),
    PUBLIC_EVENT: Object.freeze({
      ROOT: '/admin/public_event',
      UPLOAD: '/admin/public_event/upload',
      ALL: '/admin/public_event/all',
    }),
    PUBLIC_PARTICIPANT: Object.freeze({
      ROOT: '/admin/public_participant',
      ALL: '/admin/public_participant/all',
    }),
    PRIVATE_EVENT: Object.freeze({
      ROOT: '/admin/private_event',
      ALL: '/admin/private_event/all',
      UPLOAD: '/admin/private_event/upload',
    }),
    PRIVATE_PARTICIPANT: Object.freeze({
      ROOT: '/admin/private_participant',
      ALL: '/admin/private_participant/all',
    }),
    JUDGING_EVENT: Object.freeze({
      ROOT: '/admin/judging_event',
      ALL: '/admin/judging_event/all',
      UPLOAD: '/admin/judging_event/upload',
    }),
    JUDGING_RESULT: Object.freeze({
      ROOT: '/admin/judging_result',
      ALL: '/admin/judging_result/all',
    }),
    AD_EMAIL: Object.freeze({
      ROOT: '/admin/ad_email',
      ALL: '/admin/ad_email/all',
      UPLOAD: '/admin/ad_email/upload',
    }),
  }),
});
