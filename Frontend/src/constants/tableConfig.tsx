import { Link } from 'react-router-dom';

import {
  getAdvisors,
  getBanners,
  getJudgingParticipants,
  getMous,
  getPosts,
  getPublicEvents,
  getSponsoringCompanies,
  getSponsors,
  getUsers,
  getPrivateEvents,
  getPublicParticipantsByEventId,
  getPrivateParticipantsByEventId,
  getJudgingEvents,
  getJudgingParticipantsByEventId,
  getJudgingResultsByEventId,
} from '@/api';
import { StatusButton } from '@/components';
import {
  AlertDeletBanner,
  AlertDeleteAdvisor,
  AlertDeleteMou,
  AlertDeletePost,
  AlertDeleteSponsoringCompany,
} from '@/libs/Alert';
import {
  Advisor,
  Banner,
  JudgingParticipant,
  Mou,
  Post,
  PrivateEvent,
  PublicEvent,
  PublicParticipant,
  Sponsor,
  User,
  SponsoringCompany,
  JudgingEvent,
  JudgingResult,
} from '@/types';

const { VITE_CDN_URL } = import.meta.env;

const JUDGING_PARTICIPANT = Object.freeze({
  headers: [
    '이름',
    '이메일',
    '소속',
    '직위',
    '1차 심사 여부',
    '1차 심사',
    '2차 심사 여부',
    '2차 심사',
  ],
  size: 40,
  getDatas: async (
    page: number,
    size: number,
    eventId: number | string
  ) => {
    return getJudgingParticipantsByEventId(eventId, page, size);
  },
  itemToElement: (item: JudgingParticipant, id: number) => {
    return (
      <tr>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.organization_name}</td>
        <td>{item.job_position}</td>
        <td>
          {item.first_judging_result ? (
            <StatusButton color="green">
              심사 완료 ({item.first_judging_result?.total_score}
              점)
            </StatusButton>
          ) : (
            <StatusButton color="gray">미심사</StatusButton>
          )}
        </td>
        <td>
          <Link to={`/judging/result/${id}/${item.id}/1/create`}>
            심사하기
          </Link>
        </td>
        <td>
          {item.second_judging_result ? (
            <StatusButton color="green">
              심사 완료 ({item.second_judging_result?.total_score}
              점)
            </StatusButton>
          ) : (
            <StatusButton color="gray">미심사</StatusButton>
          )}
        </td>
        <td>
          <Link to={`/judging/result/${id}/${item.id}/2/create`}>
            심사하기
          </Link>
        </td>
      </tr>
    );
  },
});

const USER = Object.freeze({
  headers: [
    '고유ID',
    '이름',
    '전화번호',
    '이메일',
    '생일',
    '이메일 허용',
    '계정 생성일',
    '심사 권한 수정',
  ],
  size: 40,
  getDatas: async (
    eventId: number | string,
    page: number,
    size: number
  ) => {
    return getUsers(page, size);
  },
  itemToElement: (item: User, id: number) => {
    return (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.phone}</td>
        <td>{item.email}</td>
        <td>{item.birth}</td>
        <td>{`${item.email_enable}`}</td>
        <td>{item.created_at.replace('T', ' ')}</td>
        <td>
          <Link to={`/admin/user/permission/edit/${item.id}`}>
            심사 권한 수정
          </Link>
        </td>
      </tr>
    );
  },
});

const POST = Object.freeze({
  headers: [
    '번호',
    '게시판',
    '제목',
    '작성자',
    '생성일',
    '수정일',
    '수정',
    '삭제',
  ],
  size: 40,
  getDatas: async (
    id: number | string,
    page: number,
    size: number
  ) => {
    return getPosts(page, size);
  },
  itemToElement: (item: Post, id: number) => {
    return (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.board?.name}</td>
        <td>{item.title}</td>
        <td>{item.author_name}</td>
        <td>{item.created_at.replace('T', ' ')}</td>
        <td>{item.updated_at.replace('T', ' ')}</td>
        <td>
          <Link to={`/admin/post/edit/${item.id}`}>수정</Link>
        </td>
        <td>
          <button
            onClick={() => {
              AlertDeletePost(item.id);
            }}
          >
            삭제
          </button>
        </td>
      </tr>
    );
  },
});

