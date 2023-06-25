import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';

import {
  getJudgingParticipantById,
  updateJudgingParticipantNthPassById,
} from '@/api';
import { ReactHookInput } from '@/components';
import { INPUT_TYPE, REGISTER_TYPE, ROUTE } from '@/constants';
import { Toast } from '@/libs/Toast';
import { RegisterField } from '@/types';

export const AdminJudgingParticipantNthPassEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterField>();

  useEffect(() => {
    async function initLoad() {
      const res = await getJudgingParticipantById(id);
    }

    initLoad();
  }, []);

  const { mutate } = useMutation(
    (userInput) => {
      return updateJudgingParticipantNthPassById(
        id,
        userInput[REGISTER_TYPE.OTHER_SCORE1]
      );
    },
    {
      onSuccess: () => {
        Toast('수정 완료', 'success');
        navigate(ROUTE.ADMIN.JUDGING_PARTICIPANT.ALL);
      },
      onError: (err: AxiosError) => {
        Toast(
          `수정에 실패했습니다. ${
            err?.response?.data.message || err.message
          }`,
          'error'
        );
      },
    }
  );

  const onValid = (userInput: RegisterField) => mutate(userInput);

  return (
    <>
      <h1>심사 단계 수정</h1>
      <Form onSubmit={handleSubmit(onValid)}>
        <ReactHookInput
          id={REGISTER_TYPE.OTHER_SCORE1}
          type={INPUT_TYPE.SELECT}
          title="심사 단계"
          register={register}
          options={[
            { value: '0', label: '심사 보류' },
            { value: '1', label: '1차 심사' },
            { value: '2', label: '2차 심사' },
            { value: '3', label: '수상' },
          ]}
          errorMessage={errors[REGISTER_TYPE.OTHER_SCORE1]?.message}
        />
        <Button
          isvalid={!Object.keys(errors)[0]}
          disabled={isSubmitting}
        >
          수정하기
        </Button>
      </Form>
    </>
  );
};

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0;
`;

const Button = styled.button<{ isvalid: boolean }>`
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
