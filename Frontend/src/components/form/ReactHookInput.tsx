import styled from 'styled-components';

import {
  EmailInput,
  PasswordInput,
  PasswordConfirmInput,
  NameInput,
  PhoneInput,
  BirthInput,
  InputLabel,
  GenderInput,
  TextInput,
  RadioInput,
  TextareaInput,
} from '@/components/form';
import { INPUT_TYPE } from '@/constants';
import { RegisterForm, RegisterTypes, InputTypes } from '@/types';

interface ReactHookInputProps {
  id: RegisterTypes;
  title: string;
  type: InputTypes;
  register: RegisterForm;
  errorMessage: string | undefined | any;
  placeholder?: string;
  options?: string[];
}

export const ReactHookInput = ({
  id,
  title,
  type,
  register,
  errorMessage,
  placeholder = '',
  options = [],
}: ReactHookInputProps) => {
  const content = (inputType: InputTypes) => {
    switch (inputType) {
      case INPUT_TYPE.EMAIL:
        return (
          <EmailInput
            id={id}
            register={register}
            errorMessage={errorMessage}
            placeholder={placeholder}
          />
        );
      case INPUT_TYPE.PASSWORD:
        return (
          <PasswordInput
            id={id}
            register={register}
            errorMessage={errorMessage}
            placeholder={placeholder}
          />
        );
      case INPUT_TYPE.CONFIRM_PASSWORD:
        return (
          <PasswordConfirmInput
            id={id}
            register={register}
            errorMessage={errorMessage}
            placeholder={placeholder}
          />
        );
      case INPUT_TYPE.NAME:
        return (
          <NameInput
            id={id}
            register={register}
            errorMessage={errorMessage}
            placeholder={placeholder}
          />
        );
      case INPUT_TYPE.PHONE:
        return (
          <PhoneInput
            id={id}
            register={register}
            errorMessage={errorMessage}
            placeholder={placeholder}
          />
        );
      case INPUT_TYPE.BIRTH:
        return (
          <BirthInput
            id={id}
            register={register}
            errorMessage={errorMessage}
            placeholder={placeholder}
          />
        );
      case INPUT_TYPE.GENDER:
        return (
          <GenderInput
            id={id}
            register={register}
            errorMessage={errorMessage}
          />
        );
      case INPUT_TYPE.TEXT:
        return (
          <TextInput
            id={id}
            register={register}
            errorMessage={errorMessage}
            placeholder={placeholder}
          />
        );
      case INPUT_TYPE.RADIO:
        return (
          <RadioInput
            id={id}
            register={register}
            errorMessage={errorMessage}
            options={options}
          />
        );
      case INPUT_TYPE.TEXTAREA:
        return (
          <TextareaInput
            id={id}
            register={register}
            errorMessage={errorMessage}
            placeholder={placeholder}
          />
        );
    }
  };

  return (
    <Wrapper>
      <InputLabel value={title} errorMessage={errorMessage} />
      {content(type)}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