const BANNER = Object.freeze({
  headers: [
    '번호',
    '회사명',
    '파일명',
    '링크',
    '배너 종료 시점',
    '배너 생성 시점',
    '배너 수정 시점',
    '수정',
    '삭제',
  ],
  size: 40,
  getDatas: async (
    id: number | string,
    page: number,
    size: number
  ) => {
    return getBanners(page, size);
  },
  itemToElement: (item: Banner, id: number) => {
    return (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>
          <a
            href={`${VITE_CDN_URL}/upload/${item.filename}`}
            alt={item.filename}
          >
            {item.filename}
          </a>
        </td>
        <td>{item.link}</td>
        <td>{item.banner_end_at.replace('T', ' ')}</td>
        <td>{item.created_at.replace('T', ' ')}</td>
        <td>{item.updated_at.replace('T', ' ')}</td>
        <td>
          <Link to={`/admin/banner/edit/${item.id}`}>수정</Link>
        </td>
        <td>
          <button
            onClick={() => {
              AlertDeletBanner(item.id);
            }}
          >
            삭제
          </button>
        </td>
      </tr>
    );
  },
});

const SPONSORING_COMPANY = Object.freeze({
  headers: [
    '번호',
    '기업명',
    '링크',
    '파일명',
    '연도',
    '수정',
    '삭제',
  ],
  size: 40,
  getDatas: async (
    id: number | string,
    page: number,
    size: number
  ) => {
    return getSponsoringCompanies(page, size);
  },
  itemToElement: (item: SponsoringCompany, id: number) => {
    return (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.link}</td>
        <td>
          <a
            href={`${VITE_CDN_URL}/upload/${item.filename}`}
            alt={item.filename}
          >
            {item.filename}
          </a>
        </td>
        <td>{item.year}</td>
        <td>
          <Link to={`/admin/sponsoring_company/edit/${item.id}`}>
            수정
          </Link>
        </td>
        <td>
          <button
            onClick={() => {
              AlertDeleteSponsoringCompany(item.id);
            }}
          >
            삭제
          </button>
        </td>
      </tr>
    );
  },
});
const SPONSOR = Object.freeze({
  headers: [
    '고유 ID',
    '유저 고유 ID',
    '성명 (단체명)',
    '전화번호',
    '주민등록번호 (사업자등록번호)',
    '주소',
    '희망 사용처',
    '기부 내용',
  ],
  size: 40,
  getDatas: async (
    id: number | string,
    page: number,
    size: number
  ) => {
    return getSponsors(page, size);
  },
  itemToElement: (item: Sponsor, id: number) => {
    return (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.user.id}</td>
        <td>{item.name}</td>
        <td>{item.phone}</td>
        <td>{item.identification_number}</td>
        <td>{item.address}</td>
        <td>{item.usage}</td>
        <td>{item.detail}</td>
      </tr>
    );
  },
});

const MOU = Object.freeze({
  headers: [
    '번호',
    '이름',
    '링크',
    '파일',
    '생성 시간',
    '수정 시간',
    '수정',
    '삭제',
  ],
  size: 40,
  getDatas: async (
    id: number | string,
    page: number,
    size: number
  ) => {
    return getMous(page, size);
  },
  itemToElement: (item: Mou, id: number) => {
    return (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.link}</td>
        <td>
          <a
            href={`${VITE_CDN_URL}/upload/${item.filename}`}
            alt={item.filename}
          >
            {item.filename}
          </a>
        </td>
        <td>{item.created_at.replace('T', ' ')}</td>
        <td>{item.updated_at.replace('T', ' ')}</td>
        <td>
          <Link to={`/admin/mou/edit/${item.id}`}>수정</Link>
        </td>
        <td>
          <button
            onClick={() => {
              AlertDeleteMou(item.id);
            }}
          >
            삭제
          </button>
        </td>
      </tr>
    );
  },
});

