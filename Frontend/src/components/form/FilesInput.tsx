import { FilePondFile } from 'filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import { FilePond, registerPlugin } from 'react-filepond';
import { Control, Controller } from 'react-hook-form';
import { styled } from 'styled-components';

import { InputLabel } from '@/components/form';
import { RegisterField, RegisterTypes } from '@/types';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginImagePreview);

export const FilesInput = ({
  id,
  title,
  control,
  maxFiles = 5,
}: {
  id: RegisterTypes;
  title: string;
  control: Control<RegisterField, any>;
  maxFiles?: number;
}) => {
  return (
    <Wrapper>
      <InputLabel value={title} errorMessage="" />
      <Controller
        control={control}
        name={id}
        render={({ field }) => (
          <>
            <FilePond
              maxFiles={maxFiles}
              allowMultiple={true}
              onupdatefiles={(fileItems: FilePondFile[]) => {
                field.onChange(
                  fileItems.map((fileItem) => fileItem.file)
                );
              }}
              labelIdle='파일을 여기로 드래그하거나  <span class="filepond--label-action">찾아보기</span>'
            />
          </>
        )}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 30px 0;
`;
