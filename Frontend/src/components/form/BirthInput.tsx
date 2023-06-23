import styled from 'styled-components';

import { ERROR_MESSAGE } from '@/constants';
import { RegisterForm, RegisterTypes } from '@/types';

interface DateInputProps {
  id: RegisterTypes;
  register: RegisterForm;
  errorMessage: string | undefined | any;
  placeholder: string;
}

export const DateInput = ({
  id,
  register,
  errorMessage,
  placeholder,
}: DateInputProps) => {
  return (
    <Input
      iserror={!!errorMessage}
      {...register(id, {
        required: ERROR_MESSAGE.DATE.REQUIRED,
      })}
      type="date"
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
