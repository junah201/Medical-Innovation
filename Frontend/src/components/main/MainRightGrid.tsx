import { AxiosResponse } from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

import { getPostsByBoardId, getSupportingStartups } from '@/api';
import { ParticipationChart } from '@/components/main';
import { Post, SuportingStartup } from '@/types';

export const MainRightGrid = () => {
  const navigate = useNavigate();

  const [selcted, setSelected] = useState<string>('공지사항');
  const [noticePosts, setNoticePosts] = useState<Post[]>([]);
  const [pressReleases, setPressReleases] = useState<Post[]>([]);
  const [columns, setColumns] = useState<Post[]>([]);
  const [supportingStartups, setSupportingStartups] = useState<
    SuportingStartup[]
  >([]);

  useQuery({
    queryKey: 'supporting_startup',
    queryFn: () => getSupportingStartups(0, 6),
    onSuccess: (res: AxiosResponse) => {
      setSupportingStartups(res.data.supporting_startups);
    },
  });

  useQuery({
    queryKey: ['posts', 2],
    queryFn: () => getPostsByBoardId(2, 0, 6),
    onSuccess: (res: AxiosResponse) => {
      setNoticePosts(res.data.posts);
    },
  });

  useQuery({
    queryKey: ['posts', 3],
    queryFn: () => getPostsByBoardId(3, 0, 6),
    onSuccess: (res: AxiosResponse) => {
      setPressReleases(res.data.posts);
    },
  });

  useQuery({
    queryKey: ['posts', 5],
    queryFn: () => getPostsByBoardId(5, 0, 6),
    onSuccess: (res: AxiosResponse) => {
      setColumns(res.data.posts);
    },
  });

  const onClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target.innerText === '협력기관') {
      navigate('/mou');
      return;
    }

    setSelected(e.target.innerText);
  };

  return (
    <StyledMainLeftGrid>
      <StyledTopGridItem>
        <li>
          <ol>
            <StyledTopGridButton
              onClick={onClickHandler}
              color={selcted === '공지사항' ? '#000000' : '#838383'}
            >
              공지사항
            </StyledTopGridButton>
          </ol>
          <ol>
            <StyledTopGridButton
              onClick={onClickHandler}
              color={selcted === '보도자료' ? '#000000' : '#838383'}
            >
              보도자료
            </StyledTopGridButton>
          </ol>
          <ol>
            <StyledTopGridButton
              onClick={onClickHandler}
              color={selcted === '기고문' ? '#000000' : '#838383'}
            >
              기고문
            </StyledTopGridButton>
          </ol>
          <ol>
            <StyledTopGridButton
              onClick={onClickHandler}
              color={selcted === '재단성격' ? '#000000' : '#838383'}
            >
              재단성격
            </StyledTopGridButton>
          </ol>
          <ol>
            <StyledTopGridButton
              onClick={onClickHandler}
              color={selcted === '협력기관' ? '#000000' : '#838383'}
            >
              협력기관
            </StyledTopGridButton>
          </ol>
        </li>
        <br />
        {selcted === '공지사항' ? (
          <>
            {noticePosts.map((post, index) => {
              return (
                <PostItem
                  link={`/post/${post.id}`}
                  title={post.title}
                  date={post.created_at}
                  index={index + 1}
                  key={index}
                />
              );
            })}
          </>
        ) : null}
        {selcted === '보도자료' ? (
          <>
            {pressReleases.map((post, index) => {
              return (
                <PostItem
                  link={post.content}
                  title={post.title}
                  date={post.created_at}
                  index={index + 1}
                  type="link"
                  key={index}
                />
              );
            })}
          </>
        ) : null}
        {selcted === '기고문' ? (
          <>
            {columns.map((post, index) => {
              return (
                <PostItem
                  link={`/post/${post.id}`}
                  title={post.title}
                  date={post.created_at}
                  index={index + 1}
                  key={index}
                />
              );
            })}
          </>
        ) : null}
        {selcted === '재단성격' ? (
          <StyledDocumentWrapper>
            <DocumentItem
              src="/images/Foundation/비영리법인설립허가증.png"
              alt="비영리법인설립허가증"
            />
            <DocumentItem
              src="/images/Foundation/창업기획자 등록증.png"
              alt="창업기획자 등록증"
            />
            <DocumentItem
              src="/images/Foundation/지정기부금단체 지정고시 통지서.png"
              alt="지정기부금단체 지정고시 통지서"
            />
            <DocumentItem
              src="/images/Foundation/특허증 (1차).png"
              alt="특허증 (1차)"
            />
            <DocumentItem
              src="/images/Foundation/특허증 (2차).png"
              alt="특허증 (2차)"
            />
            <DocumentItem
              src="/images/Foundation/출원사실증면원 (3차).png"
              alt="출원사실증면원 (3차)"
            />
          </StyledDocumentWrapper>
        ) : null}
      </StyledTopGridItem>
      <StyledBottomItem>
        <h3>스타트업 지원</h3>
        <StyledStartupWrapper>
          {supportingStartups.map((supporting_startup) => {
            return (
              <StyledStartupContainer key={supporting_startup.id}>
                <a
                  href={supporting_startup.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{supporting_startup.name}</span>
                  <p>{supporting_startup.content}</p>
                </a>
              </StyledStartupContainer>
            );
          })}
        </StyledStartupWrapper>
      </StyledBottomItem>
      <StyledBottomItem>
        <h3>재단사업 참가 현황</h3>
        <div>
          <ParticipationChart />
        </div>
      </StyledBottomItem>
    </StyledMainLeftGrid>
  );
};

const StyledMainLeftGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 335px 320px;
  grid-gap: 10px;

  @media screen and (max-width: 991px) {
    width: 100%;
    margin: 10px;
  }
  @media screen and (min-width: 992px) {
    width: 50%;
  }
`;

const StyledTopGridItem = styled.div`
  background-color: #ffffff;
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  padding: 15px;

  & > li {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    list-style-type: none;
  }

  & button {
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
  }

  @media screen and (max-width: 350px) {
    & button {
      font-size: 12px;
    }
  }
  @media screen and (min-width: 351px) and (max-width: 999px) {
    & button {
      font-size: 16px;
    }
  }
  @media screen and (min-width: 1000px) {
    & button {
      font-size: 16px;
    }
  }
  @media screen and (min-width: 1075px) {
    & button {
      font-size: 20px;
    }
  }
`;

const StyledTopGridButton = styled.button`
  font-size: 25px;
  font-weight: 600;
  color: ${(props) => props.color || '#838383'};
  border: none;
  background-color: transparent;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledBottomItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;

  & > div {
    width: 100%;
    height: 265px;
    overflow: hidden;
    background-color: #ffffff;
  }

  & > div > img {
    width: 100%;
    overflow: hidden;
  }

  & > h3 {
    font-size: 20px;
    font-weight: 800;
    margin-top: 12px;
  }
`;

const StyledStartupWrapper = styled.div`
  background-color: #ffffff;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 5px;
  padding: 6px;
`;

const StyledStartupContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 4px;
  overflow: hidden;
  border: 1px solid #e1e1e1;
  background-color: #ffffff;
  color: #000000;

  & a {
    text-decoration: none;
  }

  &:hover a > span {
    text-decoration: underline;
  }

  & a:visited {
    color: #000000;
  }

  & a:link {
    color: #000000;
  }

  & > a > span {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 5px;
  }

  & > a > p {
    font-size: 12.5px;
  }
`;

const StyledDocumentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 262px;
`;

const StyledPostItemA = styled.a`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #000000;

  &:visited {
    color: #000000;
  }

  &:hover {
    background-color: #f5f5f5;
  }

  & + & {
    border-top: 1px solid #e9ecef;
  }
`;

const StyledPostItemLink = styled(Link)`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #000000;

  &:visited {
    color: #000000;
  }

  &:hover {
    background-color: #f5f5f5;
  }

  & + & {
    border-top: 1px solid #e9ecef;
  }
`;

const StyledPostItemIndex = styled.span`
  width: 10%;
  text-align: center;

  @media screen and (max-width: 991px) {
    font-weight: 500;
  }
  @media screen and (min-width: 992px) {
  }
`;

const StyledPostItemTitle = styled.span`
  width: 70%;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }

  @media screen and (max-width: 991px) {
  }
  @media screen and (min-width: 992px) {
  }
`;

const StyledPostItemDate = styled.span`
  width: 20%;
  text-align: center;
  justify-content: center;
  font-size: 12px;
  min-width: 75px;

  @media screen and (max-width: 991px) {
    font-size: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  @media screen and (min-width: 992px) {
  }
`;

interface PostItemProps {
  title: string;
  link: string;
  index: number;
  date: string;
  type?: string;
}

const PostItem = ({ title, link, index, date, type }: PostItemProps) => {
  try {
    date = new Intl.DateTimeFormat('kr', {}).format(new Date(date));
  } catch {
    date = '';
  }

  if (type === 'link') {
    return (
      <StyledPostItemA href={link} target="_blank" rel="noopener noreferrer">
        <StyledPostItemIndex>{index}.</StyledPostItemIndex>
        <StyledPostItemTitle>{title}</StyledPostItemTitle>
        <StyledPostItemDate>{date}</StyledPostItemDate>
      </StyledPostItemA>
    );
  }

  return (
    <StyledPostItemLink to={link}>
      <StyledPostItemIndex>{index}.</StyledPostItemIndex>
      <StyledPostItemTitle>{title}</StyledPostItemTitle>
      <StyledPostItemDate>{date}</StyledPostItemDate>
    </StyledPostItemLink>
  );
};

const StyledDocumentItem = styled.a`
  overflow: hidden;
  width: 123px;
  height: 175px;
  border: 1px solid #000000;

  & img {
    width: 123px;
    height: 175px;
    object-fit: cover;
  }

  &:hover img {
    transform: scale(1.1);
    transition: transform 0.5s;
  }
`;

interface DocumentItemProps {
  src: string;
  alt: string;
}

const DocumentItem = ({ src, alt }: DocumentItemProps) => {
  return (
    <StyledDocumentItem href={src} target="_blank" rel="noopener noreferrer">
      <img src={src} alt={alt} />
    </StyledDocumentItem>
  );
};
