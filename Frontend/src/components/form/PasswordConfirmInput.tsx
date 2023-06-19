import styled from 'styled-components';

import { REGISTER_TYPE, ERROR_MESSAGE } from '@/constants';
import { RegisterForm, RegisterField, RegisterTypes } from '@/types';

interface PasswordConfirmInputProps {
  id: RegisterTypes;
  register: RegisterForm;
  errorMessage: string | undefined | any;
  placeholder: string;
}

export const PasswordConfirmInput = ({
  id,
  register,
  errorMessage,
  placeholder,
}: PasswordConfirmInputProps) => {
  const validatePasswordConfirm = (input: string, values: RegisterField) => {
    const password = values[REGISTER_TYPE.PASSWORD];

    return input === password || ERROR_MESSAGE.CONFIRM_PASSWORD.NOT_MATCH;
  };

  return (
    <Input
      iserror={!!errorMessage}
      {...register(id, {
        required: ERROR_MESSAGE.CONFIRM_PASSWORD.REQUIRED,
        validate: {
          match: validatePasswordConfirm,
        },
      })}
      type="password"
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
      props.iserror ? props.theme.errorColor : props.theme.validColor};
  transition: ${({ theme }) => theme.transitionOption};
  background: ${({ theme }) => theme.loginBackgroundColor};
  :focus {
    outline: none;
  }
`;
