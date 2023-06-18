import { AxiosError } from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import { getPostById } from '@/api';
import { PostContent } from '@/components/post';
import { Post as IPost } from '@/types/post';

const { VITE_CDN_URL } = import.meta.env;

export const Post = () => {
  const [data, setData] = useState<IPost>({} as IPost);

  const params = useParams();
  const navigate = useNavigate();

  const { isLoading, isError, error } = useQuery({
    queryKey: ['post', params.id],
    queryFn: () => getPostById(params.id),
    retry: false,
    onSuccess: (res) => {
      setData(res.data);
    },
    onError: (err: AxiosError) => {
      if (err?.response?.status === 404) {
        navigate('/404');
      }
    },
  });

  if (isLoading) return <div>로딩중...</div>;

  if (isError) return <div>에러가 발생했습니다. {error}</div>;

  return (
    <>
      <h1>{data.title}</h1>
      <StyledPostDetail>
        <span>
          <small>작성자</small>
          {data.author_name}
        </span>
        <span>
          <small>작성일</small> {data.created_at}
        </span>
        <span>
          <small>게시판</small> {data.board.name}
        </span>
      </StyledPostDetail>
      <PostContent content={data.content} />
      {data.files.length ? (
        <StyledPostFiles>
          <span>첨부파일</span>
          {data.files.map((file) => {
            return (
              <a href={`${VITE_CDN_URL}/upload/${file}`} key={file}>
                {file}
              </a>
            );
          })}
        </StyledPostFiles>
      ) : null}
    </>
  );
};

const StyledPostDetail = styled.div`
  & > span + span {
    margin-left: 10px;
  }

  & small {
    font-size: 12px;
    margin-right: 5px;
  }

  & span {
    font-size: 14px;
  }
`;

const StyledPostFiles = styled.div`
  position: relative;
  bottom: 0;
  display: flex;
  flex-direction: column;
  border: 1px solid #474747;
  padding: 5px;
  margin-top: 20px;

  & span {
    font-size: 16px;
    margin-bottom: 20px;
  }

  & a:hover {
    text-decoration: underline;
  }
`;
