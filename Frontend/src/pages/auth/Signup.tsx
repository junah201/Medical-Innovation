import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

import { signup } from '@/api/auth';
import { ReactHookInput } from '@/components/form';
import {
  INPUT_TYPE,
  ROUTE,
  COOKIE,
  REGISTER_TYPE,
} from '@/constants';
import { getCookie } from '@/libs/Cookie';
import { RegisterField } from '@/types';

export const Signup = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = getCookie(COOKIE.KEY.ACCESS_TOKEN);
    if (accessToken) {
      navigate(ROUTE.HOME);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterField>({
    mode: 'onChange',
  });

  const { mutate } = useMutation(signup, {
    onSuccess: () => {
      navigate(ROUTE.LOGIN);
    },
    onError: (err: AxiosError) => {
      if (err.response?.status === 409) {
        alert('이미 가입된 이메일입니다.');
      } else {
        alert('회원가입에 실패했습니다.');
      }
    },
  });

  const onValid = (userInput: RegisterField) => mutate(userInput);

  return (
    <Wrapper>
      <Container>
        <Title>회원가입</Title>
        <Form onSubmit={handleSubmit(onValid)}>
          <ReactHookInput
            id={REGISTER_TYPE.NAME}
            title="이름"
            type={INPUT_TYPE.NAME}
            register={register}
            errorMessage={errors.name?.message}
            placeholder="홍길동"
          />
          <ReactHookInput
            id={REGISTER_TYPE.PHONE}
            title="전화번호"
            type={INPUT_TYPE.PHONE}
            register={register}
            errorMessage={errors.phone?.message}
            placeholder="01012345678"
          />
          <ReactHookInput
            id={REGISTER_TYPE.BIRTH}
            title="생년월일"
            type={INPUT_TYPE.BIRTH}
            register={register}
            errorMessage={errors.birth?.message}
            placeholder=""
          />
          <ReactHookInput
            id={REGISTER_TYPE.EMAIL}
            title="이메일"
            type={INPUT_TYPE.EMAIL}
            register={register}
            errorMessage={errors.email?.message}
            placeholder="이메일"
          />
          <ReactHookInput
            id={REGISTER_TYPE.PASSWORD}
            title="비밀번호"
            type={INPUT_TYPE.PASSWORD}
            register={register}
            errorMessage={errors.password?.message}
            placeholder="비밀번호"
          />
          <ReactHookInput
            id={REGISTER_TYPE.CONFIRM_PASSWORD}
            title="비밀번호 확인"
            type={INPUT_TYPE.CONFIRM_PASSWORD}
            register={register}
            errorMessage={errors.confirmPassword?.message}
            placeholder="비밀번호 확인"
          />
          <LoginWrapper>
            <Submit
              isvalid={!Object.keys(errors)[0]}
              disabled={isSubmitting}
            >
              회원가입
            </Submit>
          </LoginWrapper>
          <Hr />
          <Text>이미 계정이 있으신가요?</Text>
          <Link to={ROUTE.LOGIN}>로그인</Link>
        </Form>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  height: 100%;
`;

const Container = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 30px 80px;
  width: 410px;
  padding: 30px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 35px;
  font-weight: 600;
  text-align: center;
  border-left: none;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0;
`;

const LoginWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Submit = styled.button<{ isvalid: boolean }>`
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  background: ${(props) =>
    props.isvalid
      ? props.theme.pointColor
      : props.theme.loginDisabledColor};
  color: #ffffff;
  font-weight: 600;
  border: none;
  font-size: 20px;
  height: 50px;
  width: 100%;
  transition: ${({ theme }) => theme.transitionOption};
  :hover {
    cursor: pointer;
    background: ${(props) =>
      props.isvalid ? props.theme.pointColorLight : ''};
    color: ${({ theme }) => theme.background};
  }
  letter-spacing: 1px;
`;

const Hr = styled.div`
  border-bottom: solid 1px rgba(122, 122, 122, 0.5);
  margin: 25px 0 15px 0;
  width: 100%;
`;

const Text = styled.div`
  text-align: center;
  color: rgba(122, 122, 122, 0.8);
`;
