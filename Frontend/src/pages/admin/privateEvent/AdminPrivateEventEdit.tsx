import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import {
  getPrivateEventById,
  updatePrivateEventById,
  uploadPrivateEvent,
} from '@/api';
import { ReactHookInput, HtmlInput } from '@/components/form';
import { INPUT_TYPE, REGISTER_TYPE, ROUTE } from '@/constants';
import { Toast } from '@/libs/Toast';
import { RegisterField } from '@/types';

import '@/static/css/content-styles.css';
import { useEffect } from 'react';

export const AdminPrivateEventEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<RegisterField>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      description: '행사 설명을 입력해주세요.',
      join_start_date: '2000-01-01',
      join_end_date: '2023-01-01',
    },
  });

  useEffect(() => {
    async function initLoad() {
      const res = await getPrivateEventById(id);

      setValue(REGISTER_TYPE.NAME, res.data.name);
      setValue(REGISTER_TYPE.DESCRIPTION, res.data.description);
      setValue(
        REGISTER_TYPE.JOIN_START_DATE,
        res.data.join_start_date
      );
      setValue(REGISTER_TYPE.JOIN_END_DATE, res.data.join_end_date);
    }

    initLoad();
  }, []);

  const { mutate } = useMutation(
    (userInput) => {
      return updatePrivateEventById(
        id,
        userInput?.name,
        userInput?.description,
        userInput?.join_start_date,
        userInput?.join_end_date
      );
    },
    {
      onSuccess: () => {
        Toast('업로드 완료', 'success');
        navigate(ROUTE.ADMIN.PRIVATE_EVENT.ALL);
      },
      onError: (err: AxiosError) => {
        Toast(
          `업로드에 실패했습니다. ${
            err?.response?.data || err.message
          }`,
          'error'
        );
      },
    }
  );

  const onValid = (userInput: RegisterField) => mutate(userInput);
  return (
    <Wrapper>
      <h1>로그인 필수 행사 생성</h1>
      <Form onSubmit={handleSubmit(onValid)}>
        <ReactHookInput
          id={REGISTER_TYPE.NAME}
          title="행사명"
          placeholder='행사명을 입력해주세요. ex) "플레이데이터"'
          type={INPUT_TYPE.TEXT}
          register={register}
          errorMessage={errors[REGISTER_TYPE.NAME]?.message}
        />
        <HtmlInput
          title="행사 설명"
          onChange={(e) => setValue(REGISTER_TYPE.DESCRIPTION, e)}
          defaultData={watch()[REGISTER_TYPE.DESCRIPTION]}
          errorMessage={errors[REGISTER_TYPE.DESCRIPTION]?.message}
        />
        <ReactHookInput
          id={REGISTER_TYPE.JOIN_START_DATE}
          title="참여 신청 시작일"
          type={INPUT_TYPE.DATE}
          register={register}
          errorMessage={
            errors[REGISTER_TYPE.JOIN_START_DATE]?.message
          }
        />
        <ReactHookInput
          id={REGISTER_TYPE.JOIN_END_DATE}
          title="참여 신청 종료일"
          type={INPUT_TYPE.DATE}
          register={register}
          errorMessage={errors[REGISTER_TYPE.JOIN_END_DATE]?.message}
        />
        <Submit
          isvalid={!Object.keys(errors)[0]}
          disabled={isSubmitting}
        >
          수정하기
        </Submit>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  & .ck-editor {
    width: 100%;
  }

  & .ck-editor__editable_inline {
    min-height: 600px;
  }
`;

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
