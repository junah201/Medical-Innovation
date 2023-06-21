import { Link } from 'react-router-dom';

import {
  getActiveBanners,
  getBanners,
  getJudgingParticipants,
  getPosts,
  getSponsoringCompanies,
  getUsers,
} from '@/api';
import { StatusButton } from '@/components';
import {
  AlertDeletBanner,
  AlertDeletePost,
  AlertDeleteSponsoringCompany,
} from '@/libs/Alert';
import { Banner, JudgingParticipant, Post, User } from '@/types';
import { SponsoringCompany } from '@/types/sponsoringCompany';

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
    return getJudgingParticipants(eventId, page, size);
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
            href={`${VITE_CDN_URL}/banner/${item.filename}`}
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
            href={`${VITE_CDN_URL}/banner/${item.filename}`}
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

export const TABLE_CONFIG = Object.freeze({
  JUDGING_PARTICIPANT,
  USER,
  POST,
  BANNER,
  SPONSORING_COMPANY,
});
