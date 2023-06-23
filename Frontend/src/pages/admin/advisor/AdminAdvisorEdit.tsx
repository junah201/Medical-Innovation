import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getAdvisorById, updateAdvisorById } from '@/api';
import {
  ReactHookInput,
  FilesInput,
  CropImageInput,
} from '@/components/form';
import { INPUT_TYPE, REGISTER_TYPE, ROUTE } from '@/constants';
import { Toast } from '@/libs/Toast';
import { RegisterField } from '@/types';

export const AdminAdvisorEdit = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setValue,
  } = useForm<RegisterField>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      type: '',
      description: '',
      filename: [],
    },
  });

  useEffect(() => {
    async function initLoad() {
      const res = await getAdvisorById(id);
      setValue(REGISTER_TYPE.NAME, res.data.name);
      setValue(REGISTER_TYPE.TYPE, res.data.type);
      setValue(REGISTER_TYPE.DESCRIPTION, res.data.description);
      setValue(REGISTER_TYPE.FILENAME, [res.data.filename]);
    }

    initLoad();
  }, []);

  const { mutate } = useMutation(
    (userInput) => {
      if (!userInput?.filename[0]) {
        throw new Error('파일을 첨부해주세요.');
      }
      return updateAdvisorById(
        id,
        userInput?.name,
        userInput?.type,
        userInput?.description,
        userInput?.filename[0]
      );
    },
    {
      onSuccess: () => {
        Toast('수정 완료', 'success');
        navigate(ROUTE.ADMIN.ADVISOR.ALL);
      },
      onError: (err: AxiosError) => {
        Toast(
          `수정 실패했습니다. ${err?.response?.data || err.message}`,
          'error'
        );
      },
    }
  );

  const onValid = (userInput: RegisterField) => mutate(userInput);

  return (
    <Wrapper>
      <h1>자문단 수정</h1>
      {JSON.stringify(watch())}
      <Form onSubmit={handleSubmit(onValid)}>
        <ReactHookInput
          id={REGISTER_TYPE.NAME}
          title="회사명"
          placeholder='회사명을 입력해주세요. ex) "플레이데이터"'
          type={INPUT_TYPE.TEXT}
          register={register}
          errorMessage={errors[REGISTER_TYPE.NAME]?.message}
        />
        <ReactHookInput
          id={REGISTER_TYPE.TYPE}
          title="자문단 종류"
          type={INPUT_TYPE.SELECT}
          options={[
            '이사',
            '고문',
            '전문심의위원회',
            '자문위원회',
            '창업기획자 전문가그룹장',
            '창업기획자 전문가그룹 자문단',
            '칼럼니스트',
          ].map((data) => ({ value: data, label: data }))}
          register={register}
          errorMessage={errors[REGISTER_TYPE.LINK]?.message}
        />
        <ReactHookInput
          id={REGISTER_TYPE.DESCRIPTION}
          title="자문단 소개"
          placeholder="해당 자문단에 대한 소개를 , 단위로 나누어서 입력해주세요."
          type={INPUT_TYPE.TEXTAREA}
          register={register}
          errorMessage={errors[REGISTER_TYPE.DESCRIPTION]?.message}
        />
        <CropImageInput
          title="자문단 프로필 이미지"
          id={REGISTER_TYPE.FILENAME}
          control={control}
          maxFileCount={1}
          ratio={3 / 4}
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
    width: 800px;
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
