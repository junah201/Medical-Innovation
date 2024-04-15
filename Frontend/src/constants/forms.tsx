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
  JUDGING_EVENT: 'judging_event',
  JUDGING: 'judging',
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
    label: '증명사진',
    type: INPUT_TYPE.FILE,
    placeholder: '',
    helperText: '증명사진을 첨부해주세요',
    disabled: false,
    rules: {
      required: '증명사진을 첨부해주세요',
    },
  }),
  ZIP_FILE: Object.freeze({
    name: 'zip_filename',
    label: '압축 파일',
    type: INPUT_TYPE.FILE,
    placeholder: '',
    helperText: '필요한 파일을 압축하여 첨부해주세요',
    disabled: false,
    rules: {
      required: '필요한 파일을 압축하여 첨부해주세요',
    },
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
  JUDGING_1ST_FORM_TYPE: Object.freeze({
    name: 'judging_1st_form_type',
    label: '1차 심사 양식',
    type: INPUT_TYPE.SELECT,
    placeholder: '',
    helperText: '1차 심사 양식을 선택해주세요.',
    disabled: false,
    rules: {
      required: '1차 심사 양식을 선택해주세요.',
    },
    options: ['기본', '연구계획서 심의표'].map((data) => ({
      value: data,
      label: data,
    })),
  }),
  JUDGING_2ND_FORM_TYPE: Object.freeze({
    name: 'judging_2nd_form_type',
    label: '2차 심사 양식',
    type: INPUT_TYPE.SELECT,
    placeholder: '',
    helperText: '2차 심사 양식을 선택해주세요.',
    disabled: false,
    rules: {
      required: '2차 심사 양식을 선택해주세요.',
    },
    options: ['기본'].map((data) => ({
      value: data,
      label: data,
    })),
  }),
  // Judging result 1th standard
  TECHNICAL_SCORE_1: Object.freeze({
    name: 'technical_score1',
    label: '우월성',
    type: INPUT_TYPE.JUDGING,
    helperText: (
      <>
        대상기술의 유형을 파생기술, 응용기술, 원천기술
        등으로 구분하고, 기술적 우월성을 판단함. 가장 높은
        범주인 원천기술이란 해당 기술이 속해있는 분야에서
        기술표준을 주도하는 기술을 의미함.
      </>
    ),
    options: [
      '기술적 우월성이 없음',
      '파생기술 및 응용기술로서 기술적 우월성이 미흡함.',
      '파생기술 및 응용기술로서 기술적 우월성이 보통임.',
      '원천기술에 근접하는 기술로써 기술적 우월성이 높음.',
      '원천기술로써 기술적 우월성이 매우 높음.',
    ].map((item, index) => ({
      value: `${index + 1}`,
      label: item,
    })),
  }),
  TECHNICAL_SCORE_2: Object.freeze({
    name: 'technical_score2',
    label: '혁신성',
    type: INPUT_TYPE.JUDGING,
    helperText: (
      <>
        대상기술을 기술혁신의 응용과 확산 정도에 따라
        혁신기술(revolutionary), 주요 개량기술(major
        improvement), 보통 개량기술(minor improvement),
        일부개량 및 기존 기술과 유사 등으로 구분하여 평가함.
        <br />
        <small>
          ∴여기서 혁신기술이랑 기존기술을 대체할 수 있는
          신기술을 의미하고, 개량기술은 기존 제품 혹은
          서비스에 기술적 우위성을 부가하는 기술을 의미함.
        </small>
      </>
    ),
    options: [
      '대상기술은 혁신관점에서 기존기술과 매우 유사하거나 동일함.',
      '대상기술은 기존 기술에 비해 일부 개량됨.',
      '대상기술은 기술의 일부가 혁신적인 기술임(보통 개량기술).',
      '대상기술의 상당 부분이 혁신적인 기술임(주요 개량기술).',
      '대상기술 자체가 혁신적인 기술임(혁신기술).',
    ].map((item, index) => ({
      value: `${index + 1}`,
      label: item,
    })),
  }),
  TECHNICAL_SCORE_3: Object.freeze({
    name: 'technical_score3',
    label: '차별성',
    type: INPUT_TYPE.JUDGING,
    helperText: (
      <>
        경쟁기술 대비 대상기술의 차별적 속성을 평가함.
        차별적 속성을 비교할 수 있는 항목 중 단일 항목의
        차별성이 매우 높은 경우 혹은 복수 항목의 차별성이
        모두 유의한 경우에 양호 또는 우수로 평가할 수 있음.
        기술의 차별성을 평가할 수 있는 항목은 다음과 같음.
        <br />
        <small>
          {'<검토항목>'}
          <br />
          - 생산수율 또는 기능 개선
          <br />
          - 원가절감 또는 시간절감
          <br />
          - 공정 또는 공법 개선
          <br />
          - 사용편의성
          <br />
          - 기타
          <br />
        </small>
      </>
    ),
    options: [
      '경쟁기술에 비해 차별성이 거의 없음.',
      '경쟁기술에 비해 차별성이 약함.',
      '경쟁기술에 비해 차별성이 보통 수준임.',
      '경쟁기술에 비해 차별성이 양호함.',
      '경쟁기술에 비해 차별성이 우수함.',
    ].map((item, index) => ({
      value: `${index + 1}`,
      label: item,
    })),
  }),
  TECHNICAL_SCORE_4: Object.freeze({
    name: 'technical_score4',
    label: '기술 경쟁강도',
    type: INPUT_TYPE.JUDGING,
    helperText: (
      <>
        현재 목표시장에서 대상기술과 연관이 있는
        경쟁기술(유사기술)의 수, 기술 간 상호 경쟁관계 등을
        파악하고 기술간 경쟁구조와 경쟁환경이 대상기술의
        사업화에 미치는 영향을 평가함.
      </>
    ),
    options: [
      '목표시장에 경쟁기술 수가 매우 많고 경쟁이 매우 치열함.',
      '목표시장에 경쟁기술 수가 많고 경쟁이 치열함.',
      '목표시장에 경쟁기술 수와 경쟁이 보통임.',
      '목표시장에 경쟁기술 수가 적고 경쟁정도가 낮음.',
      '목표시장에 경쟁기술이 거의 없음.',
    ].map((item, index) => ({
      value: index + 1,
      label: item,
    })),
  }),
  TECHNICAL_SCORE_5: Object.freeze({
    name: 'technical_score5',
    label: '파급성',
    type: INPUT_TYPE.JUDGING,
    helperText: (
      <>
        대상기술이 현재 적용될 수 있는 시장 및 제품 이외에
        향후 응용 가능성 및 융합기술의 개발에 적용될
        가능성을 평가함. 즉, 대상기술의 향후 타제품 및
        시장으로의 확장, 적용 가능성을 평가함.
      </>
    ),
    options: [
      '적용가능성이 거의 없음.',
      '적용가능성이 일부 있음.',
      '적용가능성이 보통 수준임.',
      '적용가능성이 높음.',
      '적용가능성이 매우 높음.',
    ].map((item, index) => ({
      value: index + 1,
      label: item,
    })),
  }),
  TECHNICAL_SCORE_6: Object.freeze({
    name: 'technical_score6',
    label: '혁신성',
    type: INPUT_TYPE.JUDGING,
    helperText: (
      <>
        기술수준의 고도성 또는 복잡성으로 인해 모방이 어려운
        정도를 평가함. 외부 공개 자료에 의한 모방 가능성
        정도, 출시 제품에 대한 리버스 엔지니어링을 통한 모방
        가능성 정도 등을 종합적으로 고려함.
        <br />
        <small>
          - 대상기술의 모방 난이도가 높을수록 상당기간 동안
          모방이 어렵기 때문에 기술위험이 상대적으로
          낮아지고 사업화 위험도 낮아짐.
        </small>
      </>
    ),
    options: [
      '대상기술의 모방이 쉬움.',
      '대상기술의 모방이 비교적 쉬움.',
      '대상기술의 모방 가능성이 보통임.',
      '대상기술의 모방이 어려움.',
      '대상기술의 모방이 매우 어려움.',
    ].map((item, index) => ({
      value: index + 1,
      label: item,
    })),
  }),
  MARKETABILITY_SCORE_1: Object.freeze({
    name: 'marketability_score1',
    label: '시장진입 가능성',
    type: INPUT_TYPE.JUDGING,
    helperText: (
      <>
        시장진입 장애요인을 분석하여 대상기술의 시장진입
        가능성을 평가함.
        <br />
        <small>
          {'<검토항목>'}
          <br />
          - 시장을 주도하는 기업으로 인해 시장진입이 어렵다
          <br />
          - 제품 차별화 요인이 크지 않아 시장진입이 어렵다
          <br />
          - 기존 경쟁자의 유통망이 견고하여 시장진입이
          어렵다
          <br />
          - 시장에 진입하기 위한 소요자본 규모가 크다
          <br />- 법·제도적인 장애요인이 많다
        </small>
      </>
    ),
    options: [
      '4가지 이상 장애요인 있음.',
      '3가지 장애요인 있음.',
      '2가지 장애요인 있음.',
      '1가지 장애요인 있음.',
      '장애요인 없음.',
    ].map((item, index) => ({
      value: index + 1,
      label: item,
    })),
  }),
  MARKETABILITY_SCORE_2: Object.freeze({
    name: 'marketability_score2',
    label: '시장 경쟁강도',
    type: INPUT_TYPE.JUDGING,
    helperText: (
      <>
        대상기술이 속한 목표시장의 경쟁구조, 시장지배자의
        유형, 독과점 여부, 경쟁제품의 수 등 시장의
        경쟁강도가 대상기술의 사업화에 미치는 영향을 평가함.
        <br />
        <small>
          - 일반적으로 독과점 정도가 높을수록 혹은 시장
          선도기업들의 경쟁이 치열할수록 시장침투가 용이하지
          않을수록 시장위험이 상대적으로 커지게 됨. 그러나
          대상기업이 경쟁력이 있고, 이미 목표시장에 진입한
          경우 독과점 시장구조가 사업화에 유리할 수 있음.
        </small>
      </>
    ),
    options: [
      '목표시장의 경쟁강도가 대상기술의 사업화에 매우 불리함.',
      '목표시장의 경쟁강도가 대상기술의 사업화에 불리함.',
      '목표시장의 경쟁강도가 대상기술의 사업화에 거의 영향이 없음.',
      '목표시장의 경쟁강도가 대상기술의 사업화에 유리함.',
      '목표시장의 경쟁강도가 대상기술의 사업화에 매우 유리함.',
    ].map((item, index) => ({
      value: index + 1,
      label: item,
    })),
  }),
  MARKETABILITY_SCORE_3: Object.freeze({
    name: 'marketability_score3',
    label: '시장 경쟁의 변화',
    type: INPUT_TYPE.JUDGING,
    helperText: (
      <>
        향후 3-5년 이내 경쟁상황(경쟁제품의 수, 경쟁기업의
        수 등)의 변화가 대상기술의 사업화에 미치는 영향을
        평가함.
      </>
    ),
    options: [
      '향후 시장에서 경쟁상황 또는 경쟁구조의 변화가 기술사업화에 매우 부정적인 영향을 미침.',
      '향후 시장에서 경쟁상황 또는 경쟁구조의 변화가 기술사업화에 부정적인 영향을 미침.',
      '향후 시장에서 경쟁상황 또는 경쟁구조의 변화가 기술사업화에 거의 영향을 미치지 않음.',
      '향후 시장에서 경쟁상황 또는 경쟁구조의 변화가 기술사업화에 긍정적인 영향을 미침.',
      '향후 시장에서 경쟁상황 또는 경쟁구조의 변화가 기술사업화에 매우 긍정적인 영향을 미침.',
    ].map((item, index) => ({
      value: index + 1,
      label: item,
    })),
  }),
  MARKETABILITY_SCORE_4: Object.freeze({
    name: 'marketability_score4',
    label: '시장의 성장전망',
    type: INPUT_TYPE.JUDGING,
    helperText: (
      <>
        향후 5년간 목표시장의 연평균 성장률을 통해 시장의
        성장성을 평가함.
      </>
    ),
    options: [
      '목표시장의 향후 연평균 성장률이 마이너스(-)로 예상됨.',
      '목표시장의 향후 연평균 성장률이 5%미만으로 예상됨.',
      '목표시장의 향후 연평균 성장률이 5-10%미만으로 예상됨.',
      '목표시장의 향후 연평균 성장률이 10-15%미만으로 예상됨.',
      '목표시장의 향후 연평균 성장률이 15%이상으로 예상됨.',
    ].map((item, index) => ({
      value: index + 1,
      label: item,
    })),
  }),
  BUSINESS_SCORE_1: Object.freeze({
    name: 'business_score1',
    label: '예상 시장 점유율',
    type: INPUT_TYPE.JUDGING,
    helperText: (
      <>
        시장 내 경쟁자 수, 경쟁상황, 대상기술 제품의 경쟁력,
        사업주체의 사업화 역량 등을 종합적으로 고려하여
        대상기술 제품이 목표시장에서 점유할 수 있는 최대
        시장점유율을 통해 예상 시장점유율을 평가함.
      </>
    ),
    options: [
      '대상기술 제품의 예상 시장점유율이 목표시장에서 매우 낮을 것으로 예상됨.',
      '대상기술 제품의 예상 시장점유율이 목표시장에서 하위그룹 수준일 가능성이 높음.',
      '대상기술 제품의 예상 시장점유율이 목표시장에서 중간그룹 수준일 가능성이 높음.',
      '대상기술 제품의 예상 시장점유율이 목표시장에서 선두그룹 수준일 가능성이 높음.',
      '대상기술 제품의 예상 시장점유율이 목표시장에서 선두그룹 수준일 가능성이 매우 높음.',
    ].map((item, index) => ({
      value: index + 1,
      label: item,
    })),
  }),
  BUSINESS_SCORE_2: Object.freeze({
    name: 'business_score2',
    label: '사업화 준비기간',
    type: INPUT_TYPE.JUDGING,
    helperText: (
      <>
        기술사업화까지 소요되는 준비기간이 어느 정도인지를
        평가함.
      </>
    ),
    options: [
      '기술사업화를 위해 2년 이상의 준비기간이 필요함.',
      '기술사업화를 위해 1-2년 미만의 준비기간이 필요함.',
      '기술사업화를 위해 6개월-1년 미만의 준비기간이 필요함.',
      '기술사업화를 위해 6개월 미만의 준비기간이 필요함.',
      '즉 사업화가 가능함.',
    ].map((item, index) => ({
      value: index + 1,
      label: item,
    })),
  }),
  BUSINESS_SCORE_3: Object.freeze({
    name: 'business_score3',
    label: '사업화 소요자금',
    type: INPUT_TYPE.JUDGING,
    helperText: (
      <>
        대상기술의 사업화를 위해 필요한 소요자본 규모를
        추정하고 아래의 기준에 의해 평가함. 예상되는
        자본투자 규모가 상당히 클 경우 사업화 추진에
        애로사항이 될 수 있음.
      </>
    ),
    options: [
      '기술사업화에 소요될 것으로 예상되는 자본투자 규모가 매우 큼.',
      '기술사업화에 소요될 것으로 예상되는 자본투자 규모가 큼.',
      '기술사업화에 소요될 것으로 예상되는 자본투자 규모가 보통 수준임.',
      '기술사업화에 소요될 것으로 예상되는 자본투자 규모가 적음.',
      '추가적인 자본투자 없이 사업화가 가능함.',
    ].map((item, index) => ({
      value: index + 1,
      label: item,
    })),
  }),
  BUSINESS_SCORE_4: Object.freeze({
    name: 'business_score4',
    label: '생산 용이성',
    type: INPUT_TYPE.JUDGING,
    helperText: (
      <>
        제품을 생산하는데 필요한 생상활동과 관련된 아래
        사항들을 고려하여 생산용이성을 평가함. *전체
        외주생산의 경우에는 최대 3점까지 부여가능
        <br />
        <small>
          {'<검토항목>'}
          <br />
          - 생상인력 확보에 어려움이 없다
          <br />
          - 재료 및 부재료(부품)가격이 안정적이다
          <br />
          - 물량확보가 용이하고, 수급이 안정적이다
          <br />
          - 다수의 공급자가 존재한다
          <br />
          - 신속한 조달이 가능하다
          <br />- 물류비용이 저렴하다
        </small>
      </>
    ),
    options: [
      '1개 이하 항목 충족',
      '2개 항목 충족',
      '3개 항목 충족',
      '4개 항목 충족',
      '5개 이상 항목 충족',
    ].map((item, index) => ({
      value: index + 1,
      label: item,
    })),
  }),
  BUSINESS_SCORE_5: Object.freeze({
    name: 'business_score5',
    label: '매출 성장추세',
    type: INPUT_TYPE.JUDGING,
    helperText: (
      <>
        대상기술 제품의 예상 연평균 매출액 성장률과 동업종의
        최근 3년간 연평균 매출액 성장률을 비교하여 평가함.
        (평가 대상기업은 향후 3년까지 예상매출액을 제시할
        것)
        <br />
        <small>
          *비교대상 동업종 자료는 한국은행의 ‘기업경영분석’
          및 기타 신뢰할 수 있는 기업재무정보 제공기관에서의
          세세분류 업종 자료 사용을 권장함.
        </small>
      </>
    ),
    options: [
      '예상 매출액 성장률이 동업종 평균보다 매우 낮을 것으로 예상됨.',
      '예상 매출액 성장률이 동업종 평균보다 낮을 것으로 예상됨.',
      '예상 매출액 성장률이 동업종 평균과 유사할 것으로 예상됨.',
      '예상 매출액 성장률이 동업종 평균보다 2배 이상 높을 것으로 예상됨.',
      '예상 매출액 성장률이 동업종 평균보다 3배 이상 높을 것으로 예상됨.',
    ].map((item, index) => ({
      value: index + 1,
      label: item,
    })),
  }),
  BUSINESS_SCORE_6: Object.freeze({
    name: 'business_score6',
    label: '수익성',
    type: INPUT_TYPE.JUDGING,
    helperText: (
      <>
        대상기술 제품의 예상 영업이익률과 동업종의 최근
        3년간 평균 영업이익률을 비교하여 평가함.
        <br />
        <small>
          *비교대상 동업종 자료는 한국은행의 ‘기업경영분석’
          및 기타 신뢰할 수 있는 기업재무정보 제공기관에서의
          세세분류 업종 자료 사용을 권장함.
        </small>
      </>
    ),
    options: [
      '영업이익률이 매우 낮을 것으로 예상됨.',
      '영업이익률이 동업종 평균 이하일 것으로 예상됨.',
      '영업이익률이 동업종과 유사할 것으로 예상됨.',
      '영업이익률이 동업종 평균보다 10%이상 높을 것으로 예상됨.',
      '영업이익률이 동업종 평균보다 20%이상 높을 것으로 예상됨.',
    ].map((item, index) => ({
      value: index + 1,
      label: item,
    })),
  }),
  BUSINESS_SCORE_7: Object.freeze({
    name: 'business_score7',
    label: '파생적 매출',
    type: INPUT_TYPE.JUDGING,
    helperText: (
      <>
        대상기술 도입 또는 적용으로 인해 타 산업 분야에서
        매출이 발생할 가능성을 평가함. (한국표준산업분류
        참고)
      </>
    ),
    options: [
      '타 산업에서의 어떠한 파생적 매출 발생 가능성이 없음.',
      '1개 산업에서 파생적 매출이 발생할 가능성이 있음.',
      '2개 산업에서 파생적 매출이 발생할 가능성이 있음.',
      '3개 산업에서 파생적 매출이 발생할 가능성이 있음.',
      '4개 산업에서 파생적 매출이 발생할 가능성이 있음.',
    ].map((item, index) => ({
      value: index + 1,
      label: item,
    })),
  }),
  BUSINESS_SCORE_8: Object.freeze({
    name: 'business_score8',
    label: '신제품 출현 가능성',
    type: INPUT_TYPE.JUDGING,
    helperText: (
      <>
        목표시장에서 향후 3년 이내에 경쟁 신제품이 출현할
        가능성에 대해 평가함.
      </>
    ),
    options: [
      '경쟁 신제품이 출현할 가능성이 매우 높음.',
      '경쟁 신제품이 출현할 가능성이 높음.',
      '경쟁 신제품이 출현할 가능성이 있음.',
      '경쟁 신제품이 출현할 가능성이 낮음.',
      '경쟁 신제품이 출현할 가능성이 매우 낮음.',
    ].map((item, index) => ({
      value: index + 1,
      label: item,
    })),
  }),
  OTHER_SCORE_1: Object.freeze({
    name: 'other_score1',
    label: '기타 고려 사항',
    type: INPUT_TYPE.NUMBER,
    helperText:
      '위과 같은 항목을 근거로 정성적으로 1~10점을 기재해 주십시오.',
    rule: {
      min: {
        value: 0,
        message: '0 이상의 값을 입력해주세요',
      },
      max: {
        value: 10,
        message: '10 이하의 값을 입력해주세요',
      },
    },
  }),
  // 연구 계획서 심의표
  RESEARCH_PLAN_SCORE_1: Object.freeze({
    name: 'research_plan_score1',
    label: '연구신청서의 연구과제명 및 내용의 적합성',
    type: INPUT_TYPE.NUMBER,
    helperText: '0점에서 20점으로 입력해주세요.',
    rule: {
      min: {
        value: 0,
        message: '0 이상의 값을 입력해주세요',
      },
      max: {
        value: 20,
        message: '20 이하의 값을 입력해주세요',
      },
    },
  }),
  RESEARCH_PLAN_SCORE_2: Object.freeze({
    name: 'research_plan_score2',
    label: '연구계획서 내용의 명확성 및 독창성',
    type: INPUT_TYPE.NUMBER,
    helperText: '0점에서 20점으로 입력해주세요.',
    rule: {
      min: {
        value: 0,
        message: '0 이상의 값을 입력해주세요',
      },
      max: {
        value: 20,
        message: '20 이하의 값을 입력해주세요',
      },
    },
  }),
  RESEARCH_PLAN_SCORE_3: Object.freeze({
    name: 'research_plan_score3',
    label: '연구계획서 구성 및 기술방법의 적절성',
    type: INPUT_TYPE.NUMBER,
    helperText: '0점에서 20점으로 입력해주세요.',
    rule: {
      min: {
        value: 0,
        message: '0 이상의 값을 입력해주세요',
      },
      max: {
        value: 20,
        message: '20 이하의 값을 입력해주세요',
      },
    },
  }),
  RESEARCH_PLAN_SCORE_4: Object.freeze({
    name: 'research_plan_score4',
    label: '연구계획서의 수집된 자료에 대한 신뢰성',
    type: INPUT_TYPE.NUMBER,
    helperText: '0점에서 20점으로 입력해주세요.',
    rule: {
      min: {
        value: 0,
        message: '0 이상의 값을 입력해주세요',
      },
      max: {
        value: 20,
        message: '20 이하의 값을 입력해주세요',
      },
    },
  }),
  RESEARCH_PLAN_SCORE_5: Object.freeze({
    name: 'research_plan_score5',
    label: '제출 서류 및 기한 준수에 대한 성실성',
    type: INPUT_TYPE.NUMBER,
    helperText: '0점에서 20점으로 입력해주세요.',
    rule: {
      min: {
        value: 0,
        message: '0 이상의 값을 입력해주세요',
      },
      max: {
        value: 20,
        message: '20 이하의 값을 입력해주세요',
      },
    },
  }),
  RESEARCH_PLAN_COMMENT: Object.freeze({
    name: 'research_plan_comment',
    label: '심의의견',
    type: INPUT_TYPE.MULTILINE,
    helperText:
      '위 평가항목에 대한 지적사항이나 보완할 사항, 기타 심의의견 등을 기재해 주십시오.',
  }),
  // Ad email
  AD_EMAIL_INFO: Object.freeze({
    name: 'othor_comment',
    label: '기타 정보',
    type: INPUT_TYPE.MULTILINE,
    helperText: '기타 정보를 입력해주세요.',
    placeholder: '만약 없다면 공백하나만 입력해주세요.',
  }),
});

export type RegisterTypes =
  (typeof INPUT)[keyof typeof INPUT]['name'];
export type RegisterField = Record<RegisterTypes, any>;
export type RegisterForm = UseFormRegister<RegisterField>;
