import {
  Box,
  Button,
  Grid,
  Typography,
} from '@mui/material';
import {
  CellContext,
  ColumnDef,
} from '@tanstack/react-table';
import { useConfirm } from 'material-ui-confirm';
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { getJudging2ndResultsByEventId } from '@/api';
import { BasicInput } from '@/components/CustomInput';
import MuiTable from '@/components/MuiTable';
import { INPUT_TYPE } from '@/constants/forms';
import { QUERY } from '@/constants/query';
import { JudgingResult } from '@/types';

import AddModal from './AddModal';

export const AdminJudging2ndResultAll = () => {
  const confirm = useConfirm();
  const [value, setValue] = useState<number>(4);

  const columns = useMemo<ColumnDef<JudgingResult, any>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        cell: (
          info: CellContext<JudgingResult, number>
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
        accessorFn: (row) => row.user.name,
        header: '심사자',
        cell: (
          info: CellContext<JudgingResult, string>
        ) => {
          return <Typography>{info.getValue()}</Typography>;
        },
      },
      {
        id: 'participant_name',
        accessorFn: (row) => row.participant_name,
        header: '심사자 대상자',
        cell: (
          info: CellContext<JudgingResult, string>
        ) => {
          return <Typography>{info.getValue()}</Typography>;
        },
      },
      {
        id: 'total_score',
        accessorFn: (row) => row.total_score,
        header: '총점',
        cell: (
          info: CellContext<JudgingResult, number>
        ) => {
          return <Typography>{info.getValue()}</Typography>;
        },
      },
      {
        id: 'created_at',
        accessorFn: (row) => row.created_at,
        header: '생성일',
        cell: (
          info: CellContext<JudgingResult, string>
        ) => {
          return (
            <Typography>
              {info.getValue().replace('T', ' ')}
            </Typography>
          );
        },
      },
      {
        id: 'detail',
        accessorFn: (row) => row.id,
        header: '상세정보',
        cell: (
          info: CellContext<JudgingResult, number>
        ) => {
          return (
            <Link
              to={`/admin/judging_2nd_result/detail/${info.getValue()}`}
            >
              상세정보
            </Link>
          );
        },
      },
    ],
    []
  );

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button
            onClick={() => {
              confirm({
                title: `${value}번 심사 행사 결과 추가`,
                content: <AddModal event_id={value} />,
                dialogProps: {
                  maxWidth: 'xl',
                },
              });
            }}
            variant="outlined"
          >
            2차 심사 결과 추가
          </Button>
        </Grid>
        <Grid item xs={12}>
          <BasicInput
            name="name"
            label="심사 행사 선택"
            type={INPUT_TYPE.JUDGING_EVENT}
            value={value}
            onChange={setValue}
            helperText="행사를 선택해주세요."
          />
        </Grid>
        <Grid item xs={12}>
          <MuiTable
            size={15}
            queryKey={QUERY.KEY.ALL_JUDGING_RESULT}
            queryDetail={{
              event_id: value,
            }}
            queryFn={(page, size) =>
              getJudging2ndResultsByEventId(
                value,
                page,
                size
              )
            }
            columns={columns}
            title="2차 심사 결과 목록"
            showTotal={true}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
