export const INPUT_TYPE = Object.freeze({
  EMAIL: 'email',
  PASSWORD: 'password',
  CONFIRM_PASSWORD: 'confirmPassword',
  NAME: 'name',
  PHONE: 'phone',
  DATE: 'date',
  GENDER: 'gender',
  TEXT: 'text',
  RADIO: 'radio',
  TEXTAREA: 'textarea',
  FILE: 'file',
  SELECT: 'select',
  CHECKBOX: 'checkbox',
  HTML: 'html',
});

export const REGISTER_TYPE = Object.freeze({
  EMAIL: 'email',
  PASSWORD: 'password',
  CONFIRM_PASSWORD: 'confirmPassword',
  NAME: 'name',
  PHONE: 'phone',
  BIRTH: 'birth',
  ENGLISH_NAME: 'english_name',
  GENDER: 'gender',
  ORGANIZATION_TYPE: 'organization_type',
  ORGANIZATION_NAME: 'organization_name',
  ORGANIZATION_ENGLISH_NAME: 'organization_english_name',
  JOB_POSITION: 'job_position',
  ADDRESS: 'address',
  FINAL_DEGREE: 'final_degree',
  ENGAGEMENT_TYPE: 'engagement_type',
  PARTICIPANT_MOTIVATION: 'participant_motivation',
  PARTICIPANT_TYPE: 'participant_type',
  INTEREST_DISEASE: 'interest_disease',
  INTEREST_FIELD: 'interest_field',
  INTEREST_FIELD_DETAIL: 'interest_field_detail',
  IDENTIFICATION_NUMBER: 'identification_number',
  USAGE_INTENT: 'usage',
  SPONSORSHIP_DETAIL: 'detail',
  PROFILE_FILE: 'profile_filename',
  ZIP_FILE: 'zip_filename',

  USER_ID: 'user_id',
  PARTICIPANT_ID: 'participant_id',
  TECHNICAL_SCORE1: 'technical_score1',
  TECHNICAL_SCORE2: 'technical_score2',
  TECHNICAL_SCORE3: 'technical_score3',
  TECHNICAL_SCORE4: 'technical_score4',
  TECHNICAL_SCORE5: 'technical_score5',
  TECHNICAL_SCORE6: 'technical_score6',
  MARKETABILITY_SCORE1: 'marketability_score1',
  MARKETABILITY_SCORE2: 'marketability_score2',
  MARKETABILITY_SCORE3: 'marketability_score3',
  MARKETABILITY_SCORE4: 'marketability_score4',
  BUSINESS_SCORE1: 'business_score1',
  BUSINESS_SCORE2: 'business_score2',
  BUSINESS_SCORE3: 'business_score3',
  BUSINESS_SCORE4: 'business_score4',
  BUSINESS_SCORE5: 'business_score5',
  BUSINESS_SCORE6: 'business_score6',
  BUSINESS_SCORE7: 'business_score7',
  BUSINESS_SCORE8: 'business_score8',

  EFFICACY_AND_STABILITY_SCORE1: 'efficacy_and_stability_score1',
  EFFICACY_AND_STABILITY_SCORE2: 'efficacy_and_stability_score2',
  EFFICACY_AND_STABILITY_SCORE3: 'efficacy_and_stability_score3',
  EFFICACY_AND_STABILITY_SCORE4: 'efficacy_and_stability_score4',
  EFFICACY_AND_STABILITY_SCORE5: 'efficacy_and_stability_score5',
  EFFICACY_AND_STABILITY_SCORE6: 'efficacy_and_stability_score6',
  EFFICACY_AND_STABILITY_SCORE7: 'efficacy_and_stability_score7',
  EFFICACY_AND_STABILITY_SCORE8: 'efficacy_and_stability_score8',

  OTHER_COMMENT: 'other_comment',
  OTHER_SCORE1: 'other_score1',

  JUDGING_EVENT: 'judging_event',
  FIRST_JUDGING_PERMISSION: 'first_judging_permission',
  SECOND_JUDGING_PERMISSION: 'second_judging_permission',

  TITLE: 'title',
  BOARD_ID: 'board_id',
  CONTENT: 'content',

  FILES: 'files',

  LINK: 'link',
  FILE: 'file',
  YEAR: 'year',
  BANNER_END_AT: 'banner_end_at',

  DESCRIPTION: 'description',
  TYPE: 'type',
  FILENAME: 'filename',

  START_DATA: 'start_date',
  END_DATE: 'end_date',
  JOIN_START_DATE: 'join_start_date',
  JOIN_END_DATE: 'join_end_date',

  SELECT_EVENT_ID: 'select_event_id',
  EVENT_ID: 'event_id',

  JUDGING_1SH_START_DATE: 'judging_1st_start_date',
  JUDGING_1SH_END_DATE: 'judging_1st_end_date',
  JUDGING_2ND_START_DATE: 'judging_2nd_start_date',
  JUDGING_2ND_END_DATE: 'judging_2nd_end_date',
});

