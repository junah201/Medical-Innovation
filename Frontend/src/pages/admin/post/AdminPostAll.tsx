import { Box, Typography } from '@mui/material';
import {
  CellContext,
  ColumnDef,
} from '@tanstack/react-table';
import { useMemo } from 'react';

import { getPosts } from '@/api';
import { NavLinkButton } from '@/components/buttons';
import MuiTable from '@/components/MuiTable';
import { QUERY, ROUTE } from '@/constants';
import { Post } from '@/types';

import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

export const AdminPostAll = () => {
  const columns = useMemo<ColumnDef<Post, any>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        cell: (
          info: CellContext<Post, string>
        ) => {
          return (
            <Typography
              align="left"
              color="secondary"
            >
              {info.getValue()}
            </Typography>
          );
        },
      },
      {
        accessorFn: (row) => row.board.name,
        header: '게시판',
        cell: (
          info: CellContext<Post, string>
        ) => {
          return (
            <Typography>
              {info.getValue()}
            </Typography>
          );
        },
      },
      {
        id: 'title',
        accessorKey: 'title',
        header: '제목',
        cell: (
          info: CellContext<Post, string>
        ) => {
          return (
            <Typography>
              {info.getValue()}
            </Typography>
          );
        },
      },
      {
        id: 'author_name',
        accessorKey: 'author_name',
        header: '작성자',
        cell: (
          info: CellContext<Post, string>
        ) => {
          return (
            <Typography>
              {info.getValue()}
            </Typography>
          );
        },
      },
      {
        id: 'created_at',
        accessorFn: (row) =>
          row.created_at.replace('T', ' '),
        header: '작성일',
        cell: (
          info: CellContext<Post, string>
        ) => {
          return (
            <Typography>
              {info.getValue()}
            </Typography>
          );
        },
      },
      {
        id: 'edit',
        accessorFn: (row) => row,
        header: '수정',
        cell: (info: CellContext<Post, Post>) => {
          return (
            <EditButton row={info.getValue()} />
          );
        },
      },
      {
        id: 'delete',
        accessorKey: 'id',
        header: '삭제',
        cell: (
          info: CellContext<Post, number>
        ) => {
          return (
            <DeleteButton id={info.getValue()} />
          );
        },
      },
    ],
    []
  );

  return (
    <Box>
      <NavLinkButton to={ROUTE.ADMIN.POST.UPLOAD}>
        게시물 작성
      </NavLinkButton>
      <MuiTable
        size={15}
        queryKey={QUERY.KEY.ALL_POST}
        queryDetail={{}}
        queryFn={(page, size) =>
          getPosts(page, size)
        }
        columns={columns}
        title="게시물 목록"
        showTotal={true}
      />
    </Box>
  );
};
