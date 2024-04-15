import { useParams, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import { getPostById } from '@/api';
import { PostContent } from '@/components/post';
import { useCustomQuery } from '@/libs/Query';

const { VITE_CDN_URL } = import.meta.env;

export const Post = () => {
  const params = useParams();

  const { data, isLoading, isError, error } =
    useCustomQuery(
      ['post', params.id],
      () => getPostById(params.id),
      {
        staleTime: Infinity,
        cacheTime: Infinity,
      }
    );

  if (isLoading) return <div>로딩중...</div>;

  if (isError)
    return (
      <div>
        에러가 발생했습니다. {JSON.stringify(error)}
      </div>
    );

  if (!data) return <></>;

  return (
    <>
      <h1>{data.data.title}</h1>
      <StyledPostDetail>
        <span>
          <small>작성자</small>
          {data.data.author_name}
        </span>
        <span>
          <small>작성일</small> {data.data.created_at}
        </span>
        <span>
          <small>게시판</small> {data.data.board.name}
        </span>
      </StyledPostDetail>
      <PostContent content={data.data.content} />
      {data.data.files.length ? (
        <StyledPostFiles>
          <span>첨부파일</span>
          {data.data.files.map((file) => {
            return (
              <a
                href={`${VITE_CDN_URL}/upload/${file}`}
                key={file}
              >
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
