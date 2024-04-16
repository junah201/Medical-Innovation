import { Box, Typography } from '@mui/material';
import {
  CellContext,
  ColumnDef,
} from '@tanstack/react-table';
import { useMemo } from 'react';

import { getNthJudgingParticipantsByEventId } from '@/api';
import { Status } from '@/components';
import { NavLinkButton } from '@/components/buttons';
import MuiTable from '@/components/MuiTable';
import { QUERY } from '@/constants';
import { JudgingParticipant } from '@/types';

interface JudgingTableProps {
  event_id: string;
  nth: number;
}

export const JudgingTable = ({
  event_id,
  nth,
}: JudgingTableProps) => {
  const columns = useMemo<
    ColumnDef<JudgingParticipant, any>[]
  >(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        cell: (
          info: CellContext<JudgingParticipant, string>
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
        header: '소속',
        cell: (
          info: CellContext<JudgingParticipant, string>
        ) => {
          return <Typography>{info.getValue()}</Typography>;
        },
      },
      {
        id: 'first_judging_result',
        accessorFn: (row) => {
          if (nth === 1) {
            return (
              row.first_judging_result?.total_score || -1
            );
          }
          return (
            row.second_judging_result?.total_score || -1
          );
        },
        header: '심사 여부',
        cell: (
          info: CellContext<JudgingParticipant, number>
        ) => {
          if (info.getValue() === -1) {
            return <Status color="gray">미심사</Status>;
          }
          return (
            <Status color="green">
              심사 완료 ({info.getValue()}
              점)
            </Status>
          );
        },
      },
      {
        id: 'judging',
        accessorKey: 'id',
        header: '심사하기',
        cell: (
          info: CellContext<JudgingParticipant, number>
        ) => {
          return (
            <NavLinkButton
              to={`/judging/result/${event_id}/${info.getValue()}/1/create`}
            >
              {nth}차 심사하기
            </NavLinkButton>
          );
        },
      },
    ],
    []
  );

  return (
    <Box>
      <MuiTable
        size={15}
        queryKey={QUERY.KEY.JUDGING_PARTICIPANT}
        queryDetail={{
          event_id,
          nth,
        }}
        queryFn={(page, size) =>
          getNthJudgingParticipantsByEventId(
            event_id,
            nth,
            page,
            size
          )
        }
        columns={columns}
        title={`${nth}차 심사 참가자 목록`}
        showTotal={true}
      />
    </Box>
  );
};
