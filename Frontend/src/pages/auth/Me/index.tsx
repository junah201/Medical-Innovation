import { useEffect, useState } from 'react';

import { getMe } from '@/api';
import { User } from '@/types';

import EventList from './EventList';
import Judging from './Judging';
import UserInfo from './UserInfo';
import UserPassword from './UserPassword';

export const Me = () => {
  const [userInfo, setUserInfo] = useState<User | null>(
    null
  );

  useEffect(() => {
    async function initLoad() {
      const res = await getMe();

      setUserInfo(res.data);
    }

    initLoad();
  }, []);

  return (
    <>
      {userInfo && <UserInfo row={userInfo} />}
      <br />
      {userInfo && <UserPassword row={userInfo} />}
      <br />
      <EventList />
      <br />
      <Judging />
    </>
  );
};
