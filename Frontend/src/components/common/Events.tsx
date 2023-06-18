import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { PublicEvent } from '@/types';

const { VITE_CDN_URL } = import.meta.env;

const StyledEvents = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 15px;
  grid-gap: 30px;

  @media screen and (max-width: 991px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 8px;
  }
  @media screen and (min-width: 450px) and (max-width: 991px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
  }
  @media screen and (min-width: 992px) and (max-width: 1249px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 30px;
  }
  @media screen and (min-width: 1250px) {
  }

  @media screen and (max-width: 688px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

interface EventsProps {
  events: PublicEvent[];
  itemToLink: (item: PublicEvent) => string;
}

export const Events = ({ events, itemToLink }: EventsProps) => {
  return (
    <StyledEvents>
      {events.map((item) => {
        return <EventItem key={item.id} item={item} itemToLink={itemToLink} />;
      })}
    </StyledEvents>
  );
};

const StyledEventItem = styled.div`
  border: ${({ theme }) => theme.borderOption};
  border-radius: 10px;
  padding: 15px;
  width: 100%;
  min-width: 300px;
  overflow: hidden;

  & div {
    height: 200px;
    overflow: hidden;
    border: ${({ theme }) => theme.borderOption};
    border-radius: 10px;
  }

  & img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  & h2 {
    font-size: 20px;
    height: 56px;
    overflow: hidden;

    text-overflow: ellipsis;
    word-wrap: brek-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  & span {
    font-size: 16px;
    color: ${({ theme }) => theme.transparentColor};
  }

  @media screen and (max-width: 991px) {
    height: 300px;

    & div {
      height: 150px;
      overflow: hidden;
      border: ${({ theme }) => theme.borderOption};
      border-radius: 10px;
    }

    & img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }

    & h2 {
      font-size: 16px;
      word-break: keep-all;
    }
  }
`;

interface EventItemProps {
  item: PublicEvent;
  itemToLink: (item: PublicEvent) => string;
}

export const EventItem = ({ item, itemToLink }: EventItemProps) => {
  return (
    <StyledEventLink to={itemToLink(item)}>
      <StyledEventItem>
        <div>
          <img
            src={`${VITE_CDN_URL}/upload/${
              item.thumbnail_filename ? item.thumbnail_filename : 'null.png'
            }`}
            alt={item.name}
          />
        </div>
        <br />
        <span>{item?.start_date || item.join_start_date}</span>
        <h2>{item.name}</h2>
        <Link to={itemToLink(item)}>자세히보기</Link>
      </StyledEventItem>
    </StyledEventLink>
  );
};

const StyledEventLink = styled(Link)`
  border-radius: 10px;
  transition: ease-in-out 0.15s;
  color: inherit;
  box-shadow: ${({ theme }) => theme.boxShadowOption};

  :hover {
    background: ${({ theme }) => theme.borderColor};
  }

  text-decoration: none;
`;
