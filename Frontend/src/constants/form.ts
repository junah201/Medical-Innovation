export const INPUT_TYPE = Object.freeze({
  EMAIL: 'email',
  PASSWORD: 'password',
  PASSWORD_CONFIRM: 'passwordConfirm',
});

export const REGISTER_TYPE = Object.freeze({
  EMAIL: 'email',
  PASSWORD: 'password',
  PASSWORD_CONFIRM: 'passwordConfirm',
});

export const ERROR_MESSAGE = Object.freeze({
  EMAIL: Object.freeze({
    REQUIRED: '필수 입력 항목입니다.',
    IS_EMAIL: '이메일 형식이 아닙니다.',
  }),
  PASSWORD: Object.freeze({
    REQUIRED: '필수 입력 항목입니다.',
    MIN_LENGTH: '비밀번호가 너무 짧습니다.',
    MAX_LENGTH: '비밀번호가 너무 깁니다.',
  }),
  PASSWORD_CONFIRM: Object.freeze({
    REQUIRED: 'Please enter your password!',
    NOT_MATCH: 'Password not match',
  }),
});

export const CONFIG = Object.freeze({
  EMAIL: Object.freeze({
    REGEX: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  }),
  PASSWORD: Object.freeze({
    MIN_LENGTH: 1,
    MAX_LENGTH: 100,
  }),
});
