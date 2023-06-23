import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

import { Table } from '@/components';
import { ROUTE } from '@/constants';
import { TABLE_CONFIG } from '@/constants/tableConfig';

export const AdminJudgingEventAll = () => {
  return (
    <>
      <h1>심사 행사 목록</h1>
      <NavWarpper>
        <Link to={ROUTE.ADMIN.JUDGING_EVENT.UPLOAD}>
          심사 행사 생성
        </Link>
      </NavWarpper>
      <Table {...TABLE_CONFIG.JUDGING_EVENT} />
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
