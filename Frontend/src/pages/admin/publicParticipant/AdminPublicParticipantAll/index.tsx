import { Box, Grid, Typography } from '@mui/material';
import {
  CellContext,
  ColumnDef,
} from '@tanstack/react-table';
import { useState, useMemo } from 'react';

import { getPublicParticipantsByEventId } from '@/api';
import { NavLinkButton } from '@/components/buttons';
import { BasicInput } from '@/components/CustomInput';
import MuiTable from '@/components/MuiTable';
import { INPUT_TYPE } from '@/constants/forms';
import { QUERY } from '@/constants/query';
import { PublicParticipant } from '@/types';

import EditButton from './EditButton';

export const AdminPublicParticipantAll = () => {
  const [value, setValue] = useState<number>(3);

  const columns = useMemo<
    ColumnDef<PublicParticipant, any>[]
  >(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        cell: (
          info: CellContext<PublicParticipant, number>
        ) => {
          return (
            <Typography align="left" color="secondary">
              {info.getValue()}
            </Typography>
          );
        },
      },
      {
        id: 'name',
        accessorFn: (row) => row.application?.name || '?',
        header: '이름',
        cell: (
          info: CellContext<PublicParticipant, string>
        ) => {
          return <Typography>{info.getValue()}</Typography>;
        },
      },
      {
        id: 'gender',
        accessorFn: (row) => row.application?.gender || '?',
        header: '성별',
        cell: (
          info: CellContext<PublicParticipant, string>
        ) => {
          return <Typography>{info.getValue()}</Typography>;
        },
      },
      {
        id: 'birth',
        accessorFn: (row) => row.application?.birth || '?',
        header: '생년월일',
        cell: (
          info: CellContext<PublicParticipant, string>
        ) => {
          return <Typography>{info.getValue()}</Typography>;
        },
      },
      {
        id: 'phone',
        accessorFn: (row) => row.application?.phone || '?',
        header: '전화번호',
        cell: (
          info: CellContext<PublicParticipant, string>
        ) => {
          return <Typography>{info.getValue()}</Typography>;
        },
      },
      {
        id: 'email',
        accessorFn: (row) => row.application?.email || '?',
        header: '이메일',
        cell: (
          info: CellContext<PublicParticipant, string>
        ) => {
          return <Typography>{info.getValue()}</Typography>;
        },
      },
      {
        id: 'organization_name',
        accessorFn: (row) =>
          row.application?.organization_name || '?',
        header: '소속기관',
        cell: (
          info: CellContext<PublicParticipant, string>
        ) => {
          return <Typography>{info.getValue()}</Typography>;
        },
      },
      {
        id: 'job_position',
        accessorFn: (row) =>
          row.application?.job_position || '?',
        header: '직책',
        cell: (
          info: CellContext<PublicParticipant, string>
        ) => {
          return <Typography>{info.getValue()}</Typography>;
        },
      },
      {
        id: 'edit',
        accessorFn: (row) => row,
        header: '수정',
        cell: (
          info: CellContext<
            PublicParticipant,
            PublicParticipant
          >
        ) => {
          return <EditButton row={info.getValue()} />;
        },
      },
    ],
    []
  );

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <NavLinkButton
            to={`/api/v2/public_participant/${value}/all/excel`}
          >
            참여자 목록 엑셀 다운로드
          </NavLinkButton>
        </Grid>
        <Grid item xs={12}>
          <BasicInput
            name="name"
            label="행사 선택"
            type={INPUT_TYPE.PUBLIC_EVENT}
            value={value}
            onChange={setValue}
            helperText="행사를 선택해주세요."
          />
        </Grid>
        <Grid item xs={12}>
          <MuiTable
            size={15}
            queryKey={QUERY.KEY.ALL_PUBLIC_PARTICIPANT}
            queryDetail={{
              event_id: value,
            }}
            queryFn={(page, size) =>
              getPublicParticipantsByEventId(
                value,
                page,
                size
              )
            }
            columns={columns}
            title="공개 행사 참여자 목록"
            showTotal={true}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