const ADVISOR = Object.freeze({
  headers: [
    '번호',
    '이름',
    '자문단 종류',
    '이미지',
    '생성일',
    '수정일',
    '수정',
    '삭제',
  ],
  size: 40,
  getDatas: async (
    id: number | string,
    page: number,
    size: number
  ) => {
    return getAdvisors(page, size);
  },
  itemToElement: (item: Advisor, id: number) => {
    return (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.type}</td>
        <td>
          <a href={`${VITE_CDN_URL}/upload/${item.filename}`}>
            {item.filename}
          </a>
        </td>
        <td>{item.created_at.replace('T', ' ')}</td>
        <td>{item.updated_at.replace('T', ' ')}</td>
        <td>
          <Link to={`/admin/advisor/edit/${item.id}`}>수정</Link>
        </td>
        <td>
          <button
            onClick={() => {
              AlertDeleteAdvisor(item.id);
            }}
          >
            삭제
          </button>
        </td>
      </tr>
    );
  },
});

const PUBLIC_EVENT = Object.freeze({
  headers: [
    '번호',
    '이름',
    '이미지',
    '참가 신청 시작일',
    '참가 신청 마감일',
    '행사 시작일',
    '행사 종료일',
    '수정',
  ],
  size: 40,
  getDatas: async (
    id: number | string,
    page: number,
    size: number
  ) => {
    return getPublicEvents(page, size);
  },
  itemToElement: (item: PublicEvent, id: number) => {
    return (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>
          <a
            href={`${VITE_CDN_URL}/upload/${
              item.thumbnail_filename || 'null.png'
            }`}
          >
            {item.thumbnail_filename || 'null.png'}
          </a>
        </td>
        <td>{item.join_start_date}</td>
        <td>{item.join_end_date}</td>
        <td>{item.start_date}</td>
        <td>{item.end_date}</td>
        <td>
          <Link to={`/admin/public_event/edit/${item.id}`}>수정</Link>
        </td>
      </tr>
    );
  },
});

const PUBLIC_EVENT_PARTICIPANT = Object.freeze({
  headers: [
    '번호',
    '이름',
    '성별',
    '생년월일',
    '전화번호',
    '이메일',
    '소속기관',
    '직책',
    '수정',
  ],
  size: 40,
  getDatas: async (
    id: number | string,
    page: number,
    size: number
  ) => {
    return getPublicParticipantsByEventId(id, page, size);
  },
  itemToElement: (item: PublicParticipant, id: number) => {
    return (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.gender}</td>
        <td>{item.birth}</td>
        <td>{item.phone}</td>
        <td>{item.email}</td>
        <td>{item.organization_name}</td>
        <td>{item.job_position}</td>
        <td>
          <Link to={`/admin/public_participant/edit/${item.id}`}>
            수정
          </Link>
        </td>
      </tr>
    );
  },
});

const PRIVATE_EVENT = Object.freeze({
  headers: [
    '번호',
    '이름',
    '이미지',
    '참가 신청 시작일',
    '참가 신청 마감일',
    '수정',
  ],
  size: 40,
  getDatas: async (
    id: number | string,
    page: number,
    size: number
  ) => {
    return getPrivateEvents(page, size);
  },
  itemToElement: (item: PrivateEvent, id: number) => {
    return (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>
          <a
            href={`${VITE_CDN_URL}/upload/${
              item.thumbnail_filename || 'null.png'
            }`}
          >
            {item.thumbnail_filename || 'null.png'}
          </a>
        </td>
        <td>{item.join_start_date}</td>
        <td>{item.join_end_date}</td>
        <td>
          <Link to={`/admin/private_event/edit/${item.id}`}>
            수정
          </Link>
        </td>
      </tr>
    );
  },
});

