import { Box, Typography } from '@mui/material';
import {
  CellContext,
  ColumnDef,
} from '@tanstack/react-table';
import { useMemo } from 'react';

import { getPublicEvents } from '@/api';
import { NavLinkButton } from '@/components/buttons';
import { FileLink } from '@/components/FileLink';
import MuiTable from '@/components/MuiTable';
import { QUERY, ROUTE } from '@/constants';
import { PublicEvent } from '@/types';

import EditButton from './EditButton';

export const AdminPublicEventAll = () => {
  const columns = useMemo<ColumnDef<PublicEvent, any>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        cell: (info: CellContext<PublicEvent, string>) => {
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
        cell: (info: CellContext<PublicEvent, string>) => {
          return <Typography>{info.getValue()}</Typography>;
        },
      },
      {
        accessorKey: 'thumbnail_filename',
        header: '이미지',
        cell: (info: CellContext<PublicEvent, string>) => {
          return <FileLink filename={info.getValue()} />;
        },
      },
      {
        accessorKey: 'join_start_date',
        header: '참가 신청 시작일',
        cell: (info: CellContext<PublicEvent, string>) => {
          return <Typography>{info.getValue()}</Typography>;
        },
      },
      {
        accessorKey: 'join_end_date',
        header: '참가 신청 종료일',
        cell: (info: CellContext<PublicEvent, string>) => {
          return <Typography>{info.getValue()}</Typography>;
        },
      },
      {
        id: 'edit',
        accessorFn: (row) => row,
        header: '수정',
        cell: (
          info: CellContext<PublicEvent, PublicEvent>
        ) => {
          return <EditButton row={info.getValue()} />;
        },
      },
    ],
    []
  );

  return (
    <Box>
      <NavLinkButton to={ROUTE.ADMIN.PUBLIC_EVENT.UPLOAD}>
        공개 행사 생성
      </NavLinkButton>
      <MuiTable
        size={4}
        queryKey={QUERY.KEY.ALL_PUBLIC_EVENT}
        queryDetail={{}}
        queryFn={(page, size) =>
          getPublicEvents(page, size)
        }
        columns={columns}
        title="공개 행사 목록"
        showTotal={true}
      />
    </Box>
  );
};
