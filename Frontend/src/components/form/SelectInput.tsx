import styled from 'styled-components';

import { ERROR_MESSAGE } from '@/constants';
import { RegisterForm, RegisterTypes } from '@/types';

interface SelectInputProps {
  id: RegisterTypes;
  register: RegisterForm;
  errorMessage: string | undefined | any;
  options: string[];
}

export const SelectInput = ({
  id,
  register,
  errorMessage,
  options,
}: SelectInputProps) => {
  return (
    <Wrapper>
      <Input
        {...register(id, {
          required: ERROR_MESSAGE.SELECT.REQUIRED,
        })}
        iserror={!!errorMessage}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Input>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;

const Input = styled.select<{ iserror: boolean }>`
  display: flex;
  flex-direction: row;
  font-size: 18px;
  font-weight: 600;
  padding: 15px;
  margin-bottom: 10px;
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
