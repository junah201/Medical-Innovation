import styled from 'styled-components';

import { RegisterForm, RegisterTypes } from '@/types';

interface GenderInputProps {
  id: RegisterTypes;
  register: RegisterForm;
  errorMessage: string | undefined | any;
}

export const GenderInput = ({
  id,
  register,
  errorMessage,
}: GenderInputProps) => {
  return (
    <Wrapper>
      <Container>
        <Input
          iserror={!!errorMessage}
          {...register(id)}
          value="남자"
          type="radio"
        />
        남자
      </Container>
      <Container>
        <Input
          iserror={!!errorMessage}
          {...register(id)}
          value="여자"
          type="radio"
        />
        여자
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Container = styled.div`
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
