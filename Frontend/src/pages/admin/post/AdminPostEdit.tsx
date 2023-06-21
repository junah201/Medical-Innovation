import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import {
  getPostBoards,
  getPostById,
  updatePostById,
  uploadFile,
} from '@/api';
import { ReactHookInput } from '@/components';
import { INPUT_TYPE, REGISTER_TYPE } from '@/constants';
import { RegisterField } from '@/types';

import '@/static/css/content-styles.css';

const { VITE_CDN_URL } = import.meta.env;

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
        alert('수정되었습니다.');
      },
      onError: (err: AxiosError) => {
        alert(err?.response?.data);
      },
    }
  );

  const onValid = (userInput: RegisterField) => mutate(userInput);

  const customUploadAdapter = (loader) => {
    return {
      upload() {
        return new Promise((resolve, reject) => {
          loader.file.then((file: File) => {
            uploadFile(file)
              .then((res) => {
                resolve({
                  default: `${VITE_CDN_URL}/upload/${res.data.filename}`,
                });
              })
              .catch((err) => reject(err));
          });
        });
      },
    };
  };

  function uploadPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (
      loader
    ) => {
      return customUploadAdapter(loader);
    };
  }

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
        <CKEditor
          editor={ClassicEditor}
          data={watch()[REGISTER_TYPE.CONTENT]}
          config={{
            extraPlugins: [uploadPlugin],
            mediaEmbed: {
              previewsInData: true,
            },
            heading: {
              options: [
                {
                  model: 'paragraph',
                  view: 'p',
                  title: '본문',
                  class: 'ck-heading_paragraph',
                },
                {
                  model: 'heading1',
                  view: 'h1',
                  title: '헤더1',
                  class: 'ck-heading_heading1',
                },
                {
                  model: 'heading2',
                  view: 'h2',
                  title: '헤더2',
                  class: 'ck-heading_heading2',
                },
                {
                  model: 'heading3',
                  view: 'h3',
                  title: '헤더3',
                  class: 'ck-heading_heading3',
                },
              ],
            },
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setValue(REGISTER_TYPE.CONTENT, data);
          }}
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
