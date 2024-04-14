import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  FormControl,
  FormHelperText,
  FormLabel,
} from '@mui/material';

import { uploadFile } from '@/api';
import { Toast } from '@/libs/Toast';
import { AxiosErr } from '@/types';

import '@/static/css/content-styles.css';
const { VITE_CDN_URL } = import.meta.env;

interface HtmlInputProps {
  name: string;
  label: string;
  value: string;
  onChange: (...event: any[]) => void;
  placeholader: string;
  errorMessage: string | undefined;
  helperText: string | undefined;
  disabled: boolean;
}

export const HtmlInput = ({
  name,
  label,
  value,
  onChange,
  placeholader,
  errorMessage,
  helperText,
  disabled,
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
              .catch((err: AxiosErr) => {
                Toast(
                  `이미지 업로드 실패 ${
                    err?.response?.data
                      ?.message ||
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
    editor.plugins.get(
      'FileRepository'
    ).createUploadAdapter = (loader) => {
      return customUploadAdapter(loader);
    };
  }

  return (
    <FormControl
      sx={{
        '& .ck-editor': {
          width: '100%',
        },
        '& .ck-editor__editable_inline': {
          minHeight: '400px',
        },
      }}
    >
      <FormLabel id={name}>{label}</FormLabel>
      <CKEditor
        editor={ClassicEditor}
        data={value}
        disabled={disabled}
        config={{
          placeholder: placeholader,
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
      <FormHelperText
        error={Boolean(errorMessage)}
      >
        {errorMessage || helperText}
      </FormHelperText>
    </FormControl>
  );
};
