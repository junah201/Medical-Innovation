import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

import { Table } from '@/components';
import { ROUTE } from '@/constants';
import { TABLE_CONFIG } from '@/constants/tableConfig';

export const AdminMouAll = () => {
  return (
    <>
      <h1>MOU 목록</h1>
      <NavWarpper>
        <Link to={ROUTE.ADMIN.MOU.UPLOAD}>MOU 업로드</Link>
      </NavWarpper>
      <Table {...TABLE_CONFIG.MOU} />
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
