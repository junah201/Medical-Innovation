import {
  FormControl,
  FormHelperText,
  FormLabel,
} from '@mui/material';
import { useRef } from 'react';
import { styled } from 'styled-components';

import { uploadCropImage, deleteFileV2 } from '@/api';

interface CropImageInputProps {
  name: string;
  label: string;
  value: string[];
  onChange: (...event: any[]) => void;
  errorMessage: string | undefined;
  helperText: string | undefined;
  disabled: boolean;
  ratio: number;
}

export const CropImageInput = ({
  name,
  label,
  value,
  onChange,
  errorMessage,
  helperText,
  disabled,
  ratio,
}: CropImageInputProps) => {
  const uploader = useRef<HTMLInputElement>();

  return (
    <FormControl>
      <FormLabel id={name}>{label}</FormLabel>
      <Container>
        <UploadFill
          onClick={(e) => {
            uploader?.current?.click();
          }}
        >
          <input
            type="file"
            ref={uploader}
            disabled={disabled}
            onChange={(e) => {
              async function upload() {
                const res = await uploadCropImage(
                  Array.from(e.target.files),
                  ratio.toString()
                );
                onChange(res.data[0]);
              }

              if (e.target.files) {
                if (!e.target.files[0]) return;

                upload();
              }
            }}
            style={{ display: 'none' }}
          />
          이곳을 눌러 파일을 업로드하세요.
        </UploadFill>
        {value && (
          <UploadFilesWarpper>
            {[value].map((file) => (
              <UploadFile key={file}>
                <span>{file}</span>
                <CloseButton
                  onClick={(e) => {
                    e.preventDefault();
                    deleteFileV2(file).then((res) => {
                      onChange(
                        value.filter(
                          (prevFile) => prevFile !== file
                        )
                      );
                    });
                  }}
                >
                  X
                </CloseButton>
              </UploadFile>
            ))}
          </UploadFilesWarpper>
        )}
      </Container>
      <FormHelperText error={Boolean(errorMessage)}>
        {errorMessage || helperText}
      </FormHelperText>
    </FormControl>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 0.5em;
  transition: ${({ theme }) => theme.transitionOption};
  background-color: ${({ theme }) =>
    theme.loginBackgroundColor};
`;

const UploadFill = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 600;
  text-align: center;
  height: 100px;
  background-color: ${({ theme }) =>
    theme.loginBackgroundColor};
  color: ${({ theme }) => theme.pointColor};
  padding: 10px;
  border-radius: 0.5em;
`;

const UploadFilesWarpper = styled.div`
  display: flex;
  flex-direction: column;
  transition: ${({ theme }) => theme.transitionOption};
`;

const UploadFile = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  width: 100%;
  height: 50px;
  border: 1px solid ${({ theme }) => theme.pointColor};
  background-color: #767b8b;
  border-radius: 0.5em;
  color: white;
  text-align: left;
  transition: ${({ theme }) => theme.transitionOption};

  & + & {
    margin-top: 10px;
  }

  & span {
    width: 100%;
    font-size: 16px;
    height: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: brek-word;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
`;

const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  opacity: 0.3;
  border-radius: 50%;
  border: none;

  &:hover {
    opacity: 0.8;
  }

  &:before,
  &:after {
    height: 33px;
    width: 2px;
    background-color: #333;
  }

  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
`;
