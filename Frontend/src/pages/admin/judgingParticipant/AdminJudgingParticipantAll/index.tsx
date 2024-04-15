import { Box, Grid, Typography } from '@mui/material';
import {
  CellContext,
  ColumnDef,
} from '@tanstack/react-table';
import { useState, useMemo } from 'react';

import { getJudgingParticipantsByEventId } from '@/api';
import { NavLinkButton } from '@/components/buttons';
import { BasicInput } from '@/components/CustomInput';
import MuiTable from '@/components/MuiTable';
import { INPUT_TYPE } from '@/constants/forms';
import { QUERY } from '@/constants/query';
import { JudgingParticipant } from '@/types';

import EditButton from './EditButton';

export const AdminJudgingParticipantAll = () => {
  const [value, setValue] = useState<number>(4);

  const columns = useMemo<
    ColumnDef<JudgingParticipant, any>[]
  >(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        cell: (
          info: CellContext<JudgingParticipant, number>
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
          info: CellContext<JudgingParticipant, string>
        ) => {
          return <Typography>{info.getValue()}</Typography>;
        },
      },
      {
        id: 'gender',
        accessorFn: (row) => row.application?.gender || '?',
        header: '성별',
        cell: (
          info: CellContext<JudgingParticipant, string>
        ) => {
          return <Typography>{info.getValue()}</Typography>;
        },
      },
      {
        id: 'birth',
        accessorFn: (row) => row.application?.birth || '?',
        header: '생년월일',
        cell: (
          info: CellContext<JudgingParticipant, string>
        ) => {
          return <Typography>{info.getValue()}</Typography>;
        },
      },
      {
        id: 'phone',
        accessorFn: (row) => row.application?.phone || '?',
        header: '전화번호',
        cell: (
          info: CellContext<JudgingParticipant, string>
        ) => {
          return <Typography>{info.getValue()}</Typography>;
        },
      },
      {
        id: 'email',
        accessorFn: (row) => row.application?.email || '?',
        header: '이메일',
        cell: (
          info: CellContext<JudgingParticipant, string>
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
          info: CellContext<JudgingParticipant, string>
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
          info: CellContext<JudgingParticipant, string>
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
            JudgingParticipant,
            JudgingParticipant
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
            to={`/api/v3/judging_participant/${value}/all/excel`}
          >
            참여자 목록 엑셀 다운로드
          </NavLinkButton>
        </Grid>
        <Grid item xs={12}>
          <BasicInput
            name="name"
            label="행사 선택"
            type={INPUT_TYPE.JUDGING_EVENT}
            value={value}
            onChange={setValue}
            helperText="행사를 선택해주세요."
          />
        </Grid>
        <Grid item xs={12}>
          <MuiTable
            size={15}
            queryKey={QUERY.KEY.ALL_JUDGING_PARTICIPANT}
            queryDetail={{
              event_id: value,
            }}
            queryFn={(page, size) =>
              getJudgingParticipantsByEventId(
                value,
                page,
                size
              )
            }
            columns={columns}
            title="심사 행사 참여자 목록"
            showTotal={true}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
