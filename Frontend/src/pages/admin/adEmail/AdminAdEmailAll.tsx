import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

import { Table } from '@/components';
import { ROUTE } from '@/constants';
import { TABLE_CONFIG } from '@/constants/tableConfig';

export const AdminAdEmailAll = () => {
  return (
    <>
      <h1>광고 수신 이메일 목록</h1>
      <NavWarpper>
        <Link to={ROUTE.ADMIN.AD_EMAIL.UPLOAD}>이메일 추가</Link>
      </NavWarpper>
      <Table {...TABLE_CONFIG.AD_EMAIL} />
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
