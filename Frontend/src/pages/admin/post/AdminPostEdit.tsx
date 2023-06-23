import { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getPostBoards, getPostById, updatePostByIdV2 } from '@/api';
import { ReactHookInput, HtmlInput, FilesInput } from '@/components';
import { INPUT_TYPE, REGISTER_TYPE, ROUTE } from '@/constants';
import { Toast } from '@/libs/Toast';
import { RegisterField } from '@/types';

import '@/static/css/content-styles.css';

export const AdminPostEdit = () => {
  const { id } = useParams() as {
    id: string;
  };
  const navigate = useNavigate();

  const [boards, setBoards] = useState([]);

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
      board_id: '1',
      content: '',
      files: [],
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
      setValue(REGISTER_TYPE.FILES, res.data.files);
    },
  });

  const { mutate } = useMutation(
    (userInput) =>
      updatePostByIdV2(
        id,
        userInput?.title,
        userInput?.board_id,
        userInput?.content,
        userInput?.files
      ),
    {
      onSuccess: () => {
        Toast('수정되었습니다.', 'success');
        navigate(ROUTE.ADMIN.POST.ALL);
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
      {JSON.stringify(watch())}
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
        <HtmlInput
          title="본문"
          defaultData={watch()[REGISTER_TYPE.CONTENT]}
          onChange={(data) => setValue(REGISTER_TYPE.CONTENT, data)}
          errorMessage={errors[REGISTER_TYPE.CONTENT]?.message}
        />
        <FilesInput
          title="첨부파일"
          maxFileCount={10}
          id={REGISTER_TYPE.FILES}
          control={control}
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
