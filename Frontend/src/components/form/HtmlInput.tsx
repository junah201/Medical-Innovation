import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { styled } from 'styled-components';

import { InputLabel } from '@/components/form';
import { Toast } from '@/libs/Toast';

import '@/static/css/content-styles.css';
import { uploadFile } from '@/api';

const { VITE_CDN_URL } = import.meta.env;

interface HtmlInputProps {
  title: string;
  defaultData: string;
  onChange: (data: string) => void;
  errorMessage: string | undefined | any;
}

export const HtmlInput = ({
  title,
  defaultData,
  onChange,
  errorMessage,
}: HtmlInputProps) => {
  const customUploadAdapter = (loader) => {
    return {
      upload() {
        return new Promise((resolve, reject) => {
          const data = new FormData();
          loader.file.then((file) => {
            data.append('file', file);

            uploadFile(file)
              .then((res) => {
                resolve({
                  default: `${VITE_CDN_URL}/upload/${res.data.filename}`,
                });
              })
              .catch((err) => {
                Toast(
                  `이미지 업로드 실패 ${
                    err?.response?.data?.message ||
                    err?.message ||
                    JSON.stringify(err)
                  }`,
                  'error'
                );
              });
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
      <InputLabel value={title} errorMessage={errorMessage} />
      <CKEditor
        editor={ClassicEditor}
        data={defaultData}
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
          onChange(editor.getData());
        }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
