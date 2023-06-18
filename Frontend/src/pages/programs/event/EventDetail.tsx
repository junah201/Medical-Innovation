import { AxiosResponse } from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getPublicEventById } from '@/api';
import { PostContent } from '@/components';
import { PublicEvent } from '@/types';

const { VITE_CDN_URL } = import.meta.env;

export const EventDetail = () => {
  const params = useParams();

  const [eventDetail, setEventDetail] = useState<PublicEvent>();

  useQuery({
    queryKey: 'public_event',
    queryFn: () => getPublicEventById(params.id),
    onSuccess: (res: AxiosResponse) => {
      setEventDetail(res.data);
    },
  });

  return (
    <>
      {eventDetail && (
        <div>
          <h1>{eventDetail.name}</h1>
          <div
            style={{
              width: '100%',
            }}
          >
            <img
              style={{
                width: '100%',
                overflow: 'hidden',
              }}
              src={`${VITE_CDN_URL}/upload/${
                eventDetail.thumbnail_filename ? eventDetail.thumbnail_filename : 'null.png'
              }`}
              alt={eventDetail.name}
            />
          </div>
          <PostContent content={eventDetail.description} />
          <StyledEventRegistButton to={`/programs/event/${params.id}/registration`}>
            참가 신청하기
          </StyledEventRegistButton>
        </div>
      )}
    </>
  );
};

const StyledEventRegistButton = styled(Link)`
  display: block;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background-color: #fff;
  border: 1px solid #000;
  margin: 50px 0;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: 700;
  text-decoration: none;
`;
