import { Box, Typography } from '@mui/material';
import {
  CellContext,
  ColumnDef,
} from '@tanstack/react-table';
import { useMemo } from 'react';

import { getAdEmails } from '@/api';
import { NavLinkButton } from '@/components/buttons';
import MuiTable from '@/components/MuiTable';
import { QUERY, ROUTE } from '@/constants';
import { AdEmail } from '@/types';

import DeleteButton from './DeleteButton';
import DetailButton from './DetailButton';

export const AdminAdEmailAll = () => {
  const columns = useMemo<ColumnDef<AdEmail, any>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        cell: (info: CellContext<AdEmail, string>) => {
          return (
            <Typography align="left" color="secondary">
              {info.getValue()}
            </Typography>
          );
        },
      },
      {
        accessorKey: 'email',
        header: '이메일',
        cell: (info: CellContext<AdEmail, string>) => {
          return <Typography>{info.getValue()}</Typography>;
        },
      },
      {
        accessorKey: 'etc_info',
        header: '기타정보',
        cell: (info: CellContext<AdEmail, string>) => {
          return <Typography>{info.getValue()}</Typography>;
        },
      },
      {
        id: 'detail',
        accessorFn: (row) => row,
        header: '상세정보',
        cell: (info: CellContext<AdEmail, AdEmail>) => {
          return <DetailButton row={info.getValue()} />;
        },
      },
      {
        id: 'delete',
        accessorKey: 'id',
        header: '삭제',
        cell: (info: CellContext<AdEmail, AdEmail>) => {
          return <DeleteButton id={info.getValue()} />;
        },
      },
    ],
    []
  );

  return (
    <Box>
      <NavLinkButton to={ROUTE.ADMIN.AD_EMAIL.UPLOAD}>
        추가하기
      </NavLinkButton>
      <NavLinkButton to={ROUTE.ADMIN.AD_EMAIL.SEND_ALL}>
        이메일 전체 발송
      </NavLinkButton>
      <MuiTable
        size={20}
        queryKey={QUERY.KEY.ALL_AD_EMALL}
        queryDetail={{}}
        queryFn={(page, size) => getAdEmails(page, size)}
        columns={columns}
        title="광고 수신 이메일 목록"
        showTotal={true}
      />
    </Box>
  );
};
