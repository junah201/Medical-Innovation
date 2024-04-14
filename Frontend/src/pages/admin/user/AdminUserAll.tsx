import { Box, Typography } from '@mui/material';
import {
  CellContext,
  ColumnDef,
} from '@tanstack/react-table';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { getUsers } from '@/api';
import { APILinkButton } from '@/components';
import MuiTable from '@/components/MuiTable';
import { QUERY } from '@/constants';
import { User } from '@/types';

export const AdminUserAll = () => {
  const columns = useMemo<ColumnDef<User, any>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        cell: (info: CellContext<User, string>) => {
          return (
            <Typography align="left" color="secondary">
              {info.getValue()}
            </Typography>
          );
        },
      },
      {
        accessorKey: 'name',
        header: '이름',
        cell: (info: CellContext<User, string>) => {
          return <Typography>{info.getValue()}</Typography>;
        },
      },
      {
        id: 'phone',
        accessorKey: 'phone',
        header: '전화번호',
        cell: (info: CellContext<User, string>) => {
          return <Typography>{info.getValue()}</Typography>;
        },
      },
      {
        id: 'email',
        accessorKey: 'email',
        header: '이메일',
        cell: (info: CellContext<User, string>) => {
          return <Typography>{info.getValue()}</Typography>;
        },
      },
      {
        id: 'birth',
        accessorKey: 'birth',
        header: '생년월일',
        cell: (info: CellContext<User, string>) => {
          return <Typography>{info.getValue()}</Typography>;
        },
      },
      {
        id: 'email_enable',
        accessorKey: 'email_enable',
        header: '이메일 수신 동의 여부',
        cell: (info: CellContext<User, boolean>) => {
          return (
            <Typography>
              {info.getValue() ? '동의' : '비동의'}
            </Typography>
          );
        },
      },
      {
        id: 'created_at',
        accessorFn: (row) =>
          row.created_at.replace('T', ' '),
        header: '계정 생성일',
        cell: (info: CellContext<User, string>) => {
          return <Typography>{info.getValue()}</Typography>;
        },
      },
      {
        id: 'judging permission edit',
        accessorKey: 'id',
        header: '심사 권한 수정',
        cell: (info: CellContext<User, number>) => {
          return (
            <Link
              to={`/admin/user/permission/edit/${info.getValue()}`}
            >
              심사 권한 수정
            </Link>
          );
        },
      },
    ],
    []
  );

  return (
    <Box>
      <APILinkButton to="/api/v2/user/all/excel">
        엑셀 다운로드
      </APILinkButton>
      <MuiTable
        size={20}
        queryKey={QUERY.KEY.ALL_USER}
        queryDetail={{}}
        queryFn={(page, size) => getUsers(page, size)}
        columns={columns}
        title="유저 목록"
        showTotal={true}
      />
    </Box>
  );
};
