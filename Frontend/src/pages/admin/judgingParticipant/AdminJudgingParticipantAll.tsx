import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { getJudgingEvents } from '@/api';
import { ReactHookInput, Table } from '@/components';
import { REGISTER_TYPE, INPUT_TYPE } from '@/constants';
import { TABLE_CONFIG } from '@/constants/tableConfig';
import { PublicEvent, RegisterField } from '@/types';

export const AdminJudgingParticipantAll = () => {
  const [privateEvents, setPrivateEvents] = useState<PublicEvent[]>(
    []
  );

  useEffect(() => {
    async function initLoad() {
      const res = await getJudgingEvents(0, 10000);
      setPrivateEvents(res.data.items);
    }
    initLoad();
  }, []);

  const {
    watch,
    register,
    formState: { errors },
  } = useForm<RegisterField>({
    mode: 'onChange',
  });

  return (
    <>
      <h1>심사 행사 참여자 목록</h1>
      <ReactHookInput
        id={REGISTER_TYPE.SELECT_EVENT_ID}
        title="행사 선택"
        type={INPUT_TYPE.SELECT}
        register={register}
        errorMessage={errors[REGISTER_TYPE.SELECT_EVENT_ID]}
        options={privateEvents.map((event) => {
          return {
            value: event.id,
            label: event.name,
          };
        })}
      />
      <Table
        id={watch()[REGISTER_TYPE.SELECT_EVENT_ID]}
        {...TABLE_CONFIG.JUDGING_EVENT_PARTICIPANT}
      />
    </>
  );
};
