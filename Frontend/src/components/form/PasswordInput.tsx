import styled from 'styled-components';

import { REGISTER_TYPE, ERROR_MESSAGE, CONFIG } from '@/constants';
import { RegisterForm } from '@/types';

export const PasswordInput = ({
  register,
  errorMessage,
  placeholder,
}: {
  register: RegisterForm;
  errorMessage: string | undefined | any;
  placeholder: string;
}) => {
  return (
    <Input
      iserror={!!errorMessage}
      {...register(REGISTER_TYPE.PASSWORD, {
        required: ERROR_MESSAGE.PASSWORD.REQUIRED,
        minLength: {
          value: CONFIG.PASSWORD.MIN_LENGTH,
          message: ERROR_MESSAGE.PASSWORD.MIN_LENGTH,
        },
        maxLength: {
          value: CONFIG.PASSWORD.MAX_LENGTH,
          message: ERROR_MESSAGE.PASSWORD.MAX_LENGTH,
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
  border: solid 2px ${(props) => (props.iserror ? props.theme.errorColor : props.theme.validColor)};
  transition: ${({ theme }) => theme.transitionOption};
  background: ${({ theme }) => theme.loginBackgroundColor};
  :focus {
    outline: none;
  }
`;
