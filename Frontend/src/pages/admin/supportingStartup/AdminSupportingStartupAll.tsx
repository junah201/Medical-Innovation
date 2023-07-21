import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { Message, Table } from '@/components';
import { ROUTE } from '@/constants';
import { TABLE_CONFIG } from '@/constants/tableConfig';

export const AdminSupportingStartupAll = () => {
  return (
    <>
      <h1>스타트업 지원</h1>
      <Message>메인 페이지에 보여지는 스타트업 목록입니다.</Message>
      <NavWarpper>
        <Link to={ROUTE.ADMIN.SUPPORTING_STARTUP.UPLOAD}>
          스타트업 생성
        </Link>
      </NavWarpper>
      <Table {...TABLE_CONFIG.SUPPORTING_STARTUP} />
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
