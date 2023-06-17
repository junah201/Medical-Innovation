import styled from 'styled-components';
import { INPUT_TYPE } from '@/constants';
import { RegisterForm, InputTypes } from '@/types';
import { EmailInput, PasswordInput, InputLabel } from '@/components/form';

export const ReactHookInput = ({
  type,
  register,
  errorMessage,
  placeholder,
}: {
  type: InputTypes;
  register: RegisterForm;
  errorMessage: string | undefined | any;
  placeholder: string;
}) => {
  const content = (inputType: InputTypes) => {
    switch (inputType) {
      case INPUT_TYPE.EMAIL:
        return (
          <EmailInput register={register} errorMessage={errorMessage} placeholder={placeholder} />
        );
      case INPUT_TYPE.PASSWORD:
        return (
          <PasswordInput
            register={register}
            errorMessage={errorMessage}
            placeholder={placeholder}
          />
        );
    }
  };

  return (
    <Wrapper>
      <>
        <InputLabel value={type} errorMessage={errorMessage} />
        {content(type)}
      </>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
