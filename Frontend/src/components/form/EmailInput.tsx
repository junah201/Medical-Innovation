import styled from 'styled-components';

import { ERROR_MESSAGE, CONFIG } from '@/constants';
import { RegisterForm, RegisterTypes } from '@/types';

interface PasswordInputProps {
  id: RegisterTypes;
  register: RegisterForm;
  errorMessage: string | undefined | any;
  placeholder: string;
}

export const EmailInput = ({
  id,
  register,
  errorMessage,
  placeholder,
}: PasswordInputProps) => {
  return (
    <Input
      iserror={!!errorMessage}
      {...register(id, {
        required: ERROR_MESSAGE.EMAIL.REQUIRED,
        pattern: {
          value: CONFIG.EMAIL.REGEX,
          message: ERROR_MESSAGE.EMAIL.IS_EMAIL,
        },
      })}
      type="text"
      placeholder={placeholder}
    />
  );
};

const Input = styled.input<{ iserror: boolean }>`
  padding: 15px;
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: 600;
  border: solid 2px
    ${(props) =>
      props.iserror
        ? props.theme.errorColor
        : props.theme.validColor};
  transition: ${({ theme }) => theme.transitionOption};
  background: ${({ theme }) => theme.loginBackgroundColor};
  :focus {
    outline: none;
  }
`;
