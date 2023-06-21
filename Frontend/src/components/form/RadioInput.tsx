import styled from 'styled-components';

import { ERROR_MESSAGE } from '@/constants';
import { RegisterForm, RegisterTypes } from '@/types';

interface Option {
  value: string | number;
  label: string | number;
}

interface RadioInputProps {
  id: RegisterTypes;
  register: RegisterForm;
  errorMessage: string | undefined | any;
  options: Option[];
}

export const RadioInput = ({
  id,
  register,
  errorMessage,
  options,
}: RadioInputProps) => {
  return (
    <Wrapper>
      {options.map((option) => {
        return (
          <>
            <Container>
              <Input
                iserror={!!errorMessage}
                {...register(id, {
                  required: ERROR_MESSAGE.RADIO.REQUIRED,
                })}
                value={option.value}
                type="radio"
              />
              {option.label}
            </Container>
            <br />
          </>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 10px;
  font-size: 18px;
  font-weight: 600;
`;

const Input = styled.input<{ iserror: boolean }>`
  padding: 8px;

  transition: ${({ theme }) => theme.transitionOption};
  background: ${({ theme }) => theme.loginBackgroundColor};
  :focus {
    outline: none;
  }

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: solid 2px
    ${(props) =>
      props.iserror
        ? props.theme.errorColor
        : props.theme.validColor};
  margin-right: 8px;
  transition: background-color 0.15s ease-in-out;

  &:checked {
    background-color: ${({ theme }) => theme.validColor};
  }
`;
