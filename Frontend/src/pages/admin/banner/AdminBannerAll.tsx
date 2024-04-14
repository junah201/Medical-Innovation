import { Box, Typography } from '@mui/material';
import {
  CellContext,
  ColumnDef,
} from '@tanstack/react-table';
import { useMemo } from 'react';

import { getBanners } from '@/api';
import { NavLinkButton } from '@/components/buttons';
import { FileLink } from '@/components/FileLink';
import MuiTable from '@/components/MuiTable';
import { QUERY, ROUTE } from '@/constants';
import { Banner } from '@/types';

import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

export const AdminBannerAll = () => {
  const columns = useMemo<
    ColumnDef<Banner, any>[]
  >(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        cell: (
          info: CellContext<Banner, string>
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
        accessorKey: 'name',
        header: '회사명',
        cell: (
          info: CellContext<Banner, string>
        ) => {
          return (
            <Typography>
              {info.getValue()}
            </Typography>
          );
        },
      },
      {
        accessorKey: 'filename',
        header: '파일명',
        cell: (
          info: CellContext<Banner, string>
        ) => {
          return (
            <FileLink
              filename={info.getValue()}
            />
          );
        },
      },
      {
        accessorKey: 'link',
        header: '링크',
        cell: (
          info: CellContext<Banner, string>
        ) => {
          return (
            <Typography>
              {info.getValue()}
            </Typography>
          );
        },
      },
      {
        accessorKey: 'banner_end_at',
        header: '배너 종료일',
        cell: (
          info: CellContext<Banner, string>
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
        cell: (
          info: CellContext<Banner, Banner>
        ) => {
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
          info: CellContext<Banner, number>
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
      <NavLinkButton
        to={ROUTE.ADMIN.BANNER.UPLOAD}
      >
        배너 업로드
      </NavLinkButton>
      <MuiTable
        size={20}
        queryKey={QUERY.KEY.ALL_BANNER}
        queryDetail={{}}
        queryFn={(page, size) =>
          getBanners(page, size)
        }
        columns={columns}
        title="배너 목록"
        showTotal={true}
      />
    </Box>
  );
};
