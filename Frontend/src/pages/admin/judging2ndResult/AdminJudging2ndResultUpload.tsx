import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import {
  getJudgingResultById,
  submitJudging2ndResult,
} from '@/api';
import {
  ReactHookInput,
  InputLabel,
  JudgingNumberForm,
  JudgingNumberFormWrapper,
} from '@/components';
import {
  CONFIG,
  ERROR_MESSAGE,
  INPUT_TYPE,
  REGISTER_TYPE,
  ROUTE,
} from '@/constants';
import { Toast } from '@/libs/Toast';
import {
  BioForm,
  TechForm,
} from '@/pages/admin/judging2ndResult/components';
import {
  Judging2ndResultSubmitInfo,
  RegisterField,
} from '@/types';

export const AdminJudging2ndResultUpload = () => {
  const params = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterField>({
    mode: 'onChange',
  });

  const { mutate } = useMutation(
    (userInput) => {
      const data: Judging2ndResultSubmitInfo = {
        ...userInput,
        judging_event_id: parseInt(params.event_id),
      };

      return submitJudging2ndResult(data);
    },
    {
      onSuccess: () => {
        Toast('업로드 완료', 'success');
        navigate(ROUTE.ADMIN.BANNER.ALL);
      },
      onError: (err: AxiosError) => {
        Toast(
          `업로드에 실패했습니다. ${err?.response?.data?.message}`,
          'error'
        );
      },
    }
  );

  const onValid = (userInput: RegisterField) =>
    mutate(userInput);

  return (
    <>
      <h1>심사 결과 추가하기</h1>
      <Form onSubmit={handleSubmit(onValid)}>
        <ReactHookInput
          id={REGISTER_TYPE.SELECT_EVENT_ID}
          title="심사 종류"
          type={INPUT_TYPE.SELECT}
          register={register}
          errorMessage={
            errors[REGISTER_TYPE.SELECT_EVENT_ID]
          }
          options={[
            { value: 'bio', label: '바이오' },
            { value: 'tech', label: '테크' },
          ]}
        />
        <ReactHookInput
          id={REGISTER_TYPE.USER_ID}
          title="심사자 유저 ID"
          type={INPUT_TYPE.TEXT}
          register={register}
          errorMessage={
            errors[REGISTER_TYPE.PARTICIPANT_ID]
          }
        />
        <ReactHookInput
          id={REGISTER_TYPE.PARTICIPANT_ID}
          title="심사 대상자 ID"
          type={INPUT_TYPE.TEXT}
          register={register}
          errorMessage={
            errors[REGISTER_TYPE.PARTICIPANT_ID]
          }
        />
        {watch()[REGISTER_TYPE.SELECT_EVENT_ID] ===
        'bio' ? (
          <BioForm register={register} errors={errors} />
        ) : (
          <TechForm register={register} errors={errors} />
        )}
        <Submit
          isvalid={!Object.keys(errors)[0]}
          disabled={isSubmitting}
        >
          업로드
        </Submit>
      </Form>
    </>
  );
};

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 30px 0;
`;

const Submit = styled.button<{ isvalid: boolean }>`
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  background: ${(props) =>
    props.isvalid
      ? props.theme.pointColor
      : props.theme.loginDisabledColor};
  color: #ffffff;
  font-weight: 600;
  border: none;
  font-size: 20px;
  height: 50px;
  width: 100%;
  transition: ${({ theme }) => theme.transitionOption};
  :hover {
    cursor: pointer;
    background: ${(props) =>
      props.isvalid ? props.theme.pointColorLight : ''};
    color: ${({ theme }) => theme.background};
  }
  letter-spacing: 1px;
`;
