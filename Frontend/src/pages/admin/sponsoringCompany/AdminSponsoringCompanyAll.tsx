import { Box, Typography } from '@mui/material';
import {
  CellContext,
  ColumnDef,
} from '@tanstack/react-table';
import { useMemo } from 'react';

import { getSponsoringCompanies } from '@/api';
import { NavLinkButton } from '@/components/buttons';
import { FileLink } from '@/components/FileLink';
import MuiTable from '@/components/MuiTable';
import { QUERY, ROUTE } from '@/constants';
import { SponsoringCompany } from '@/types';

import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

export const AdminSponsoringCompanyAll = () => {
  const columns = useMemo<
    ColumnDef<SponsoringCompany, any>[]
  >(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        cell: (
          info: CellContext<SponsoringCompany, string>
        ) => {
          return (
            <Typography align="left" color="secondary">
              {info.getValue()}
            </Typography>
          );
        },
      },
      {
        accessorKey: 'name',
        header: '기업명',
        cell: (
          info: CellContext<SponsoringCompany, string>
        ) => {
          return <Typography>{info.getValue()}</Typography>;
        },
      },
      {
        accessorKey: 'link',
        header: '링크',
        cell: (
          info: CellContext<SponsoringCompany, string>
        ) => {
          return <Typography>{info.getValue()}</Typography>;
        },
      },
      {
        accessorKey: 'filename',
        header: '파일명',
        cell: (
          info: CellContext<SponsoringCompany, string>
        ) => {
          return <FileLink filename={info.getValue()} />;
        },
      },
      {
        id: 'edit',
        accessorFn: (row) => row,
        header: '수정',
        cell: (
          info: CellContext<
            SponsoringCompany,
            SponsoringCompany
          >
        ) => {
          return <EditButton row={info.getValue()} />;
        },
      },
      {
        id: 'delete',
        accessorKey: 'id',
        header: '삭제',
        cell: (
          info: CellContext<SponsoringCompany, number>
        ) => {
          return <DeleteButton id={info.getValue()} />;
        },
      },
    ],
    []
  );

  return (
    <Box>
      <NavLinkButton
        to={ROUTE.ADMIN.SPONSORING_COMPANY.UPLOAD}
      >
        후원 기업 생성
      </NavLinkButton>
      <MuiTable
        size={20}
        queryKey={QUERY.KEY.ALL_SPONSORING_COMPANY}
        queryDetail={{}}
        queryFn={(page, size) =>
          getSponsoringCompanies(page, size)
        }
        columns={columns}
        title="게시물 목록"
        showTotal={true}
      />
    </Box>
  );
};
