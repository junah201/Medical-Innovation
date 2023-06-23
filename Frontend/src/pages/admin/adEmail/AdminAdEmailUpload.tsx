import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { uploadAdEmail } from '@/api';
import { ReactHookInput } from '@/components/form';
import { INPUT_TYPE, REGISTER_TYPE, ROUTE } from '@/constants';
import { Toast } from '@/libs/Toast';
import { RegisterField } from '@/types';

export const AdminAdEmailUpload = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterField>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      link: '',
      file: [],
      banner_end_at: '',
    },
  });

  const { mutate } = useMutation(
    (userInput) => {
      return uploadAdEmail(
        userInput?.email,
        userInput?.othor_comment
      );
    },
    {
      onSuccess: () => {
        Toast('업로드 완료', 'success');
        navigate(ROUTE.ADMIN.AD_EMAIL.ALL);
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
      <h1>광고 수신 이메일 업로드</h1>
      <Form onSubmit={handleSubmit(onValid)}>
        <ReactHookInput
          id={REGISTER_TYPE.EMAIL}
          title="이메일"
          placeholder="이메일"
          type={INPUT_TYPE.EMAIL}
          register={register}
          errorMessage={errors[REGISTER_TYPE.EMAIL]?.message}
        />
        <ReactHookInput
          id={REGISTER_TYPE.OTHER_COMMENT}
          title="기타 정보"
          placeholder="만약 없다면 공백 하나만 입력해주세요."
          type={INPUT_TYPE.TEXT}
          register={register}
          errorMessage={errors[REGISTER_TYPE.OTHER_COMMENT]?.message}
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
