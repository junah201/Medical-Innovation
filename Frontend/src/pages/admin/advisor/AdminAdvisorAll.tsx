import { Box, Typography } from '@mui/material';
import {
  CellContext,
  ColumnDef,
} from '@tanstack/react-table';
import { useMemo } from 'react';

import { getAdvisors } from '@/api';
import { NavLinkButton } from '@/components/buttons';
import { FileLink } from '@/components/FileLink';
import MuiTable from '@/components/MuiTable';
import { QUERY, ROUTE } from '@/constants';
import { Advisor } from '@/types';

import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

export const AdminAdvisorAll = () => {
  const columns = useMemo<ColumnDef<Advisor, any>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        cell: (info: CellContext<Advisor, string>) => {
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
        cell: (info: CellContext<Advisor, string>) => {
          return <Typography>{info.getValue()}</Typography>;
        },
      },
      {
        accessorKey: 'type',
        header: '자문단 종류',
        cell: (info: CellContext<Advisor, string>) => {
          return <Typography>{info.getValue()}</Typography>;
        },
      },
      {
        accessorKey: 'filename',
        header: '이미지',
        cell: (info: CellContext<Advisor, string>) => {
          return <FileLink filename={info.getValue()} />;
        },
      },
      {
        accessorKey: 'created_at',
        header: '생성일',
        cell: (info: CellContext<Advisor, string>) => {
          return (
            <Typography>
              {info.getValue().replace('T', ' ')}
            </Typography>
          );
        },
      },
      {
        id: 'edit',
        accessorFn: (row) => row,
        header: '수정',
        cell: (info: CellContext<Advisor, Advisor>) => {
          return <EditButton row={info.getValue()} />;
        },
      },
      {
        id: 'delete',
        accessorKey: 'id',
        header: '삭제',
        cell: (info: CellContext<Advisor, number>) => {
          return <DeleteButton id={info.getValue()} />;
        },
      },
    ],
    []
  );

  return (
    <Box>
      <NavLinkButton to={ROUTE.ADMIN.ADVISOR.UPLOAD}>
        자문단 업로드
      </NavLinkButton>
      <MuiTable
        size={20}
        queryKey={QUERY.KEY.ALL_ADVISOR}
        queryDetail={{}}
        queryFn={(page, size) => getAdvisors(page, size)}
        columns={columns}
        title="자문단 목록"
        showTotal={true}
      />
    </Box>
  );
};
