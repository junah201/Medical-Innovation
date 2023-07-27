import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { getJudgingEvents } from '@/api';
import { ReactHookInput, Table } from '@/components';
import { REGISTER_TYPE, INPUT_TYPE } from '@/constants';
import { TABLE_CONFIG } from '@/constants/tableConfig';
import { PublicEvent, RegisterField } from '@/types';

const { VITE_API_URL } = import.meta.env;

export const AdminJudgingParticipantAll = () => {
  const [privateEvents, setPrivateEvents] = useState<PublicEvent[]>(
    []
  );

  const {
    watch,
    register,
    formState: { errors },
    setValue,
  } = useForm<RegisterField>({
    mode: 'onChange',
    defaultValues: {
      [REGISTER_TYPE.SELECT_EVENT_ID]: undefined,
    },
  });

  useEffect(() => {
    async function initLoad() {
      const res = await getJudgingEvents(0, 10000);
      setPrivateEvents(res.data.items);
      setValue(REGISTER_TYPE.SELECT_EVENT_ID, res.data.items[0].id);
    }
    initLoad();
  }, []);

  return (
    <>
      <h1>심사 행사 참여자 목록</h1>
      <NavWarpper>
        <a
          href={`${VITE_API_URL}/api/v2/judging_participant/${
            watch()[REGISTER_TYPE.SELECT_EVENT_ID]
          }/all/excel`}
        >
          참여자 목록 엑셀 다운로드
        </a>
      </NavWarpper>
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
        placeholder="행사를 선택해주세요."
      />
      <Table
        id={watch()[REGISTER_TYPE.SELECT_EVENT_ID]}
        {...TABLE_CONFIG.JUDGING_EVENT_PARTICIPANT}
      />
    </>
  );
};

const NavWarpper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  & a {
    padding: 12px;
    font-size: 16px;
    color: ${(props) => props.theme.pointColor};
    font-weight: 600;
    border: 3px solid ${(props) => props.theme.pointColor};
  }
`;
