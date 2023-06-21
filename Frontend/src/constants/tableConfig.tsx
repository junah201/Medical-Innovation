import { Link } from 'react-router-dom';

import { getJudgingParticipants, getPosts, getUsers } from '@/api';
import { StatusButton } from '@/components';
import { AlertDeletePost } from '@/libs/Alert';
import { JudgingParticipant, Post, User } from '@/types';

const JUDGING_PARTICIPANTS = Object.freeze({
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

const USERS = Object.freeze({
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

const POSTS = Object.freeze({
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

export const TABLE_CONFIG = Object.freeze({
  JUDGING_PARTICIPANTS,
  USERS,
  POSTS,
});
