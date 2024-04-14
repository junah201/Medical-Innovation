import { Box, Typography } from '@mui/material';
import {
  CellContext,
  ColumnDef,
} from '@tanstack/react-table';
import { useMemo } from 'react';

import { getMous } from '@/api';
import { NavLinkButton } from '@/components/buttons';
import { FileLink } from '@/components/FileLink';
import MuiTable from '@/components/MuiTable';
import { QUERY, ROUTE } from '@/constants';
import { Mou } from '@/types';

import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

export const AdminMouAll = () => {
  const columns = useMemo<ColumnDef<Mou, any>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        cell: (info: CellContext<Mou, string>) => {
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
        cell: (info: CellContext<Mou, string>) => {
          return <Typography>{info.getValue()}</Typography>;
        },
      },
      {
        accessorKey: 'link',
        header: '링크',
        cell: (info: CellContext<Mou, string>) => {
          return <Typography>{info.getValue()}</Typography>;
        },
      },
      {
        accessorKey: 'filename',
        header: '파일',
        cell: (info: CellContext<Mou, string>) => {
          return <FileLink filename={info.getValue()} />;
        },
      },
      {
        accessorKey: 'created_at',
        header: '생성일',
        cell: (info: CellContext<Mou, string>) => {
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
        cell: (info: CellContext<Mou, Mou>) => {
          return <EditButton row={info.getValue()} />;
        },
      },
      {
        id: 'delete',
        accessorKey: 'id',
        header: '삭제',
        cell: (info: CellContext<Mou, number>) => {
          return <DeleteButton id={info.getValue()} />;
        },
      },
    ],
    []
  );

  return (
    <Box>
      <NavLinkButton to={ROUTE.ADMIN.MOU.UPLOAD}>
        MOU 업로드
      </NavLinkButton>
      <MuiTable
        size={20}
        queryKey={QUERY.KEY.ALL_MOU}
        queryDetail={{}}
        queryFn={(page, size) => getMous(page, size)}
        columns={columns}
        title="MOU 목록"
        showTotal={true}
      />
    </Box>
  );
};
