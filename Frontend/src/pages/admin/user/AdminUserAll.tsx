import styled from 'styled-components';

import { Table } from '@/components';
import { TABLE_CONFIG } from '@/constants/tableConfig';

const { VITE_API_URL } = import.meta.env;

export const AdminUserAll = () => {
  return (
    <>
      <h1>회원 목록</h1>
      <NavWarpper>
        <a href={`${VITE_API_URL}/api/v2/user/all/excel`}>
          회원 목록 엑셀 다운로드
        </a>
      </NavWarpper>
      <Table {...TABLE_CONFIG.USER} />
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
