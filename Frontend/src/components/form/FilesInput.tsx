import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import { FilePond, registerPlugin } from 'react-filepond';
import { Control, Controller } from 'react-hook-form';
import { styled } from 'styled-components';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { REGISTER_TYPE } from '@/constants';
import { RegisterField } from '@/types';

import { FilePondFile } from 'filepond';

registerPlugin(FilePondPluginImagePreview);

export const FilesInput = ({
  control,
}: {
  control: Control<RegisterField, any>;
}) => {
  return (
    <Wrapper>
      <Controller
        control={control}
        name={REGISTER_TYPE.FILES}
        render={({ field }) => (
          <FilePond
            maxFiles={5}
            allowMultiple={true}
            onupdatefiles={(fileItems: FilePondFile[]) => {
              field.onChange(
                fileItems.map((fileItem) => fileItem.file)
              );
            }}
            labelIdle='파일을 여기로 드래그하거나  <span class="filepond--label-action">찾아보기</span>'
          />
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
