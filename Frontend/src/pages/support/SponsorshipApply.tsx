import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { submitSponsor } from '@/api/sponsor';
import { Message } from '@/components';
import { ReactHookInput } from '@/components/form';
import { INPUT_TYPE, REGISTER_TYPE } from '@/constants';
import { Toast } from '@/libs/Toast';
import { RegisterField } from '@/types';

export const SponsorshipApply = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterField>({
    mode: 'onChange',
  });

  const { mutate } = useMutation(submitSponsor, {
    onSuccess: () => {
      navigate(-1);
    },
    onError: (err) => {
      Toast(
        '후원 신청에 실패했습니다.' +
          `${err.response.data.message || err.message}`,
        'error'
      );
    },
  });

  const onValid = (userInput: RegisterField) => mutate(userInput);

  return (
    <>
      <h1>후원하기</h1>
      <Message>
        재단법인 미래의학연구재단의 공익적 목적 사업에 동참할 것을
        약속드립니다.
      </Message>
      <div>
        <form onSubmit={handleSubmit(onValid)}>
          <ReactHookInput
            id={REGISTER_TYPE.NAME}
            title="이름 (단체명)"
            type={INPUT_TYPE.NAME}
            register={register}
            errorMessage={errors[REGISTER_TYPE.NAME]?.message}
            placeholder="미래의학연구재단"
          />
          <ReactHookInput
            id={REGISTER_TYPE.PHONE}
            title="전화번호"
            type={INPUT_TYPE.PHONE}
            register={register}
            errorMessage={errors[REGISTER_TYPE.PHONE]?.message}
            placeholder="01051671710"
          />
          <ReactHookInput
            id={REGISTER_TYPE.IDENTIFICATION_NUMBER}
            title="주민등록번호 (사업자등록번호)"
            type={INPUT_TYPE.TEXT}
            register={register}
            errorMessage={
              errors[REGISTER_TYPE.IDENTIFICATION_NUMBER]?.message
            }
            placeholder="주민등록번호 (사업자등록번호)"
          />
          <ReactHookInput
            id={REGISTER_TYPE.ADDRESS}
            title="주소 (소재지)"
            type={INPUT_TYPE.TEXT}
            register={register}
            errorMessage={errors[REGISTER_TYPE.ADDRESS]?.message}
            placeholder="주소 (소재지)"
          />
          <ReactHookInput
            id={REGISTER_TYPE.USAGE_INTENT}
            title="희망사용처"
            type={INPUT_TYPE.RADIO}
            register={register}
            errorMessage={errors[REGISTER_TYPE.USAGE_INTENT]?.message}
            placeholder="희망사용처"
            options={[
              '재단법인의 목적 사업 전체',
              '미래의학생명과학 국제교류',
              '연구 개발 지원',
              '연구자 창업 지원',
              '의학생명과학 아카데미',
              '기타유관분야 부대사업',
            ].map((option) => {
              return {
                value: option,
                label: option,
              };
            })}
          />
          <ReactHookInput
            id={REGISTER_TYPE.SPONSORSHIP_DETAIL}
            title="기부 내용"
            type={INPUT_TYPE.TEXTAREA}
            register={register}
            errorMessage={
              errors[REGISTER_TYPE.SPONSORSHIP_DETAIL]?.message
            }
            placeholder="기부 내용"
          />
          <Submit
            isvalid={!Object.keys(errors)[0]}
            disabled={isSubmitting}
          >
            제출하기
          </Submit>
        </form>
      </div>
    </>
  );
};

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
