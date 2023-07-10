import { AxiosResponse } from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

interface TableProps {
  id?: number | string;
  headers: string[];
  size: number;
  getDatas: (
    eventId: number | string,
    page: number,
    size: number
  ) => Promise<any>;
  itemToElement: (item: any, id: number) => React.ReactNode;
  queryId?: string;
}

export const Table = ({
  headers,
  size,
  getDatas,
  itemToElement,
  id = '',
  queryId = '',
}: TableProps) => {
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState<any[]>([]);

  const { isLoading, isError, error } = useQuery({
    retry: false,
    queryKey: ['tableDatas', queryId, page, total, id],
    queryFn: () => getDatas(id, page, size),
    onSuccess: (res: AxiosResponse) => {
      setData(res.data.items);
      setTotal(res.data.total);
    },
  });

  if (isLoading) return <>로딩중...</>;

  if (error?.response?.status === 404)
    return <>404 Not Found (옵션을 선택해주세요.)</>;

  if (isError) {
    if (error?.response?.status === 401) {
      return <>로그인이 필요합니다.</>;
    }
    if (error?.response?.status === 403) {
      return <>권한이 없습니다.</>;
    }
    return <>에러가 발생했습니다. {JSON.stringify(error)}</>;
  }

  if (total === 0) return <>데이터가 없습니다.</>;

  return (
    <>
      <span>total : {total}</span>
      <TableWrapper>
        <thead>
          <tr>
            {headers.map((header, index) => {
              return <th key={index}>{header}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return itemToElement(item, id);
          })}
        </tbody>
      </TableWrapper>
      <PageNationWrapper>
        <Button
          onClick={() => setPage(Math.max(0, page - size))}
          disabled={page <= 0}
        >
          {'<'}
        </Button>
        {Array.from({ length: Math.ceil(total / size) }).map(
          (_, index) => {
            return (
              <Button
                onClick={() => setPage(index * size)}
                disabled={index * size === page}
                key={index}
              >
                {index + 1}
              </Button>
            );
          }
        )}

        <Button
          onClick={() => setPage(Math.min(total, page + size))}
          disabled={page >= total / size - 1}
        >
          {'>'}
        </Button>
      </PageNationWrapper>
    </>
  );
};

const TableWrapper = styled.table`
  border: 1px solid silver;
  padding: 0;
  margin: 0;
  font-size: 12px;
  border-collapse: collapse;

  & th {
    padding: 10px;
    background-color: #204397;
    white-space: nowrap;
    color: #ffffff;
    text-align: center;
    justify-content: center;
    border: none;
  }

  & tr + tr {
    border-top: 1px solid silver;
  }

  & tr {
    height: 30px;
    border-bottom: 1pt solid #799fcb;
    text-align: center;
    justify-content: center;
    padding: 2px;
  }

  & button {
    padding: 3px;
    border-radius: 4px;
    font-weight: 600;
    border: none;
    background-color: ${(props) => props.theme.errorColor};
    color: #ffffff;
  }

  & a {
    color: #0000ff;
    text-decoration: none;
  }

  & a:hover {
    text-decoration: underline;
  }

  & span {
    width: 100%;
    color: #000000;
    display: block;
    text-align: right;
  }
`;

const PageNationWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  background-color: #ffffff;
  padding: 8px;
  width: 35px;
  height: 35px;
  border: none;
  font-size: 18px;

  & + & {
    margin-left: 5px;
  }

  &:hover {
    background-color: #f9f9f9;
  }
`;
