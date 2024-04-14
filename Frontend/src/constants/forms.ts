import { UseFormRegister } from 'react-hook-form';

export interface FormRules<RegisterField = any> {
  required?: string;
  min?: {
    value: number | string;
    message: string;
  };
  max?: {
    value: number | string;
    message: string;
  };
  minLength?: {
    value: number;
    message: string;
  };
  maxLength?: {
    value: number;
    message: string;
  };
  pattern?: {
    value: RegExp;
    message: string;
  };
  validate?: (
    input: string,
    values: RegisterField
  ) => boolean | string;
}

export interface Option {
  label: string;
  value: any;
}

export const INPUT_TYPE = Object.freeze({
  TEXT: 'text',
  PASSWORD: 'password',
  NUMBER: 'number',
  DATE: 'date',
  RADIO: 'radio',
  MULTILINE: 'textarea',
  FILE: 'file',
  SELECT: 'select',
  CHECKBOX: 'checkbox',
  HTML: 'html',
  BOARD: 'board',
  FILES: 'files',
  CROP_IMAGE: 'crop_image',
  PUBLIC_EVENT: 'public_event',
});

type InputSchema = typeof INPUT_TYPE;
type InputKeys = keyof typeof INPUT_TYPE;
export type InputTypes = InputSchema[InputKeys];

