import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

import { getJudgingEvents } from '@/api';
import { Table, ReactHookInput } from '@/components';
import { INPUT_TYPE, REGISTER_TYPE } from '@/constants';
import { TABLE_CONFIG } from '@/constants/tableConfig';
import { JudgingEvent, RegisterField } from '@/types';

const { VITE_API_URL } = import.meta.env;

export const AdminJudgingResultAll = () => {
  const [judgingEvents, setJudgingEvents] = useState<JudgingEvent[]>(
    []
  );

  useEffect(() => {
    async function initLoad() {
      const res = await getJudgingEvents(0, 10000);
      setJudgingEvents(res.data.items);
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
      <h1>심사 결과 목록</h1>
      <NavWarpper>
        {watch()[REGISTER_TYPE.SELECT_EVENT_ID] && (
          <Link
            to={`${VITE_API_URL}/api/v2/judging_result/${
              watch()[REGISTER_TYPE.SELECT_EVENT_ID]
            }/all/excel`}
          >
            심사 결과 목록 다운로드
          </Link>
        )}
      </NavWarpper>
      <ReactHookInput
        id={REGISTER_TYPE.SELECT_EVENT_ID}
        title="행사 선택"
        type={INPUT_TYPE.SELECT}
        register={register}
        errorMessage={errors[REGISTER_TYPE.SELECT_EVENT_ID]}
        options={judgingEvents.map((event) => {
          return {
            value: event.id,
            label: event.name,
          };
        })}
      />
      <Table
        id={watch()[REGISTER_TYPE.SELECT_EVENT_ID]}
        {...TABLE_CONFIG.JUDGING_RESULT}
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
