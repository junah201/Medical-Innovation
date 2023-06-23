import { AxiosResponse } from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';

import { getPublicEvents } from '@/api';
import {
  ProgramSubNav,
  Message,
  Events as CEvents,
} from '@/components';
import { PublicEvent } from '@/types';

export const Events = () => {
  const [events, setEvents] = useState<PublicEvent[]>();

  useQuery({
    queryKey: 'public_events',
    queryFn: () => getPublicEvents(0, 10000),
    onSuccess: (res: AxiosResponse) => {
      setEvents(res.data.items);
    },
  });

  return (
    <>
      <ProgramSubNav select="프로그램안내" />
      <h1>행사 목록</h1>
      <Message>
        미래의학연구재단에서 수행하는 행사 목록입니다. 참가를 원하시는
        행사를 클릭하여 안내에 따라 참가 신청 을 부탁드립니다.
      </Message>
      {events && (
        <CEvents
          events={events}
          itemToLink={(item: PublicEvent) => {
            return `/programs/event/${item.id}/detail`;
          }}
        />
      )}
    </>
  );
};
