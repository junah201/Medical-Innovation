import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { uploadAdvisorV2 } from '@/api';
import { FilepondSingleInput } from '@/components';
import { ReactHookInput } from '@/components/form';
import { INPUT_TYPE, REGISTER_TYPE, ROUTE } from '@/constants';
import { Toast } from '@/libs/Toast';
import { RegisterField } from '@/types';

import '@/static/css/content-styles.css';

export const AdminAdvisorUpload = () => {
  const navigate = useNavigate();

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<RegisterField>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      type: '',
      description: '',
      filename: '',
    },
  });

  const { mutate } = useMutation(
    (userInput) => {
      if (!userInput?.filename) {
        userInput.filename = 'defualt_user.png';
      }
      return uploadAdvisorV2(
        userInput?.name,
        userInput?.type,
        userInput?.description,
        userInput?.filename
      );
    },
    {
      onSuccess: () => {
        Toast('업로드 완료', 'success');
        navigate(ROUTE.ADMIN.ADVISOR.ALL);
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
      <h1>자문단 업로드</h1>
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
        <FilepondSingleInput
          title="프로필 이미지"
          id={REGISTER_TYPE.FILENAME}
          control={control}
          options={{
            acceptedFileTypes: ['image/*'],
            labelIdle: '프로필 이미지를 업로드해주세요.',
            allowImageCrop: true,
            imageCropAspectRatio: '3:4',
            allowImageTransform: true,
            imageResizeTargetWidth: 300,
            imageResizeTargetHeight: 400,
          }}
        />
        <Submit
          isvalid={!Object.keys(errors)[0]}
          disabled={isSubmitting}
        >
          업로드
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