import { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';

import {
  getJudgingEvents,
  getUserById,
  updateJudgingPermission,
} from '@/api';
import { Message, ReactHookInput } from '@/components';
import { INPUT_TYPE, REGISTER_TYPE } from '@/constants';
import { Toast } from '@/libs/Toast';
import {
  JudgingEvent,
  JudgingPermission,
  RegisterField,
} from '@/types';

export const AdminUserPermissionEdit = () => {
  const { id } = useParams() as { id: string };

  const [events, setEvents] = useState<JudgingEvent[]>([]);

  const [userPermissions, setUserPermissions] = useState<
    JudgingPermission[]
  >([]);

  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterField>({
    mode: 'onChange',
    defaultValues: {
      first_judging_permission: false,
      second_judging_permission: false,
    },
  });

  const { mutate } = useMutation(
    (userInput) =>
      updateJudgingPermission(
        id,
        userInput[REGISTER_TYPE.JUDGING_EVENT],
        userInput?.first_judging_permission,
        userInput?.second_judging_permission
      ),
    {
      onSuccess: () => {
        Toast('수정되었습니다.', 'success');
        location.reload();
      },
      onError: (err: AxiosError) => {
        Toast(
          `수정에 실패했습니다. ${
            err?.response?.data?.message ||
            err?.meesage ||
            JSON.stringify(err)
          }`,
          'error'
        );
      },
    }
  );

  useEffect(() => {
    async function initLoad() {
      const res = await getJudgingEvents(0, 10000);
      setEvents(res.data.items);
      setValue(
        REGISTER_TYPE.JUDGING_EVENT,
        res.data.items[0].id
      );
    }
    initLoad();
  }, []);

  useEffect(() => {
    async function initLoad() {
      const res = await getUserById(id);
      setUserPermissions(res.data.judging_permissions);
    }
    initLoad();
  }, []);

  useEffect(() => {
    const userPermission = userPermissions.find(
      (permission) => {
        return (
          permission.judging_event_id ===
          parseInt(watch()[REGISTER_TYPE.JUDGING_EVENT])
        );
      }
    );
    if (userPermission) {
      setValue(
        REGISTER_TYPE.FIRST_JUDGING_PERMISSION,
        userPermission.first_judging_permission
      );
      setValue(
        REGISTER_TYPE.SECOND_JUDGING_PERMISSION,
        userPermission.second_judging_permission
      );
    } else {
      setValue(
        REGISTER_TYPE.FIRST_JUDGING_PERMISSION,
        false
      );
      setValue(
        REGISTER_TYPE.SECOND_JUDGING_PERMISSION,
        false
      );
    }
  }, [
    watch()[REGISTER_TYPE.JUDGING_EVENT],
    userPermissions,
  ]);

  const onValid = (userInput: RegisterField) =>
    mutate(userInput);

  return (
    <>
      <h1>유저 심사권한 수정</h1>
      <Message>
        심사권한을 수정하시고, 다시 들어오면 아무런 값도
        없지만, 실제로는 수정된 값이 서버에 들어가있습니다.
      </Message>
      <Form onSubmit={handleSubmit(onValid)}>
        <ReactHookInput
          id={REGISTER_TYPE.JUDGING_EVENT}
          title="심사 행사"
          type={INPUT_TYPE.SELECT}
          register={register}
          errorMessage={
            errors[REGISTER_TYPE.JUDGING_EVENT]?.message
          }
          options={events.map((event) => {
            return {
              value: event.id,
              label: event.name,
            };
          })}
        />
        <ReactHookInput
          id={REGISTER_TYPE.FIRST_JUDGING_PERMISSION}
          title="1차 심사 권한"
          type={INPUT_TYPE.CHECKBOX}
          register={register}
          errorMessage={
            errors[REGISTER_TYPE.FIRST_JUDGING_PERMISSION]
              ?.message
          }
        />
        <ReactHookInput
          id={REGISTER_TYPE.SECOND_JUDGING_PERMISSION}
          title="2차 심사 권한"
          type={INPUT_TYPE.CHECKBOX}
          register={register}
          errorMessage={
            errors[REGISTER_TYPE.SECOND_JUDGING_PERMISSION]
              ?.message
          }
        />
        <>
          <Submit
            isvalid={!Object.keys(errors)[0]}
            disabled={isSubmitting}
          >
            수정하기
          </Submit>
        </>
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
