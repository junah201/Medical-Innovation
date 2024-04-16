import { useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getJudgingEventById } from '@/api';
import { HtmlContent, Message } from '@/components';
import { JudgingEvent } from '@/types';

const { VITE_CDN_URL } = import.meta.env;

export const JudgingEventDetail = () => {
  const params = useParams();
  const [eventDetail, setEventDetail] =
    useState<JudgingEvent>();

  useQuery(
    'JudgingEventDetail',
    () => getJudgingEventById(params.event_id),
    {
      retry: false,
      onSuccess: (res) => {
        setEventDetail(res.data);
      },
    }
  );

  if (!eventDetail) return <></>;

  return (
    <>
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
              eventDetail.thumbnail_filename
                ? eventDetail.thumbnail_filename
                : 'null.png'
            }`}
            alt={eventDetail.name}
          />
        </div>
      </div>
      <div>
        <Message>
          <HtmlContent content={eventDetail.description} />
        </Message>
        <StyledEventRegistButton
          to={`/judging/event/${params.event_id}/registration`}
        >
          참가 신청하기
        </StyledEventRegistButton>
      </div>
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
  margin: 20px 0;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: 700;
  text-decoration: none;
`;
