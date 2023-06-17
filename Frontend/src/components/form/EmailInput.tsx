import styled from 'styled-components';
import { REGISTER_TYPE, ERROR_MESSAGE, CONFIG } from '@/constants';
import { RegisterForm } from '@/types';

export const EmailInput = ({
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
      isError={!!errorMessage}
      {...register(REGISTER_TYPE.EMAIL, {
        required: ERROR_MESSAGE.EMAIL.REQUIRED,
        pattern: {
          value: CONFIG.EMAIL.REGEX,
          message: ERROR_MESSAGE.EMAIL.IS_EMAIL,
        },
      })}
      type="text"
      placeholder={placeholder}
    />
  );
};

const Input = styled.input<{ isError: boolean }>`
  padding: 15px;
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: 600;
  border: solid 2px ${(props) => (props.isError ? props.theme.errorColor : props.theme.validColor)};
  border-radius: 5px;
  transition: ${({ theme }) => theme.transitionOption};
  background: ${({ theme }) => theme.loginBackground};
  :focus {
    outline: none;
  }
`;
