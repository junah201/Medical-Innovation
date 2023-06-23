import styled from 'styled-components';

import { RegisterForm, RegisterTypes } from '@/types';

interface CheckboxInputProps {
  id: RegisterTypes;
  register: RegisterForm;
  errorMessage: string | undefined | any;
}

export const CheckboxInput = ({
  id,
  register,
  errorMessage,
}: CheckboxInputProps) => {
  return (
    <Input
      iserror={!!errorMessage}
      {...register(id)}
      type="checkbox"
    />
  );
};

const Input = styled.input<{ iserror: boolean }>`
  margin-bottom: 10px;
  margin-top: 5px;
  margin-left: 10px;
  width: 22.5px;
  height: 22.5px;
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

  &:checked {
    background: ${({ theme }) => theme.validColor};
  }
`;
