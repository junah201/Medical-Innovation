import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { ROUTE } from '@/constants';

export const AdminHeader = () => {
  return (
    <Wrapper>
      <div>
        <Link to="/">
          <img src="/images/tight_logo.png" alt="logo" />
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to={ROUTE.ADMIN.USER.ALL}>회원 목록</Link>
          </li>
          <li>
            <Link to={ROUTE.ADMIN.POST.ALL}>게시물</Link>
          </li>
          <li>
            <Link to={ROUTE.ADMIN.BANNER.ALL}>배너</Link>
          </li>
          <li>
            <Link to={ROUTE.ADMIN.SPONSORING_COMPANY.ALL}>
              후원 기업
            </Link>
          </li>
          <li>
            <Link to="/admin/mou/all">Mou 목록</Link>
          </li>
          <li>
            <Link to="/admin/advisor/all">자문단</Link>
          </li>
          <li>
            <Link to="/admin/public_event/all">
              행사 목록
            </Link>
          </li>
          <li>
            <Link to="/admin/public_participant/all">
              행사 참여자
            </Link>
          </li>
          <li>
            <Link to="/admin/judging_event/all">
              심사 행사
            </Link>
          </li>
          <li>
            <Link to="/admin/judging_participant/all">
              심사 행사 참여자
            </Link>
          </li>
          <li>
            <Link to="/admin/judging_result/all">
              1차 심사 결과
            </Link>
          </li>
          <li>
            <Link to="/admin/judging_2nd_result/all">
              2차 심사 결과
            </Link>
          </li>
          <li>
            <Link to="/admin/ad_email/all">
              광고 수신 이메일
            </Link>
          </li>
          <li>
            <Link to="/admin/history/all">연혁</Link>
          </li>
          <li>
            <Link to="/admin/supporting_startup/all">
              스타트업 지원
            </Link>
          </li>
          <li>
            <Link to="/admin/popup/all">페이지 팝업</Link>
          </li>
        </ul>
      </nav>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  display: flex;
  flex-direction: column;
  background-color: #2763ba;
  position: fixed;
  min-width: 250px;
  min-height: 100vh;
  height: 100%;
  text-align: left;

  & li {
    border-bottom: 1px solid #ffffff;
    padding: 8px 10px;
  }

  & div {
    background-color: #ffffff;
    padding: 5px;
  }

  & a {
    color: #ffffff;
    font-size: 16px;
  }

  & a:hover {
    color: #ffffff;
    text-decoration: underline;
  }

  & a:active,
  a:focus,
  a:visited {
    color: #ffffff;
  }
`;
