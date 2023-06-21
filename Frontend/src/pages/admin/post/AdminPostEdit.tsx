import { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getPostBoards, getPostById, updatePostById } from '@/api';
import { ReactHookInput, HtmlInput } from '@/components';
import { INPUT_TYPE, REGISTER_TYPE } from '@/constants';
import { Toast } from '@/libs/Toast';
import { RegisterField } from '@/types';

import '@/static/css/content-styles.css';

export const AdminPostEdit = () => {
  const { id } = useParams() as {
    id: string;
  };
  const [boards, setBoards] = useState([]);

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<RegisterField>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      board_id: '1',
      content: '',
    },
  });

  useQuery('boards', () => getPostBoards(0, 10000), {
    retry: false,
    onSuccess: (res) => {
      setBoards(res.data);
    },
  });

  useQuery('post', () => getPostById(id), {
    retry: false,
    onSuccess: (res) => {
      setValue(REGISTER_TYPE.TITLE, res.data.title);
      setValue(REGISTER_TYPE.BOARD_ID, res.data.board_id);
      setValue(REGISTER_TYPE.CONTENT, res.data.content);
    },
  });

  const { mutate } = useMutation(
    (userInput) =>
      updatePostById(
        id,
        userInput.title,
        userInput.board_id,
        userInput.content
      ),
    {
      onSuccess: () => {
        Toast('수정되었습니다.', 'success');
      },
      onError: (err: AxiosError) => {
        Toast(`수정에 실패했습니다. ${err?.response?.data}`, 'error');
      },
    }
  );

  const onValid = (userInput: RegisterField) => mutate(userInput);

  return (
    <Wrapper>
      <h1>게시물 수정</h1>
      <Form onSubmit={handleSubmit(onValid)}>
        <ReactHookInput
          id={REGISTER_TYPE.TITLE}
          title="제목"
          type={INPUT_TYPE.TEXT}
          register={register}
          errorMessage={errors[REGISTER_TYPE.TITLE]?.message}
        />
        <ReactHookInput
          id={REGISTER_TYPE.BOARD_ID}
          title="게시판"
          type={INPUT_TYPE.SELECT}
          register={register}
          errorMessage={errors[REGISTER_TYPE.BOARD_ID]?.message}
          options={boards.map((board) => {
            return {
              value: board.id,
              label: board.name,
            };
          })}
        />
        <br />
        <HtmlInput
          title="본문"
          defaultData={watch()[REGISTER_TYPE.CONTENT]}
          onChange={(data) => setValue(REGISTER_TYPE.CONTENT, data)}
          errorMessage={errors[REGISTER_TYPE.CONTENT]?.message}
        />
        <br />
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