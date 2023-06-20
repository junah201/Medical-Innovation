export const INPUT_TYPE = Object.freeze({
  EMAIL: 'email',
  PASSWORD: 'password',
  CONFIRM_PASSWORD: 'confirmPassword',
  NAME: 'name',
  PHONE: 'phone',
  BIRTH: 'birth',
  GENDER: 'gender',
  TEXT: 'text',
  RADIO: 'radio',
  TEXTAREA: 'textarea',
  FILE: 'file',
  SELECT: 'select',
  CHECKBOX: 'checkbox',
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
  OTHER_SCORE1: 'other_score1',
  OTHER_COMMENT: 'other_comment',

  JUDGING_EVENT: 'judging_event',
  FIRST_JUDGING_PERMISSION: 'first_judging_permission',
  SECOND_JUDGING_PERMISSION: 'second_judging_permission',
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
  BIRTH: Object.freeze({
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
});

export const CONFIG = Object.freeze({
  EMAIL: Object.freeze({
    REGEX:
      /^[^\s@+]+(\+[^\s@+]+)?@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,})$/,
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
