import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getPublicEventById, updatePublicEventById } from '@/api';
import {
  ReactHookInput,
  FilesInput,
  HtmlInput,
} from '@/components/form';
import { INPUT_TYPE, REGISTER_TYPE, ROUTE } from '@/constants';
import { Toast } from '@/libs/Toast';
import { RegisterField } from '@/types';

import '@/static/css/content-styles.css';

export const AdminPublicEventEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setValue,
    watch,
  } = useForm<RegisterField>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      english_name: '',
      description: '행사 설명을 입력해주세요.',
      file: [],
      start_date: '2000-01-01',
      end_date: '2023-01-01',
      join_start_date: '2000-01-01',
      join_end_date: '2023-01-01',
    },
  });

  useEffect(() => {
    async function initLoad() {
      const res = await getPublicEventById(id);
      setValue(REGISTER_TYPE.NAME, res.data.name);
      setValue(REGISTER_TYPE.ENGLISH_NAME, res.data.english_name);
      setValue(REGISTER_TYPE.DESCRIPTION, res.data.description);
      setValue(REGISTER_TYPE.START_DATA, res.data.start_date);
      setValue(REGISTER_TYPE.END_DATE, res.data.end_date);
      setValue(
        REGISTER_TYPE.JOIN_START_DATE,
        res.data.join_start_date
      );
      setValue(REGISTER_TYPE.JOIN_END_DATE, res.data.join_end_date);
      setValue(REGISTER_TYPE.FILE, [res.data.thumbnail_filename]);
    }

    initLoad();
  }, []);

  const { mutate } = useMutation(
    (userInput) => {
      if (!userInput?.file[0]) {
        throw Error('행사 이미지를 업로드해주세요.');
      }
      return updatePublicEventById(
        id,
        userInput?.name,
        userInput?.english_name,
        userInput?.description,
        userInput?.file[0],
        userInput?.start_date,
        userInput?.end_date,
        userInput?.join_start_date,
        userInput?.join_end_date
      );
    },
    {
      onSuccess: () => {
        Toast('업로드 완료', 'success');
        navigate(ROUTE.ADMIN.PUBLIC_EVENT.ALL);
      },
      onError: (err: AxiosError) => {
        Toast(
          `업로드에 실패했습니다. ${
            err?.response?.data?.message || err.message
          }`,
          'error'
        );
      },
    }
  );

  const onValid = (userInput: RegisterField) => mutate(userInput);
  return (
    <Wrapper>
      <h1>공개 행사 수정</h1>
      <Form onSubmit={handleSubmit(onValid)}>
        <ReactHookInput
          id={REGISTER_TYPE.NAME}
          title="행사명"
          placeholder='행사명을 입력해주세요. ex) "플레이데이터"'
          type={INPUT_TYPE.TEXT}
          register={register}
          errorMessage={errors[REGISTER_TYPE.NAME]?.message}
        />
        <ReactHookInput
          id={REGISTER_TYPE.ENGLISH_NAME}
          title="행사명 (영문)"
          placeholder='영문 행사명을 입력해주세요. ex) "playdata"'
          type={INPUT_TYPE.TEXT}
          register={register}
          errorMessage={errors[REGISTER_TYPE.ENGLISH_NAME]?.message}
        />
        <HtmlInput
          title="행사 설명"
          onChange={(e) => setValue(REGISTER_TYPE.DESCRIPTION, e)}
          errorMessage={errors[REGISTER_TYPE.DESCRIPTION]?.message}
          defaultData={watch()[REGISTER_TYPE.DESCRIPTION]}
        />
        <ReactHookInput
          id={REGISTER_TYPE.START_DATA}
          title="행사 시작일"
          type={INPUT_TYPE.DATE}
          register={register}
          errorMessage={errors[REGISTER_TYPE.START_DATA]?.message}
        />
        <ReactHookInput
          id={REGISTER_TYPE.END_DATE}
          title="행사 종료일"
          type={INPUT_TYPE.DATE}
          register={register}
          errorMessage={errors[REGISTER_TYPE.END_DATE]?.message}
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
        <FilesInput
          id={REGISTER_TYPE.FILE}
          title="행사 이미지"
          control={control}
          maxFileCount={1}
          acceptFileType="image/*"
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
