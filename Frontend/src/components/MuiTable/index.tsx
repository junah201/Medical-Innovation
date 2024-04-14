import {
  Box,
  Skeleton,
  Table as RowMuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Pagination as MuiPagination,
  Grid,
  PaginationItem,
} from '@mui/material';
import {
  Table as TableType,
  flexRender,
  useReactTable,
  getCoreRowModel,
  ColumnDef,
} from '@tanstack/react-table';
import { useState, useMemo } from 'react';
import { useQuery } from 'react-query';

import MainCard from '@/components/MainCard';

interface TableProps<ItemType extends any> {
  size?: number;
  title?: string;
  showTotal?: boolean;
  queryKey: string;
  queryDetail?: object;
  queryFn: (page: number, size: number) => Promise<any>;
  columns: ColumnDef<ItemType, any>[];
  showLoading?: boolean;
  showPagenation?: boolean;
}

export const MuiTable = <ItemType extends any>({
  size = 20,
  title = '',
  showTotal = false,
  queryKey,
  queryDetail = {},
  queryFn,
  columns,
  showLoading = false,
  showPagenation = true,
}: TableProps<ItemType>) => {
  const [page, setPage] = useState<number>(0);

  const { data, isLoading, isFetching } = useQuery(
    [
      queryKey,
      {
        page: page,
        size: size,
        ...queryDetail,
      },
    ],
    () => queryFn(page, size),
    {
      keepPreviousData: true,
      retry: 1,
    }
  );

  const total = (data?.data?.total || 0) as number;

  const defaultData = useMemo(() => [], []);

  const table = useReactTable<ItemType>({
    data: data?.data?.items || defaultData,
    columns,
    pageCount: page ?? -1,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  return (
    <>
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography variant="h5" fontWeight="bold">
              {title}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            {showTotal && (
              <Typography align="right">
                Total : {total}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>
      <MainCard content={false}>
        <Box>
          <TableContainer
            sx={{
              width: '100%',
              overflowX: 'auto',
              position: 'relative',
              display: 'block',
              maxWidth: '100%',
              '& td, & th': { whiteSpace: 'nowrap' },
            }}
          >
            <RowMuiTable
              aria-labelledby="tableTitle"
              sx={{
                '& .MuiTableCell-root:first-of-type': {
                  pl: 2,
                },
                '& .MuiTableCell-root:last-of-type': {
                  pr: 3,
                },
                '& .MuiTableCell-head': {
                  backgroundColor: 'grey.50',
                },
              }}
            >
              <Header table={table} />
              {showLoading && (isLoading || isFetching) ? (
                <LoadingBody table={table} />
              ) : (
                <Body table={table} />
              )}
            </RowMuiTable>
          </TableContainer>
        </Box>
        {showPagenation && (
          <Pagination
            page={page}
            setPage={setPage}
            size={size}
            total={total}
          />
        )}
      </MainCard>
    </>
  );
};

const Header = <ItemType extends any>({
  table,
}: {
  table: TableType<ItemType>;
}) => {
  return (
    <TableHead>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((column) => {
            return (
              <TableCell align="left" key={column.id}>
                {flexRender(
                  column.column.columnDef.header,
                  column.getContext()
                )}
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </TableHead>
  );
};

const Body = <ItemType extends any>({
  table,
}: {
  table: TableType<ItemType>;
}) => {
  return (
    <TableBody>
      {table.getRowModel().rows.map((row) => {
        return (
          <TableRow
            hover
            sx={{
              '&:last-child td, &:last-child th': {
                border: 0,
              },
            }}
            tabIndex={-1}
            key={row.id}
          >
            {row.getVisibleCells().map((cell) => {
              return (
                <TableCell align="left" key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );
};

const LoadingBody = <ItemType extends any>({
  table,
}: {
  table: TableType<ItemType>;
}) => {
  return (
    <TableBody>
      {table.getRowModel().rows.map((row) => {
        console.log(row);
        console.log(row.id);

        return (
          <TableRow
            hover
            sx={{
              '&:last-child td, &:last-child th': {
                border: 0,
              },
            }}
            tabIndex={-1}
            key={row.id}
          >
            {row.getVisibleCells().map((info) => {
              return (
                <TableCell align="left" key={info.id}>
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '1rem' }}
                  />
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );
};

interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  size: number;
  total: number;
}

const Pagination = ({
  page,
  setPage,
  size,
  total,
}: PaginationProps) => {
  const MaxPage =
    Math.floor(total / size) + (total % size > 0 ? 1 : 0);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        my: 0.5,
      }}
    >
      <MuiPagination
        page={page / size + 1}
        onChange={(_, page) => {
          setPage((page - 1) * size);
        }}
        count={MaxPage}
        boundaryCount={5}
        showFirstButton
        showLastButton
        color="primary"
        size="large"
        variant="outlined"
      />
    </Box>
  );
};

export default MuiTable;
