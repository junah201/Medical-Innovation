import styled from 'styled-components';

import { ERROR_MESSAGE, CONFIG } from '@/constants';
import { RegisterForm, RegisterTypes } from '@/types';

interface PhoneInputProps {
  id: RegisterTypes;
  register: RegisterForm;
  errorMessage: string | undefined | any;
  placeholder: string;
}

export const PhoneInput = ({
  id,
  register,
  errorMessage,
  placeholder,
}: PhoneInputProps) => {
  return (
    <Input
      iserror={!!errorMessage}
      {...register(id, {
        required: ERROR_MESSAGE.PHONE.REQUIRED,
        pattern: {
          value: CONFIG.PHONE.REGEX,
          message: ERROR_MESSAGE.PHONE.IS_PHONE,
        },
        minLength: {
          value: CONFIG.PHONE.MIN_LENGTH,
          message: ERROR_MESSAGE.PHONE.MIN_LENGTH,
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
