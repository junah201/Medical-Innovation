import { Table } from '@/components';
import { TABLE_CONFIG } from '@/constants/tableConfig';

export const AdminMouAll = () => {
  return (
    <>
      <h1>MOU 목록</h1>
      <Table {...TABLE_CONFIG.MOU} />
    </>
  );
};
