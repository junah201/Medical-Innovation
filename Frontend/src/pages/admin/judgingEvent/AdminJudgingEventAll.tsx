import { Box, Typography } from '@mui/material';
import {
  CellContext,
  ColumnDef,
} from '@tanstack/react-table';
import { useMemo } from 'react';

import { getJudgingEvents } from '@/api';
import { NavLinkButton } from '@/components/buttons';
import { FileLink } from '@/components/FileLink';
import MuiTable from '@/components/MuiTable';
import { QUERY, ROUTE } from '@/constants';
import { JudgingEvent } from '@/types';

import EditButton from './EditButton';

export const AdminJudgingEventAll = () => {
  const columns = useMemo<ColumnDef<JudgingEvent, any>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        cell: (info: CellContext<JudgingEvent, string>) => {
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
        cell: (info: CellContext<JudgingEvent, string>) => {
          return <Typography>{info.getValue()}</Typography>;
        },
      },
      {
        accessorKey: 'thumbnail_filename',
        header: '이미지',
        cell: (info: CellContext<JudgingEvent, string>) => {
          return <FileLink filename={info.getValue()} />;
        },
      },
      {
        accessorKey: 'join_start_date',
        header: '참가 신청 시작일',
        cell: (info: CellContext<JudgingEvent, string>) => {
          return <Typography>{info.getValue()}</Typography>;
        },
      },
      {
        accessorKey: 'join_end_date',
        header: '참가 신청 종료일',
        cell: (info: CellContext<JudgingEvent, string>) => {
          return <Typography>{info.getValue()}</Typography>;
        },
      },
      {
        id: 'edit',
        accessorFn: (row) => row,
        header: '수정',
        cell: (
          info: CellContext<JudgingEvent, JudgingEvent>
        ) => {
          return <EditButton row={info.getValue()} />;
        },
      },
    ],
    []
  );

  return (
    <Box>
      <NavLinkButton to={ROUTE.ADMIN.JUDGING_EVENT.UPLOAD}>
        심사 행사 생성
      </NavLinkButton>
      <MuiTable
        size={4}
        queryKey={QUERY.KEY.ALL_JUDGING_EVENT}
        queryDetail={{}}
        queryFn={(page, size) =>
          getJudgingEvents(page, size)
        }
        columns={columns}
        title="심사 행사 목록"
        showTotal={true}
      />
    </Box>
  );
};
