export const INPUT_TYPE = Object.freeze({
  EMAIL: 'email',
  PASSWORD: 'password',
  CONFIRM_PASSWORD: 'confirmPassword',
  NAME: 'name',
  PHONE: 'phone',
  BIRTH: 'birth',
});

export const REGISTER_TYPE = Object.freeze({
  EMAIL: 'email',
  PASSWORD: 'password',
  CONFIRM_PASSWORD: 'confirmPassword',
  NAME: 'name',
  PHONE: 'phone',
  BIRTH: 'birth',
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
});

export const CONFIG = Object.freeze({
  EMAIL: Object.freeze({
    REGEX: /^[^\s@+]+(\+[^\s@+]+)?@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,})$/,
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
});