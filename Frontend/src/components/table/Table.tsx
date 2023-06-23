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
}

export const Table = ({
  headers,
  size,
  getDatas,
  itemToElement,
  id = '',
}: TableProps) => {
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState<any[]>([]);

  const { isLoading, isError, error } = useQuery({
    retry: false,
    queryKey: ['datas', page, total, id],
    queryFn: () => getDatas(id, page, size),
    onSuccess: (res: AxiosResponse) => {
      setData(res.data.items);
      setTotal(res.data.total);
    },
  });

  if (isLoading) return <>로딩중...</>;

  if (error?.response?.status === 404)
    return <>옵션을 선택한 후에 다시 시도해주세요.</>;

  if (isError)
    return <>에러가 발생했습니다. {JSON.stringify(error)}</>;

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

  /* & td:nth-child(3) {
    margin-top: 0.25rem;
    height: 18px;
    overflow: hidden;
    font-size: 12px;
    text-overflow: ellipsis;
    word-wrap: brek-word;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  } */

  & button {
    background-color: ${(props) => props.theme.errorColor};
    padding: 3px;
    border-radius: 4px;
    color: #ffffff;
    font-weight: 600;
    border: none;
  }

  & a {
    color: #0000ff;
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
