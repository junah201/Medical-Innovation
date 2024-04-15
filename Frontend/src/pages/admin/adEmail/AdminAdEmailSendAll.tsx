import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import { sendAdEmailAll } from '@/api';
import { Message } from '@/components';
import {
  ReactHookInput,
  HtmlInput,
  FilesInput,
} from '@/components/form';
import {
  INPUT_TYPE,
  REGISTER_TYPE,
  ROUTE,
} from '@/constants';
import {
  AlertSendAdEmailAll,
  AlertSendAdEmailOne,
} from '@/libs/Alert';
import { Toast } from '@/libs/Toast';
import { RegisterField } from '@/types';

export const AdminAdEmailSendAll = () => {
  const navigate = useNavigate();

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    control,
  } = useForm<RegisterField>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      content: '',
      email: 'name@domain.com',
      file: [],
    },
  });

  const { mutate } = useMutation(
    (userInput) => {
      return sendAdEmailAll(
        userInput[REGISTER_TYPE.TITLE],
        userInput[REGISTER_TYPE.CONTENT],
        userInput[REGISTER_TYPE.FILE]
      );
    },
    {
      onSuccess: () => {
        Toast('전송 완료', 'success');
        navigate(ROUTE.ADMIN.AD_EMAIL.ALL);
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

  const onValid = (userInput: RegisterField) =>
    mutate(userInput);

  return (
    <>
      <h1>광고 수신 이메일</h1>
      <Message>
        수신 동의를 한 모두에게 이메일을 전송합니다. 중간에
        취소 불가능하니 주의해주세요.
      </Message>
      <Form>
        <ReactHookInput
          id={REGISTER_TYPE.TITLE}
          title="제목"
          placeholder="제목"
          type={INPUT_TYPE.TEXT}
          register={register}
          errorMessage={
            errors[REGISTER_TYPE.TITLE]?.message
          }
        />
        <HtmlInput
          title="내용"
          errorMessage={
            errors[REGISTER_TYPE.CONTENT]?.message
          }
          onChange={(value) =>
            setValue(REGISTER_TYPE.CONTENT, value)
          }
          defaultData=""
        />
        <FilesInput
          id={REGISTER_TYPE.FILE}
          title="첨부파일"
          maxFileCount={10}
          control={control}
        />
        <ReactHookInput
          id={REGISTER_TYPE.EMAIL}
          title="테스트 이메일"
          placeholder="테스트 이메일"
          type={INPUT_TYPE.EMAIL}
          register={register}
          errorMessage={
            errors[REGISTER_TYPE.EMAIL]?.message
          }
        />
        <Submit
          isvalid={!Object.keys(errors)[0]}
          disabled={isSubmitting}
          onClick={() => {
            AlertSendAdEmailOne(
              watch(REGISTER_TYPE.TITLE),
              watch(REGISTER_TYPE.CONTENT),
              watch(REGISTER_TYPE.FILE),
              watch(REGISTER_TYPE.EMAIL)
            );
          }}
        >
          테스트 이메일 보내기
        </Submit>
        <Submit
          isvalid={!Object.keys(errors)[0]}
          disabled={isSubmitting}
          onClick={() => {
            AlertSendAdEmailAll(
              watch(REGISTER_TYPE.TITLE),
              watch(REGISTER_TYPE.CONTENT),
              watch(REGISTER_TYPE.FILE)
            );
          }}
        >
          전체 이메일 보내기
        </Submit>
      </Form>
    </>
  );
};

const Form = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0;

  & .ck-editor {
    width: 100%;
  }

  & .ck-editor__editable_inline {
    min-height: 600px;
  }
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
