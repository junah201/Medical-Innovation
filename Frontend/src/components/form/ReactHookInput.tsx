import { useController } from 'react-hook-form';
import styled from 'styled-components';

import {
  EmailInput,
  PasswordInput,
  PasswordConfirmInput,
  NameInput,
  PhoneInput,
  DateInput,
  InputLabel,
  GenderInput,
  TextInput,
  RadioInput,
  TextareaInput,
  FileInput,
  SelectInput,
  CheckboxInput,
} from '@/components/form';
import { INPUT_TYPE } from '@/constants';
import { RegisterForm, RegisterTypes, InputTypes } from '@/types';

interface Option {
  value: string | number;
  label: string | number;
}

interface ReactHookInputProps {
  id: RegisterTypes;
  title: string;
  type: InputTypes;
  register: RegisterForm;
  errorMessage: string | undefined | any;
  placeholder?: string;
  options?: Option[];
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
      case INPUT_TYPE.DATE:
        return (
          <DateInput
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
      case INPUT_TYPE.FILE:
        return (
          <FileInput
            id={id}
            register={register}
            errorMessage={errorMessage}
          />
        );
      case INPUT_TYPE.SELECT:
        return (
          <SelectInput
            id={id}
            register={register}
            errorMessage={errorMessage}
            options={options}
            placeholder={placeholder}
          />
        );
      case INPUT_TYPE.CHECKBOX:
        return (
          <CheckboxInput
            id={id}
            register={register}
            errorMessage={errorMessage}
          />
        );
    }
  };

  return (
    <Wrapper type={type}>
      <InputLabel value={title} errorMessage={errorMessage} />
      {content(type)}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ type: string }>`
  width: 100%;
  display: flex;
  flex-direction: ${(props) =>
    props.type === INPUT_TYPE.CHECKBOX ? 'row' : 'column'};
`;
