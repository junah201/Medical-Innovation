import { useState } from 'react';
import { useQuery } from 'react-query';

import { getActivePopups } from '@/api/popup';
import { Popup } from '@/components/popup';
import { Popup as IPopup } from '@/types';

export const Popups = () => {
  const [popups, setPopups] = useState<IPopup[]>([]);

  const { isLoading, isError } = useQuery('popups', getActivePopups, {
    retry: false,
    onSuccess: (res) => {
      setPopups(res.data.items);
    },
  });

  if (isLoading || isError) return null;

  return (
    <>
      {popups?.map((popup) => {
        return <Popup key={popup.id} {...popup} />;
      })}
    </>
  );
};
