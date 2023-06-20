import { AxiosResponse } from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

interface TableProps {
  id: number | string;
  headers: string[];
  size: number;
  getDatas: (
    eventId: number | string,
    page: number,
    size: number
  ) => Promise<any>;
  itemToElement: (item: any, id: number | string) => React.ReactNode;
}

export const Table = ({
  id,
  headers,
  size,
  getDatas,
  itemToElement,
}: TableProps) => {
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState<any[]>([]);

  const { isLoading, isError, error } = useQuery({
    queryKey: ['datas', page, total],
    queryFn: () => getDatas(id, page, size),
    onSuccess: (res: AxiosResponse) => {
      setData(res.data.participants);
      setTotal(res.data.total);
    },
  });

  if (isLoading) return <>로딩중...</>;

  return (
    <>
      <span>total : {total}</span>
      <StyledAdminTable>
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
      </StyledAdminTable>
      <StyledBoardPageButtonWrapper>
        <StyledBoardPageButton
          onClick={() => setPage(Math.max(0, page - size))}
          disabled={page <= 0}
        >
          {'<'}
        </StyledBoardPageButton>
        {Array.from({ length: Math.ceil(total / size) }).map(
          (_, index) => {
            return (
              <StyledBoardPageButton
                onClick={() => setPage(index * size)}
                disabled={index * size === page}
                key={index}
              >
                {index + 1}
              </StyledBoardPageButton>
            );
          }
        )}

        <StyledBoardPageButton
          onClick={() => setPage(Math.min(total, page + size))}
          disabled={page >= total / size - 1}
        >
          {'>'}
        </StyledBoardPageButton>
      </StyledBoardPageButtonWrapper>
    </>
  );
};

const StyledAdminTable = styled.table`
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
    border-bottom: 1pt solid #799fcb;
    text-align: center;
    justify-content: center;
    padding: 2px;
    height: 30px;
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

const StyledBoardPageButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const StyledBoardPageButton = styled.button`
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
