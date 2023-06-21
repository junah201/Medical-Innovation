import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

import { Message, Table } from '@/components';
import { ROUTE } from '@/constants';
import { TABLE_CONFIG } from '@/constants/tableConfig';

export const AdminSponsoringCompanyAll = () => {
  return (
    <>
      <h1>후원 기업 목록</h1>
      <Message>
        <Link to={ROUTE.SUPPORT.SPONSORS}>후원자 소개 페이지</Link>에
        표시되는 후원기업 목록입니다.
      </Message>
      <NavWarpper>
        <Link to={ROUTE.ADMIN.SPONSORING_COMPANY.UPLOAD}>
          후원 기업 생성
        </Link>
      </NavWarpper>
      <Table {...TABLE_CONFIG.SPONSORING_COMPANY} />
    </>
  );
};

const NavWarpper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  & a {
    padding: 12px;
    font-size: 16px;
    color: ${(props) => props.theme.pointColor};
    font-weight: 600;
    border: 3px solid ${(props) => props.theme.pointColor};
  }
`;
