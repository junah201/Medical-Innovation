import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { uploadHistory } from '@/api';
import { HtmlInput, ReactHookInput } from '@/components/form';
import { INPUT_TYPE, REGISTER_TYPE, ROUTE } from '@/constants';
import { Toast } from '@/libs/Toast';
import { RegisterField } from '@/types';

import '@/static/css/content-styles.css';

export const AdminHistoryUpload = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<RegisterField>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const { mutate } = useMutation(
    (userInput) => {
      return uploadHistory(userInput?.title, userInput?.content);
    },
    {
      onSuccess: () => {
        Toast('업로드 완료', 'success');
        navigate(ROUTE.ADMIN.HISTORY.ALL);
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
      <h1>연혁 업로드</h1>
      <Form onSubmit={handleSubmit(onValid)}>
        <ReactHookInput
          id={REGISTER_TYPE.TITLE}
          title="제목"
          placeholder='제목을 입력해주세요. ex) "2022년"'
          type={INPUT_TYPE.TEXT}
          register={register}
          errorMessage={errors[REGISTER_TYPE.TITLE]?.message}
        />
        <HtmlInput
          title="내용"
          onChange={(e) => setValue(REGISTER_TYPE.CONTENT, e)}
          errorMessage={errors[REGISTER_TYPE.CONTENT]?.message}
          defaultData="<p>내용을 입력해주세요.</p>"
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
