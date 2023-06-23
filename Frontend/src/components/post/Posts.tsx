import { AxiosResponse } from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { getPostsByBoardId } from '@/api';
import { Post as IPost } from '@/types';

interface PostProps {
  boardId: number;
  children: React.ReactNode;
  boardType?: string;
}

export const Posts = ({
  boardId,
  children,
  boardType = '',
}: PostProps) => {
  const SIZE = 20;
  const [posts, setPosts] = useState<IPost[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);

  const { isLoading, isError, error } = useQuery({
    queryKey: ['posts', boardId, page, total],
    queryFn: () => getPostsByBoardId(boardId, page, SIZE),
    onSuccess: (res: AxiosResponse) => {
      setPosts(res.data.items);
      setTotal(res.data.total);
    },
  });

  if (isLoading) return <div>로딩중...</div>;
  if (isError)
    return <div>에러가 발생했습니다. {JSON.stringify(error)}</div>;

  return (
    <>
      {children}
      <div>
        {posts.map((post, index) => (
          <Post
            key={post.id}
            idx={index}
            item={post}
            page={page}
            boardType={boardType}
          />
        ))}
      </div>
      <StyledBoardPageButtonWrapper>
        <StyledBoardPageButton
          onClick={() => setPage(Math.max(0, page - SIZE))}
          disabled={page <= 0}
        >
          {'<'}
        </StyledBoardPageButton>
        {Array.from({ length: Math.ceil(total / SIZE) }).map(
          (_, index) => {
            return (
              <StyledBoardPageButton
                onClick={() => setPage(index * SIZE)}
                disabled={index * SIZE === page}
                key={index}
              >
                {index + 1}
              </StyledBoardPageButton>
            );
          }
        )}

        <StyledBoardPageButton
          onClick={() => setPage(Math.min(total, page + SIZE))}
          disabled={page >= total / SIZE - 1}
        >
          {'>'}
        </StyledBoardPageButton>
      </StyledBoardPageButtonWrapper>
    </>
  );
};

const StyledPost = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 0;

  &:hover {
    background-color: #f9f9f9;
  }
  &:hover a {
    text-decoration: underline;
  }

  & + & {
    border-top: 1px solid #ececec;
  }

  & > span {
    width: 10%;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    line-height: 22px;
  }

  & > div > span {
    font-size: 12px;
    display: block;
  }

  & a {
    color: #000000;
  }
`;

const StyledPostContent = styled.div`
  width: 73%;
  margin-right: 1%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  & > a {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 16px;
    display: block;
  }

  @media screen and (max-width: 991px) {
    width: 83%;

    & > a {
      font-size: 14px;
    }

    & > span {
      font-size: 12px;
    }
  }
  @media screen and (min-width: 992px) {
    & > a {
      font-size: 18px;
    }

    & > span {
      font-size: 16px;
    }
  }
`;

const StyledPostButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #ececec;
  width: 10%;
  padding: 5px;

  & a {
    font-size: 14px;
  }

  @media screen and (max-width: 991px) {
    display: none;
  }
  @media screen and (min-width: 992px) {
  }
`;

const Post = ({
  idx,
  item,
  page,
  boardType,
}: {
  idx: number;
  item: IPost;
  page: number;
  boardType: string;
}) => {
  const date = new Intl.DateTimeFormat('ko', {
    dateStyle: 'long',
  }).format(new Date(item.created_at));

  return (
    <StyledPost>
      <span>{page + idx + 1}</span>
      <StyledPostContent>
        {boardType === 'link' ? (
          <a
            href={`${item.content}`}
            target="_blank"
            rel="noreferrer"
          >
            {item.title}
          </a>
        ) : (
          <Link to={`/post/${item.id}?type=${boardType}`}>
            {item.title}
          </Link>
        )}
        <span>게시일 {date}</span>
      </StyledPostContent>
      {item.files.length > 0 ? (
        <StyledPostButton>
          <a
            href={`https://medical-innovation.s3.ap-northeast-2.amazonaws.com/upload/${item.files[0]}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            다운로드
          </a>
        </StyledPostButton>
      ) : null}
    </StyledPost>
  );
};

const StyledBoardPageButtonWrapper = styled.div`
  display: flex;
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