export const ERROR_MESSAGE = Object.freeze({
  EMAIL: Object.freeze({
    REQUIRED: '필수 입력 항목입니다.',
    IS_EMAIL: '이메일 형식이 아닙니다.',
  }),
  NAME: Object.freeze({
    REQUIRED: '필수 입력 항목입니다.',
  }),
  PHONE: Object.freeze({
    REQUIRED: '필수 입력 항목입니다.',
    IS_PHONE: '공백이나 백틱(-) 없이 숫자로만 입력해주세요.',
    MIN_LENGTH: '전화번호가 너무 짧습니다.',
    MAX_LENGTH: '전화번호가 너무 깁니다.',
  }),
  PASSWORD: Object.freeze({
    REQUIRED: '필수 입력 항목입니다.',
    MIN_LENGTH: '비밀번호가 너무 짧습니다.',
    MAX_LENGTH: '비밀번호가 너무 깁니다.',
  }),
  CONFIRM_PASSWORD: Object.freeze({
    REQUIRED: '필수 입력 항목입니다.',
    NOT_MATCH: '비밀번호가 일치하지 않습니다.',
  }),
  DATE: Object.freeze({
    REQUIRED: '필수 입력 항목입니다.',
  }),
  TEXT: Object.freeze({
    REQUIRED: '필수 입력 항목입니다.',
  }),
  TEXTAREA: Object.freeze({
    REQUIRED: '필수 입력 항목입니다.',
  }),
  RADIO: Object.freeze({
    REQUIRED: '필수 입력 항목입니다.',
  }),
  FILE: Object.freeze({
    REQUIRED: '필수 입력 항목입니다.',
  }),
  OTHER_SCORE1: Object.freeze({
    REQUIRED: '필수 입력 항목입니다.',
    MIN_VALUE: '0점 이상 입력해주세요.',
    MAX_VALUE: '10점 이하로 입력해주세요.',
  }),
  SELECT: Object.freeze({
    REQUIRED: '필수 입력 항목입니다.',
  }),
  JUDGING_NUMBER: Object.freeze({
    REQUIRED: '필수 입력 항목입니다.',
    MIN_VALUE: '0점 이상 입력해주세요.',
    MAX_VALUE: (max: number) => `${max}점 이하로 입력해주세요.`,
  }),
});

export const CONFIG = Object.freeze({
  EMAIL: Object.freeze({
    REGEX: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  }),
  PHONE: Object.freeze({
    REGEX: /^\d+$/,
    MIN_LENGTH: 3,
    MAX_LENGTH: 100,
  }),
  PASSWORD: Object.freeze({
    MIN_LENGTH: 8,
    MAX_LENGTH: 100,
  }),
  OTHER_SCORE1: Object.freeze({
    MIN_VALUE: 0,
    MAX_VALUE: 10,
  }),
});
