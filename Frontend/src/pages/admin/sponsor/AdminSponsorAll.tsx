import { Table } from '@/components';
import { TABLE_CONFIG } from '@/constants/tableConfig';

export const AdminSponsorAll = () => {
  return (
    <>
      <h1>후원 목록</h1>
      <Table {...TABLE_CONFIG.SPONSOR} />
    </>
  );
};
