import styled from 'styled-components';

import { ERROR_MESSAGE } from '@/constants';
import { RegisterForm, RegisterTypes } from '@/types';

import { InputLabel } from '.';

interface JudgingFormProps {
  id: RegisterTypes;
  register: RegisterForm;
  title: string;
  maxValue: number;
  errorMessage: string | undefined | any;
}

export const JudgingNumberForm = ({
  id,
  register,
  title,
  maxValue,
  errorMessage,
}: JudgingFormProps) => {
  return (
    <>
      <InputLabel value="" errorMessage={errorMessage} />
      <Wrapper iserror={!!errorMessage}>
        <h3>
          {title} ({maxValue}점)
        </h3>
        <input
          {...register(id, {
            required: ERROR_MESSAGE.JUDGING_NUMBER.REQUIRED,
            min: {
              value: 0,
              message: ERROR_MESSAGE.JUDGING_NUMBER.MIN_VALUE,
            },
            max: {
              value: maxValue,
              message:
                ERROR_MESSAGE.JUDGING_NUMBER.MAX_VALUE(maxValue),
            },
          })}
          type="number"
          min={0}
          max={maxValue}
        />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div<{ iserror: boolean }>`
  display: flex;
  justify-content: space-between;
  grid-template-columns: 1fr 12fr;
  grid-gap: 10px;
  padding: 4px;
  border: solid 2px
    ${(props) =>
      props.iserror
        ? props.theme.errorColor
        : props.theme.validColor};

  & * {
    word-break: keep-all;
  }

  & > h2 {
    padding: 10px;
    grid-column: 1 / 2;
    grid-row: 1 / 6;
    writing-mode: vertical-lr;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    border-right: 1px solid silver;
    letter-spacing: 4px;
  }

  & h3 {
    padding: 6px;
  }

  & input {
    width: 100px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
  }
`;

export const JudgingNumberFormWrapper = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <Container>
      <span>{title}</span>
      <div>{children}</div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  border: 2px solid ${(props) => props.theme.validColor};

  & + & {
    margin-top: 20px;
  }

  & > span {
    text-align: center;
    writing-mode: vertical-lr;
    padding: 10px;
    font-size: 24px;
    font-weight: bold;
    border-right: 1px solid silver;
  }

  & > div {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
  }
`;
