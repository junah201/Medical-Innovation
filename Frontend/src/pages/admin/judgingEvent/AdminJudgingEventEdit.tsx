import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getJudgingEventById, updateJudgingEventById } from '@/api';
import {
  ReactHookInput,
  HtmlInput,
  FilesInput,
} from '@/components/form';
import { INPUT_TYPE, REGISTER_TYPE, ROUTE } from '@/constants';
import { Toast } from '@/libs/Toast';
import { RegisterField } from '@/types';

import '@/static/css/content-styles.css';

export const AdminJudgingEventEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    control,
  } = useForm<RegisterField>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      description: '행사 설명을 입력해주세요.',
      join_start_date: '2000-01-01',
      join_end_date: '2023-01-01',
      judging_1st_start_date: '2000-01-01',
      judging_1st_end_date: '2023-01-01',
      judging_2nd_start_date: '2000-01-01',
      judging_2nd_end_date: '2023-01-01',
      file: [],
    },
  });

  useEffect(() => {
    async function initLoad() {
      const res = await getJudgingEventById(id);

      setValue(REGISTER_TYPE.NAME, res.data.name);
      setValue(REGISTER_TYPE.DESCRIPTION, res.data.description);
      setValue(
        REGISTER_TYPE.JOIN_START_DATE,
        res.data.join_start_date
      );
      setValue(REGISTER_TYPE.JOIN_END_DATE, res.data.join_end_date);
      setValue(
        REGISTER_TYPE.JUDGING_1SH_START_DATE,
        res.data.judging_1st_start_date
      );
      setValue(
        REGISTER_TYPE.JUDGING_1SH_END_DATE,
        res.data.judging_1st_end_date
      );
      setValue(
        REGISTER_TYPE.JUDGING_2ND_START_DATE,
        res.data.judging_2nd_start_date
      );
      setValue(
        REGISTER_TYPE.JUDGING_2ND_END_DATE,
        res.data.judging_2nd_end_date
      );
      setValue(REGISTER_TYPE.FILE, [res.data.thumbnail_filename]);
    }

    initLoad();
  }, []);

  const { mutate } = useMutation(
    (userInput) => {
      if (!userInput?.file[0]) {
        throw new Error('파일을 업로드해주세요.');
      }

      return updateJudgingEventById(
        id,
        userInput?.name,
        userInput?.description,
        userInput?.join_start_date,
        userInput?.join_end_date,
        userInput?.judging_1st_start_date,
        userInput?.judging_1st_end_date,
        userInput?.judging_2nd_start_date,
        userInput?.judging_2nd_end_date,
        userInput?.file[0]
      );
    },
    {
      onSuccess: () => {
        Toast('업로드 완료', 'success');
        navigate(ROUTE.ADMIN.JUDGING_EVENT.ALL);
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
      <h1>심사 행사 생성</h1>
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
          defaultData={watch()[REGISTER_TYPE.DESCRIPTION]}
          onChange={(e) => setValue(REGISTER_TYPE.DESCRIPTION, e)}
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
        <ReactHookInput
          id={REGISTER_TYPE.JUDGING_1SH_START_DATE}
          title="1차 심사 시작일"
          type={INPUT_TYPE.DATE}
          register={register}
          errorMessage={
            errors[REGISTER_TYPE.JOIN_START_DATE]?.message
          }
        />
        <ReactHookInput
          id={REGISTER_TYPE.JUDGING_1SH_END_DATE}
          title="1차 심사 종료일"
          type={INPUT_TYPE.DATE}
          register={register}
          errorMessage={
            errors[REGISTER_TYPE.JOIN_START_DATE]?.message
          }
        />
        <ReactHookInput
          id={REGISTER_TYPE.JUDGING_2ND_END_DATE}
          title="2차 심사 시작일"
          type={INPUT_TYPE.DATE}
          register={register}
          errorMessage={
            errors[REGISTER_TYPE.JOIN_START_DATE]?.message
          }
        />
        <ReactHookInput
          id={REGISTER_TYPE.JUDGING_2ND_END_DATE}
          title="2차 심사 종료일"
          type={INPUT_TYPE.DATE}
          register={register}
          errorMessage={
            errors[REGISTER_TYPE.JOIN_START_DATE]?.message
          }
        />
        <FilesInput
          id={REGISTER_TYPE.FILE}
          title="행사 썸네일 파일"
          control={control}
          maxFileCount={1}
          acceptFileType="image/*"
        />
        <Submit
          isvalid={!Object.keys(errors)[0]}
          disabled={isSubmitting}
        >
          생성하기
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