export const INPUT = Object.freeze({
  EMAIL: Object.freeze({
    name: 'email',
    label: '이메일',
    type: INPUT_TYPE.TEXT,
    placeholder: 'name@domain.com',
    helperText: '이메일 주소를 입력해주세요',
    disabled: false,
    rules: {
      required: '이메일을 입력해주세요',
      pattern: {
        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
        message: '이메일 형식이 올바르지 않습니다',
      },
    },
  }),
  PASSWORD: Object.freeze({
    name: 'password',
    label: '비밀번호',
    type: INPUT_TYPE.PASSWORD,
    placeholder: '비밀번호를 입력해주세요',
    helperText: '비밀번호를 입력해주세요',
    disabled: false,
    rules: {
      required: '비밀번호를 입력해주세요',
      minLength: {
        value: 8,
        message: '비밀번호는 8자 이상 입력해주세요',
      },
      maxLength: {
        value: 100,
        message: '비밀번호는 100자 이하로 입력해주세요',
      },
    },
  }),
  CONFIRM_PASSWORD: Object.freeze({
    name: 'confirmPassword',
    label: '비밀번호 확인',
    type: INPUT_TYPE.PASSWORD,
    placeholder: '비밀번호를 다시 입력해주세요',
    helperText: '비밀번호를 다시 입력해주세요',
    disabled: false,
    rules: {
      required: '비밀번호를 다시 입력해주세요',
      validate: (
        input: string,
        values: Record<string, any>
      ) => {
        const password = values['password'];

        return (
          input === password ||
          '비밀번호가 일치하지 않습니다.'
        );
      },
    },
  }),
  NAME: Object.freeze({
    name: 'name',
    label: '이름',
    type: INPUT_TYPE.TEXT,
    placeholder: '홍길동',
    helperText: '이름을 입력해주세요',
    disabled: false,
    rules: {
      required: '이름을 입력해주세요',
    },
  }),
  PHONE: Object.freeze({
    name: 'phone',
    label: '전화번호',
    type: INPUT_TYPE.TEXT,
    placeholder: '01012345678',
    helperText: '전화번호를 입력해주세요',
    disabled: false,
    rules: {
      required: '전화번호를 입력해주세요',
      pattern: {
        value: /^\d+$/,
        message: '전화번호는 숫자로만 입력해주세요',
      },
      minLength: {
        value: 3,
        message: '전화번호가 너무 짧습니다',
      },
      maxLength: {
        value: 100,
        message: '전화번호가 너무 깁니다',
      },
    },
  }),
  BIRTH: Object.freeze({
    name: 'birth',
    label: '생년월일',
    type: INPUT_TYPE.DATE,
    placeholder: '생년월일을 입력해주세요',
    helperText: '생년월일을 입력해주세요',
    disabled: false,
    rules: {
      required: '생년월일을 입력해주세요',
    },
  }),
  ENGLISH_NAME: Object.freeze({
    name: 'english_name',
    label: '영문 이름',
    type: INPUT_TYPE.TEXT,
    placeholder: '영문 이름을 입력해주세요',
    helperText: '영문 이름을 입력해주세요',
    disabled: false,
    rules: {},
  }),
  GENDER: Object.freeze({
    name: 'gender',
    label: '성별',
    type: INPUT_TYPE.RADIO,
    placeholder: '',
    helperText: '성별을 선택해주세요',
    disabled: false,
    rules: {
      required: '성별을 선택해주세요',
    },
    options: [
      { label: '남자', value: '남자' },
      { label: '여자', value: '여자' },
    ],
  }),
  ORGANIZATION_TYPE: Object.freeze({
    name: 'organization_type',
    label: '소속',
    type: INPUT_TYPE.RADIO,
    placeholder: '',
    helperText: '소속을 선택해주세요',
    disabled: false,
    rules: {
      required: '소속을 선택해주세요',
    },
    options: [
      { label: '공공기관', value: '공공기관' },
      {
        label: '대학 및 연구소',
        value: '대학 및 연구소',
      },
      { label: '산업체', value: '산업체' },
      { label: '의료기관', value: '의료기관' },
      { label: '정부', value: '정부' },
      { label: '기타', value: '기타' },
    ],
  }),
  ORGANIZATION_NAME: Object.freeze({
    name: 'organization_name',
    label: '소속기관명',
    type: INPUT_TYPE.TEXT,
    placeholder: '소속기관명을 입력해주세요',
    helperText: '소속기관명을 입력해주세요',
    disabled: false,
    rules: {
      required: '소속기관명을 입력해주세요',
    },
  }),
  ORGANIZATION_ENGLISH_NAME: Object.freeze({
    name: 'organization_english_name',
    label: '소속기관명 (영문)',
    type: INPUT_TYPE.TEXT,
    placeholder: '소속기관명 (영문)을 입력해주세요',
    helperText: '소속기관명 (영문)을 입력해주세요',
    disabled: false,
    rules: {},
  }),
  JOB_POSITION: Object.freeze({
    name: 'job_position',
    label: '소속기관 직위',
    type: INPUT_TYPE.TEXT,
    placeholder: 'ex) 전공의, 과장',
    helperText: '소속기관 직위를 입력해주세요',
    disabled: false,
    rules: {},
  }),
  ADDRESS: Object.freeze({
    name: 'address',
    label: '소재지',
    type: INPUT_TYPE.TEXT,
    placeholder: '서울특별시 강남구',
    helperText: '소재지를 입력해주세요',
    disabled: false,
    rules: {},
  }),
  FINAL_DEGREE: Object.freeze({
    name: 'final_degree',
    label: '최종학력',
    type: INPUT_TYPE.RADIO,
    placeholder: '최종학력을 선택해주세요',
    helperText: '최종학력을 선택해주세요',
    disabled: false,
    rules: {
      required: '최종학력을 선택해주세요',
    },
    options: [
      { label: '전문학사', value: '전문학사' },
      {
        label: '학사 과정 중',
        value: '학사 과정 중',
      },
      { label: '학사', value: '학사' },
      {
        label: '석사 과정 중',
        value: '석사 과정 중',
      },
      { label: '석사', value: '석사' },
      {
        label: '박사 과정 중',
        value: '박사 과정 중',
      },
      { label: '박사', value: '박사' },
      { label: '기타', value: '기타' },
    ],
  }),
  ENGAGEMENT_TYPE: Object.freeze({
    name: 'engagement_type',
    label: '참여 유형',
    type: INPUT_TYPE.RADIO,
    placeholder: '',
    helperText: '참여 유형을 선택해주세요',
    disabled: false,
    rules: {
      required: '참여 유형을 선택해주세요',
    },
    options: [
      { label: '현장 참가', value: '현장 참가' },
      {
        label: '유튜브 라이브 시청',
        value: '유튜브 라이브 시청',
      },
      { label: '기타', value: '기타' },
    ],
  }),
  PARTICIPANT_MOTIVATION: Object.freeze({
    name: 'participant_motivation',
    label: '신청 동기',
    type: INPUT_TYPE.TEXT,
    placeholder: 'ex) 지인 추천',
    helperText: '신청 동기를 입력해주세요.',
    disabled: false,
    rules: {},
  }),
  PARTICIPANT_TYPE: Object.freeze({
    name: 'participant_type',
    label: '기술 구분',
    type: INPUT_TYPE.TEXT,
    placeholder: '',
    helperText: '기술 구분을 입력해주세요.',
    disabled: false,
    rules: {},
  }),
  INTEREST_DISEASE: Object.freeze({
    name: 'interest_disease',
    label: '타겟 질환 / 범위',
    type: INPUT_TYPE.TEXT,
    placeholder: '',
    helperText: '타겟 질환 / 범위을 입력해주세요',
    disabled: false,
    rules: {},
  }),
  INTEREST_FIELD: Object.freeze({
    name: 'interest_field',
    label: '분야',
    type: INPUT_TYPE.RADIO,
    placeholder: '',
    helperText: '분야를 선택해주세요.',
    disabled: false,
    rules: {},
    options: [
      {
        label: '일반',
        value: '일반',
      },
      {
        label: '연구분야',
        value: '연구분야',
      },
      {
        label: '의료기기산업분야',
        value: '의료기기산업분야',
      },
      {
        label: '제약분야',
        value: '제약분야',
      },
      {
        label: '바이오산업분야',
        value: '바이오산업분야',
      },
      {
        label: '기타',
        value: '기타',
      },
    ],
  }),
  INTEREST_FIELD_DETAIL: Object.freeze({
    name: 'interest_field_detail',
    label: '관심 분야 상세',
    type: INPUT_TYPE.TEXT,
    placeholder: '',
    helperText: '관심 분야 상세를 입력해주세요',
    disabled: false,
    rules: {},
  }),
  PROFILE_FILE: Object.freeze({
    name: 'profile_filename',
    label: '프로필 파일',
    type: INPUT_TYPE.FILE,
    placeholder: '',
    helperText: '프로필 파일을 첨부해주세요',
    disabled: false,
    rules: {},
  }),
  ZIP_FILE: Object.freeze({
    name: 'zip_filename',
    label: '압축 파일',
    type: INPUT_TYPE.FILE,
    placeholder: '',
    helperText: '필요한 파일을 압축하여 첨부해주세요',
    disabled: false,
    rules: {},
  }),
  // Post
  POST_TITLE: Object.freeze({
    name: 'title',
    label: '제목',
    type: INPUT_TYPE.TEXT,
    placeholder: '',
    helperText: '게시물 제목을 입력해주세요',
    disabled: false,
    rules: {},
  }),
  BOARD_ID: Object.freeze({
    name: 'board_id',
    label: '게시판',
    type: INPUT_TYPE.BOARD,
    placeholder: '',
    helperText: '게시판을 선택해주세요',
    disabled: false,
    rules: {},
  }),
  POST_CONTENT: Object.freeze({
    name: 'content',
    label: '본문',
    type: INPUT_TYPE.HTML,
    placeholder: '',
    helperText: '게시물 내용을 입력해주세요',
    disabled: false,
    rules: {},
  }),
  POST_FILES: Object.freeze({
    name: 'files',
    label: '첨부파일',
    type: INPUT_TYPE.FILES,
    placeholder: '',
    helperText: '첨부파일을 업로드해주세요.',
    disabled: false,
    rules: {},
  }),
  // banner
  BANNER_COMPANY_NAME: Object.freeze({
    name: 'name',
    label: '회사명',
    type: INPUT_TYPE.TEXT,
    placeholder: '미래의학연구재단',
    helperText: '회사명을 입력해주세요',
    disabled: false,
    rules: {
      required: '회사명을 입력해주세요',
    },
  }),
  BANNER_LINK: Object.freeze({
    name: 'link',
    label: '링크',
    type: INPUT_TYPE.TEXT,
    placeholder: '만약 없다면 공백 하나만 입력해주세요.',
    helperText: '링크를 입력해주세요',
    disabled: false,
    rules: {
      required: '링크를 입력해주세요',
    },
  }),
  BANNER_END_AT: Object.freeze({
    name: 'banner_end_at',
    label: '배너 종료 시점',
    type: INPUT_TYPE.DATE,
    placeholder: '',
    helperText: '배너 종료 시점을 입력해주세요',
    disabled: false,
    rules: {
      required: '배너 종료 시점을 입력해주세요',
    },
  }),
  BANNER_IMAGE: Object.freeze({
    name: 'filename',
    label: '배너 이미지',
    type: INPUT_TYPE.CROP_IMAGE,
    placeholder: '',
    helperText: '배너 이미지를 업로드해주세요',
    disabled: false,
    rules: {
      required: '배너 이미지를 업로드해주세요',
    },
    radio: 21 / 10,
  }),
  // SponsoringCompany
  SPONSORING_COMPANY_NAME: Object.freeze({
    name: 'name',
    label: '기업명',
    type: INPUT_TYPE.TEXT,
    placeholder: '플레이데이터',
    helperText: '기업명을 입력해주세요',
    disabled: false,
    rules: {
      required: '기업명을 입력해주세요',
    },
  }),
  SPONSORING_COMPANY_LINK: Object.freeze({
    name: 'link',
    label: '링크',
    type: INPUT_TYPE.TEXT,
    placeholder: '만약 없다면 # 하나만 입력해주세요.',
    helperText: '링크를 입력해주세요',
    disabled: false,
    rules: {
      required: '링크를 입력해주세요',
    },
  }),
  SPONSORING_COMPANY_YEAR: Object.freeze({
    name: 'year',
    label: '후원 연도',
    type: INPUT_TYPE.TEXT,
    placeholder: '2024',
    helperText: '연도를 입력해주세요',
    disabled: false,
    rules: {
      required: '연도를 입력해주세요',
    },
  }),
  SPONSORING_COMPANY_FILE: Object.freeze({
    name: 'filename',
    label: '배너 이미지',
    type: INPUT_TYPE.CROP_IMAGE,
    placeholder: '',
    helperText: '배너 이미지를 업로드해주세요',
    disabled: false,
    rules: {
      required: '배너 이미지를 업로드해주세요',
    },
    radio: 21 / 10,
  }),
  // MOU
  MOU_COMPANY_NAME: Object.freeze({
    name: 'name',
    label: '회사명',
    type: INPUT_TYPE.TEXT,
    placeholder: '플레이데이터',
    helperText: '회사명을 입력해주세요',
    disabled: false,
    rules: {
      required: '회사명을 입력해주세요',
    },
  }),
  MOU_COMPANY_LINK: Object.freeze({
    name: 'link',
    label: '사이트 링크',
    type: INPUT_TYPE.TEXT,
    placeholder: '만약 없다면 # 하나만 입력해주세요.',
    helperText: '링크를 입력해주세요',
    disabled: false,
    rules: {
      required: '링크를 입력해주세요',
    },
  }),
  MOU_COMPANY_FILE: Object.freeze({
    name: 'filename',
    label: 'MOU 이미지',
    type: INPUT_TYPE.CROP_IMAGE,
    placeholder: '2024',
    helperText: 'MOU 이미지를 업로드해주세요',
    disabled: false,
    rules: {
      required: 'MOU 이미지를 업로드해주세요',
    },
    radio: 21 / 10,
  }),
  ADVISOR_NAME: Object.freeze({
    name: 'name',
    label: '이름',
    type: INPUT_TYPE.TEXT,
    placeholder: '홍길동',
    helperText: '이름을 입력해주세요',
    disabled: false,
    rules: {
      required: '이름을 입력해주세요',
    },
  }),
  ADVISOR_TYPE: Object.freeze({
    name: 'type',
    label: '자문단 종류',
    type: INPUT_TYPE.SELECT,
    placeholder: '',
    helperText: '자문단 종류를 선택해주세요',
    disabled: false,
    rules: {
      required: '자문단 종류를 선택해주세요',
    },
    options: [
      '이사',
      '고문',
      '전문심의위원회',
      '자문위원회',
      'VC 자문단',
      '창업기획자 전문가그룹장',
      '창업기획자 전문가그룹',
      '칼럼니스트',
    ].map((data) => ({ value: data, label: data })),
  }),
  ADVISOR_DESCRIPTION: Object.freeze({
    name: 'description',
    label: '자문단 소개',
    type: INPUT_TYPE.MULTILINE,
    placeholder: '',
    helperText: '자문단 소개를 입력해주세요',
    disabled: false,
    rules: {
      required: '자문단 소개를 입력해주세요',
    },
  }),
  ADVISOR_PROFILE_IMAGE: Object.freeze({
    name: 'filename',
    label: '자문단 이미지',
    type: INPUT_TYPE.CROP_IMAGE,
    placeholder: '',
    helperText: '자문단 이미지를 업로드해주세요',
    disabled: false,
    rules: {
      required: '자문단 이미지를 업로드해주세요',
    },
    radio: 3 / 4,
  }),
  // Public Event
  PUBLIC_EVENT_NAME: Object.freeze({
    name: 'name',
    label: '행사명',
    type: INPUT_TYPE.TEXT,
    placeholder: '플레이데이터',
    helperText: '행사명을 입력해주세요',
    disabled: false,
    rules: {
      required: '행사명을 입력해주세요',
    },
  }),
  PUBLIC_EVENT_ENGLISH_NAME: Object.freeze({
    name: 'english_name',
    label: '행사명 (영문)',
    type: INPUT_TYPE.TEXT,
    placeholder: 'playdata',
    helperText: '행사명 (영문)을 입력해주세요',
    disabled: false,
    rules: {},
  }),
  PUBLIC_EVENT_DESCRIPTION: Object.freeze({
    name: 'description',
    label: '행사 설명',
    type: INPUT_TYPE.HTML,
    placeholder: '',
    helperText: '행사 설명을 입력해주세요',
    disabled: false,
    rules: {
      required: '행사 설명을 입력해주세요',
    },
  }),
  PUBLIC_EVENT_START_DATE: Object.freeze({
    name: 'start_date',
    label: '행사 시작일',
    type: INPUT_TYPE.DATE,
    placeholder: '',
    helperText: '행사 시작일을 입력해주세요',
    disabled: false,
    rules: {
      required: '행사 시작일을 입력해주세요',
    },
  }),
  PUBLIC_EVENT_END_DATE: Object.freeze({
    name: 'end_date',
    label: '행사 종료일',
    type: INPUT_TYPE.DATE,
    placeholder: '',
    helperText: '행사 종료일을 입력해주세요',
    disabled: false,
    rules: {
      required: '행사 종료일을 입력해주세요',
    },
  }),
  PUBLIC_EVENT_JOIN_START_DATE: Object.freeze({
    name: 'join_start_date',
    label: '참가 신청 시작일',
    type: INPUT_TYPE.DATE,
    placeholder: '',
    helperText: '참가 신청 시작일을 입력해주세요',
    disabled: false,
    rules: {
      required: '참가 신청 시작일을 입력해주세요',
    },
  }),
  PUBLIC_EVENT_JOIN_END_DATE: Object.freeze({
    name: 'join_end_date',
    label: '참가 신청 종료일',
    type: INPUT_TYPE.DATE,
    placeholder: '',
    helperText: '참가 신청 종료일을 입력해주세요',
    disabled: false,
    rules: {
      required: '참가 신청 종료일을 입력해주세요',
    },
  }),
  PUBLIC_EVENT_IMAGE: Object.freeze({
    name: 'thumbnail_filename',
    label: '행사 이미지',
    type: INPUT_TYPE.FILE,
    placeholder: '',
    helperText: '행사 이미지를 업로드해주세요',
    disabled: false,
    rules: {
      required: '행사 이미지를 업로드해주세요',
    },
  }),
  // Judging Event
  JUDGING_EVENT_NAME: Object.freeze({
    name: 'name',
    label: '행사명',
    type: INPUT_TYPE.TEXT,
    placeholder: '플레이데이터',
    helperText: '행사명을 입력해주세요',
    disabled: false,
    rules: {
      required: '행사명을 입력해주세요',
    },
  }),
  JUDGING_EVENT_DESCRIPTION: Object.freeze({
    name: 'description',
    label: '행사 설명',
    type: INPUT_TYPE.HTML,
    placeholder: '',
    helperText: '행사 설명을 입력해주세요',
    disabled: false,
    rules: {
      required: '행사 설명을 입력해주세요',
    },
  }),
  JUDGING_EVENT_JOIN_START_DATE: Object.freeze({
    name: 'join_start_date',
    label: '참가 신청 시작일',
    type: INPUT_TYPE.DATE,
    placeholder: '',
    helperText: '참가 신청 시작일을 입력해주세요',
    disabled: false,
    rules: {
      required: '참가 신청 시작일을 입력해주세요',
    },
  }),
  JUDGING_EVENT_JOIN_END_DATE: Object.freeze({
    name: 'join_end_date',
    label: '참가 신청 종료일',
    type: INPUT_TYPE.DATE,
    placeholder: '',
    helperText: '참가 신청 종료일을 입력해주세요',
    disabled: false,
    rules: {
      required: '참가 신청 종료일을 입력해주세요',
    },
  }),
  JUDGING_EVENT_1ST_START_DATE: Object.freeze({
    name: 'judging_1st_start_date',
    label: '1차 심사 시작일',
    type: INPUT_TYPE.DATE,
    placeholder: '',
    helperText: '1차 심사 시작일을 입력해주세요',
    disabled: false,
    rules: {
      required: '1차 심사 시작일을 입력해주세요',
    },
  }),
  JUDGING_EVENT_1ST_END_DATE: Object.freeze({
    name: 'judging_1st_end_date',
    label: '1차 심사 종료일',
    type: INPUT_TYPE.DATE,
    placeholder: '',
    helperText: '1차 심사 종료일을 입력해주세요',
    disabled: false,
    rules: {
      required: '1차 심사 종료일을 입력해주세요',
    },
  }),
  JUDGING_EVENT_2ND_START_DATE: Object.freeze({
    name: 'judging_2nd_start_date',
    label: '2차 심사 시작일',
    type: INPUT_TYPE.DATE,
    placeholder: '',
    helperText: '2차 심사 시작일을 입력해주세요',
    disabled: false,
    rules: {
      required: '2차 심사 시작일을 입력해주세요',
    },
  }),
  JUDGING_EVENT_2ND_END_DATE: Object.freeze({
    name: 'judging_2nd_end_date',
    label: '2차 심사 종료일',
    type: INPUT_TYPE.DATE,
    placeholder: '',
    helperText: '2차 심사 종료일을 입력해주세요',
    disabled: false,
    rules: {
      required: '2차 심사 종료일을 입력해주세요',
    },
  }),
  JUDGING_EVENT_IMAGE: Object.freeze({
    name: 'thumbnail_filename',
    label: '행사 이미지',
    type: INPUT_TYPE.FILE,
    placeholder: '',
    helperText: '행사 이미지를 업로드해주세요',
    disabled: false,
    rules: {
      required: '행사 이미지를 업로드해주세요',
    },
  }),
});

export type RegisterTypes =
  (typeof INPUT)[keyof typeof INPUT]['name'];
export type RegisterField = Record<RegisterTypes, any>;
export type RegisterForm = UseFormRegister<RegisterField>;
