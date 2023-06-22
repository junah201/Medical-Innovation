import { FilePondFile } from 'filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import { FilePond, registerPlugin } from 'react-filepond';
import { Control, Controller } from 'react-hook-form';
import { styled } from 'styled-components';

import { InputLabel } from '@/components/form';
import { RegisterField, RegisterTypes } from '@/types';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginImageCrop,
  FilePondPluginImageTransform
);

export const FilesInput = ({
  id,
  title,
  control,
  options = {},
}: {
  id: RegisterTypes;
  title: string;
  control: Control<RegisterField, any>;
  options?: any;
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
              allowMultiple={true}
              onupdatefiles={(fileItems: FilePondFile[]) => {
                field.onChange(
                  fileItems.map((fileItem) => fileItem.file)
                );
              }}
              labelIdle='파일을 여기로 드래그하거나  <span class="filepond--label-action">찾아보기</span>'
              {...options}
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
