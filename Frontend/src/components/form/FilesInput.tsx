import { useRef } from 'react';
import {
  Controller,
  Control,
} from 'react-hook-form';
import { styled } from 'styled-components';

import {
  deleteFileV2,
  uploadFileV2,
} from '@/api';
import { InputLabel } from '@/components/form';
import {
  RegisterField,
  RegisterTypes,
} from '@/types';

const { VITE_CDN_URL } = import.meta.env;

export const FilesInput = ({
  title,
  control,
  id,
  acceptFileType = '*',
  disableRemove = false,
}: {
  title: string;
  control: Control<RegisterField, any>;
  id: RegisterTypes;
  acceptFileType?: string;
  disableRemove?: boolean;
}) => {
  const uploader = useRef<HTMLInputElement>();

  return (
    <Warpper>
      <InputLabel value={title} errorMessage="" />
      <Controller
        name={id}
        control={control}
        render={({
          field: { onChange, value },
        }) => (
          <Container>
            <UploadFill
              onClick={() => {
                uploader?.current?.click();
              }}
            >
              <input
                type="file"
                ref={uploader}
                accept={acceptFileType}
                onChange={(e) => {
                  if (e.target.files) {
                    if (!e.target.files[0])
                      return;

                    uploadFileV2(
                      Array.from(e.target.files)
                    ).then((res) => {
                      onChange([
                        ...value,
                        ...res.data,
                      ]);
                    });
                  }
                }}
                style={{ display: 'none' }}
              />
              이곳을 눌러 파일을 업로드하세요.
            </UploadFill>
            {value && (
              <UploadFilesWarpper>
                {value.map((file) => (
                  <UploadFile key={file}>
                    <a
                      href={`${VITE_CDN_URL}/upload/${file}`}
                    >
                      {file}
                    </a>
                    {!disableRemove && (
                      <CloseButton
                        onClick={(e) => {
                          e.preventDefault();
                          deleteFileV2(file).then(
                            (res) => {
                              onChange(
                                value.filter(
                                  (prevFile) =>
                                    prevFile !==
                                    file
                                )
                              );
                            }
                          );
                        }}
                      >
                        X
                      </CloseButton>
                    )}
                  </UploadFile>
                ))}
              </UploadFilesWarpper>
            )}
          </Container>
        )}
      />
    </Warpper>
  );
};

const Warpper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 0.5em;
  transition: ${({ theme }) =>
    theme.transitionOption};
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
  transition: ${({ theme }) =>
    theme.transitionOption};
`;

const UploadFile = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  width: 100%;
  height: 50px;
  border: 1px solid
    ${({ theme }) => theme.pointColor};
  background-color: #767b8b;
  border-radius: 0.5em;
  color: white;
  text-align: left;
  transition: ${({ theme }) =>
    theme.transitionOption};

  & + & {
    margin-top: 10px;
  }

  & a {
    color: white;
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

  & a:hover {
    text-decoration: underline;
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
