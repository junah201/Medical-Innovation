import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { getMe } from '@/api';
import { ReactHookInput, Table } from '@/components';
import { INPUT_TYPE, REGISTER_TYPE, TABLE_CONFIG } from '@/constants';
import { RegisterField } from '@/types';

export const Me = () => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useForm<RegisterField>({
    mode: 'onChange',
  });

  useEffect(() => {
    async function initLoad() {
      const res = await getMe();

      setValue(REGISTER_TYPE.NAME, res.data.name);
      setValue(REGISTER_TYPE.EMAIL, res.data.email);
      setValue(REGISTER_TYPE.PHONE, res.data.phone);
      setValue(REGISTER_TYPE.BIRTH, res.data.birth);
    }

    initLoad();
  }, []);

  return (
    <>
      <>
        <h1>내 정보</h1>
        <ReactHookInput
          id={REGISTER_TYPE.NAME}
          title="이름"
          type={INPUT_TYPE.TEXT}
          register={register}
          errorMessage={errors[REGISTER_TYPE.NAME]?.message}
        />
        <ReactHookInput
          id={REGISTER_TYPE.EMAIL}
          title="이메일"
          type={INPUT_TYPE.EMAIL}
          register={register}
          errorMessage={errors[REGISTER_TYPE.EMAIL]?.message}
        />
        <ReactHookInput
          id={REGISTER_TYPE.PHONE}
          title="전화번호"
          type={INPUT_TYPE.PHONE}
          register={register}
          errorMessage={errors[REGISTER_TYPE.PHONE]?.message}
        />
        <ReactHookInput
          id={REGISTER_TYPE.BIRTH}
          title="생년월일"
          type={INPUT_TYPE.DATE}
          register={register}
          errorMessage={errors[REGISTER_TYPE.BIRTH]?.message}
        />
      </>
      <>
        <h1>참여 내역</h1>
        <>
          <h2>일반 행사 참여 내역</h2>
          <Table
            id="userPrivateEventParticpant"
            {...TABLE_CONFIG.USER_PRIVATE_EVENT_PARTICIPANT}
          />
        </>
        <>
          <h2>심사 행사 참여 내역</h2>
          <Table
            id="userJudgingEventParticpant"
            {...TABLE_CONFIG.USER_JUDGING_EVENT_PARTICIPANT}
          />
        </>
      </>
    </>
  );
};
