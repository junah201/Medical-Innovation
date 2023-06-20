import { Table } from '@/components';
import { TABLE_CONFIG } from '@/constants/tableConfig';

export const AdminPostAll = () => {
  return (
    <>
      <h1>게시물 목록</h1>
      <Table {...TABLE_CONFIG.POSTS} />
    </>
  );
};
