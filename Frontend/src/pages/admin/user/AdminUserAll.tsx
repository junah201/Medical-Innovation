import { Table } from '@/components';
import { TABLE_CONFIG } from '@/constants/tableConfig';

export const AdminUserAll = () => {
  return (
    <>
      <h1>회원 목록</h1>
      <Table {...TABLE_CONFIG.USERS} />
    </>
  );
};
