import styled from 'styled-components';

import { ERROR_MESSAGE } from '@/constants';
import { RegisterForm, RegisterTypes } from '@/types';

import { InputLabel } from '.';

interface JudgingFormProps {
  id: RegisterTypes;
  register: RegisterForm;
  title: string;
  description: React.ReactNode;
  options: string[];
  errorMessage: string | undefined | any;
}

export const JudgingForm = ({
  id,
  register,
  title,
  description,
  options,
  errorMessage,
}: JudgingFormProps) => {
  return (
    <>
      <InputLabel value={title} errorMessage={errorMessage} />
      <Wrapper iserror={!!errorMessage}>
        <h2>{title}</h2>
        <h3>{description}</h3>
        <div>
          {options.map((item, index) => {
            return (
              <div key={`${item} ${index}`}>
                <input
                  {...register(id, {
                    required: ERROR_MESSAGE.RADIO.REQUIRED,
                  })}
                  value={index + 1}
                  type="radio"
                />
                <label>{item}</label>
              </div>
            );
          })}
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div<{ iserror: boolean }>`
  display: grid;
  grid-template-columns: 1fr 12fr;
  grid-gap: 10px;
  padding: 4px;
  border: 1px solid silver;
  border: solid 2px
    ${(props) =>
      props.iserror
        ? props.theme.errorColor
        : props.theme.validColor};
  margin-bottom: 10px;

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
    border: 2px solid silver;
    padding: 6px;
  }
`;