const PRIVATE_EVENT_PARTICIPANT = Object.freeze({
  headers: [
    '번호',
    '이름',
    '성별',
    '생년월일',
    '전화번호',
    '이메일',
    '소속기관',
    '직책',
    '수정',
  ],
  size: 40,
  getDatas: async (
    id: number | string,
    page: number,
    size: number
  ) => {
    return getPrivateParticipantsByEventId(id, page, size);
  },
  itemToElement: (item: PublicParticipant, id: number) => {
    return (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.gender}</td>
        <td>{item.birth}</td>
        <td>{item.phone}</td>
        <td>{item.email}</td>
        <td>{item.organization_name}</td>
        <td>{item.job_position}</td>
        <td>
          <Link to={`/admin/private_participant/edit/${item.id}`}>
            수정
          </Link>
        </td>
      </tr>
    );
  },
});

const JUDGING_EVENT = Object.freeze({
  headers: [
    '번호',
    '이름',
    '이미지',
    '참가 신청 시작일',
    '참가 신청 마감일',
    '1차 심사 시작일',
    '1차 심사 종료일',
    '2차 심사 시작일',
    '2차 심사 종료일',
    '수정',
  ],
  size: 40,
  getDatas: async (
    id: number | string,
    page: number,
    size: number
  ) => {
    return getJudgingEvents(page, size);
  },
  itemToElement: (item: JudgingEvent, id: number) => {
    return (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>
          <a
            href={`${VITE_CDN_URL}/upload/${
              item.thumbnail_filename || 'null.png'
            }`}
          >
            {item.thumbnail_filename || 'null.png'}
          </a>
        </td>
        <td>{item.join_start_date}</td>
        <td>{item.join_end_date}</td>
        <td>{item.judging_1st_start_date}</td>
        <td>{item.judging_1st_end_date}</td>
        <td>{item.judging_2nd_start_date}</td>
        <td>{item.judging_2nd_end_date}</td>
        <td>
          <Link to={`/admin/judging_event/edit/${item.id}`}>
            수정
          </Link>
        </td>
      </tr>
    );
  },
});

const JUDGING_EVENT_PARTICIPANT = Object.freeze({
  headers: [
    '번호',
    '이름',
    '성별',
    '생년월일',
    '전화번호',
    '이메일',
    '소속기관',
    '직책',
    '상세정보',
  ],
  size: 40,
  getDatas: async (
    id: number | string,
    page: number,
    size: number
  ) => {
    return getJudgingParticipantsByEventId(id, page, size);
  },
  itemToElement: (item: JudgingParticipant, id: number) => {
    return (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.gender}</td>
        <td>{item.birth}</td>
        <td>{item.phone}</td>
        <td>{item.email}</td>
        <td>{item.organization_name}</td>
        <td>{item.job_position}</td>
        <td>
          <Link to={`/admin/judging_participant/detail/${item.id}`}>
            상세정보
          </Link>
        </td>
      </tr>
    );
  },
});

const JUDGING_RESULT = Object.freeze({
  headers: [
    '번호',
    '심사자 이름',
    '심사자 대상자 이름',
    'N차',
    '점수',
    '생성일',
    '수정일',
    '상세정보',
  ],
  size: 40,
  getDatas: async (
    id: number | string,
    page: number,
    size: number
  ) => {
    return getJudgingResultsByEventId(id, page, size);
  },
  itemToElement: (item: JudgingResult, id: number) => {
    return (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item?.user?.name}</td>
        <td>{item?.participant_name}</td>
        <td>{item.nth}차</td>
        <td>{item.total_score}</td>
        <td>{item.created_at.replace('T', ' ')}</td>
        <td>{item.updated_at.replace('T', ' ')}</td>
        <td>
          <Link to={`/admin/judging_result/detail/${item.id}`}>
            상세정보
          </Link>
        </td>
      </tr>
    );
  },
});

export const TABLE_CONFIG = Object.freeze({
  JUDGING_PARTICIPANT,
  USER,
  POST,
  BANNER,
  SPONSORING_COMPANY,
  SPONSOR,
  MOU,
  ADVISOR,
  PUBLIC_EVENT,
  PUBLIC_EVENT_PARTICIPANT,
  PRIVATE_EVENT,
  PRIVATE_EVENT_PARTICIPANT,
  JUDGING_EVENT,
  JUDGING_EVENT_PARTICIPANT,
  JUDGING_RESULT,
});
