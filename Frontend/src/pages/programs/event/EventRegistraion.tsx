import { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getPublicEventById } from '@/api';
import { submitPublicEvnet } from '@/api/PublicParticipant';
import { Message, PostContent } from '@/components';
import { ReactHookInput } from '@/components/form';
import { INPUT_TYPE, REGISTER_TYPE } from '@/constants';
import { PublicEvent, RegisterField } from '@/types';

export const EventRegistration = () => {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };

  const [eventDetail, setEventDetail] = useState<PublicEvent>();

  useQuery({
    queryKey: 'public_event',
    queryFn: () => getPublicEventById(id),
    onSuccess: (res: AxiosResponse) => {
      setEventDetail(res.data);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterField>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      english_name: '',
      gender: '남자',
      birth: '2000-01-01',
      phone: '',
      email: '',
      organization_type: '공공기관',
      organization_name: '',
      organization_english_name: '',
      job_position: '',
      address: '',
      final_degree: '학사 과정 중',
      engagement_type: '현장 참가',
      participant_motivation: '',
      participant_type: '',
      interest_disease: '',
      interest_field: '연구분야',
      interest_field_detail: '',
    },
  });

  const { mutate } = useMutation(
    (userInput) => submitPublicEvnet(id, userInput),
    {
      onSuccess: () => {
        navigate(-1);
      },
      onError: (err: AxiosError) => {
        alert(`제출에 실패했습니다. ${err?.response?.data?.message}`);
      },
    }
  );

  const onValid = (userInput: RegisterField) => mutate(userInput);

  return (
    <>
      <h1>참가 신청</h1>
      <Message>
        {eventDetail && (
          <PostContent content={eventDetail?.description} />
        )}
      </Message>
      <Form onSubmit={handleSubmit(onValid)}>
        <ReactHookInput
          id={REGISTER_TYPE.NAME}
          title="이름"
          type={INPUT_TYPE.NAME}
          register={register}
          errorMessage={errors[REGISTER_TYPE.NAME]?.message}
          placeholder="홍길동"
        />
        <ReactHookInput
          id={REGISTER_TYPE.ENGLISH_NAME}
          title="영문 이름"
          type={INPUT_TYPE.NAME}
          register={register}
          errorMessage={errors[REGISTER_TYPE.ENGLISH_NAME]?.message}
          placeholder="Hong Gil Dong"
        />
        <ReactHookInput
          id={REGISTER_TYPE.GENDER}
          title="성별"
          type={INPUT_TYPE.GENDER}
          register={register}
          errorMessage={errors[REGISTER_TYPE.GENDER]?.message}
          placeholder=""
        />
        <ReactHookInput
          id={REGISTER_TYPE.BIRTH}
          title="생년월일"
          type={INPUT_TYPE.BIRTH}
          register={register}
          errorMessage={errors[REGISTER_TYPE.BIRTH]?.message}
          placeholder="2000-01-01"
        />
        <ReactHookInput
          id={REGISTER_TYPE.PHONE}
          title="전화번호"
          type={INPUT_TYPE.PHONE}
          register={register}
          errorMessage={errors[REGISTER_TYPE.PHONE]?.message}
          placeholder="01012345678"
        />
        <ReactHookInput
          id={REGISTER_TYPE.EMAIL}
          title="이메일"
          type={INPUT_TYPE.EMAIL}
          register={register}
          errorMessage={errors[REGISTER_TYPE.EMAIL]?.message}
          placeholder="medical@innovation.or.kr"
        />
        <ReactHookInput
          id={REGISTER_TYPE.INTEREST_FIELD}
          title="분야"
          type={INPUT_TYPE.RADIO}
          register={register}
          errorMessage={errors[REGISTER_TYPE.INTEREST_FIELD]?.message}
          options={[
            '연구분야',
            '의료기기산업분야',
            '일반',
            '제약분야',
            '기타',
          ].map((option) => {
            return {
              value: option,
              label: option,
            };
          })}
        />
        <ReactHookInput
          id={REGISTER_TYPE.INTEREST_FIELD_DETAIL}
          title="세부분야"
          type={INPUT_TYPE.TEXT}
          register={register}
          errorMessage={
            errors[REGISTER_TYPE.INTEREST_FIELD_DETAIL]?.message
          }
        />
        <ReactHookInput
          id={REGISTER_TYPE.ORGANIZATION_TYPE}
          title="소속"
          type={INPUT_TYPE.RADIO}
          register={register}
          errorMessage={
            errors[REGISTER_TYPE.ORGANIZATION_TYPE]?.message
          }
          options={[
            '공공기관',
            '대학 및 연구소',
            '산업체',
            '의료기관',
            '정부',
            '기타',
          ].map((option) => {
            return {
              value: option,
              label: option,
            };
          })}
        />
        <ReactHookInput
          id={REGISTER_TYPE.ORGANIZATION_NAME}
          title="소속기관명"
          type={INPUT_TYPE.TEXT}
          register={register}
          errorMessage={
            errors[REGISTER_TYPE.ORGANIZATION_NAME]?.message
          }
          placeholder="소속기관명"
        />
        <ReactHookInput
          id={REGISTER_TYPE.ORGANIZATION_ENGLISH_NAME}
          title="소속기관명 (영문)"
          type={INPUT_TYPE.TEXT}
          register={register}
          errorMessage={
            errors[REGISTER_TYPE.ORGANIZATION_ENGLISH_NAME]?.message
          }
          placeholder="소속기관명 (영문)"
        />
        <ReactHookInput
          id={REGISTER_TYPE.JOB_POSITION}
          title="소속기관 직위"
          type={INPUT_TYPE.TEXT}
          register={register}
          errorMessage={errors[REGISTER_TYPE.JOB_POSITION]?.message}
          placeholder="ex) 전공의, 과장"
        />
        <ReactHookInput
          id={REGISTER_TYPE.ADDRESS}
          title="소재지"
          type={INPUT_TYPE.TEXT}
          register={register}
          errorMessage={errors[REGISTER_TYPE.ADDRESS]?.message}
          placeholder="서울특별시 강남구"
        />
        <ReactHookInput
          id={REGISTER_TYPE.FINAL_DEGREE}
          title="(최종)학위과정"
          type={INPUT_TYPE.RADIO}
          register={register}
          errorMessage={errors[REGISTER_TYPE.FINAL_DEGREE]?.message}
          options={[
            '학사 과정 중',
            '학사 수료',
            '석사 과정 중',
            '석사 수료',
            '박사 과정 중',
            '박사 수료',
            '석,박사 통합 과정 중',
            '석,박사 통합 과정 수료',
            '전문학사 수료',
            '기타',
          ].map((option) => {
            return {
              value: option,
              label: option,
            };
          })}
        />
        <ReactHookInput
          id={REGISTER_TYPE.ENGAGEMENT_TYPE}
          title="행사 참여 방식"
          type={INPUT_TYPE.RADIO}
          register={register}
          errorMessage={
            errors[REGISTER_TYPE.ENGAGEMENT_TYPE]?.message
          }
          options={['현장 참가', '유튜브 라이브 시청', '기타'].map(
            (option) => {
              return {
                value: option,
                label: option,
              };
            }
          )}
        />
        <ReactHookInput
          id={REGISTER_TYPE.PARTICIPANT_MOTIVATION}
          title="참여 동기"
          type={INPUT_TYPE.TEXT}
          register={register}
          errorMessage={
            errors[REGISTER_TYPE.PARTICIPANT_MOTIVATION]?.message
          }
          placeholder="지인 추천"
        />
        <ReactHookInput
          id={REGISTER_TYPE.PARTICIPANT_TYPE}
          title="기술 구분"
          type={INPUT_TYPE.TEXT}
          register={register}
          errorMessage={
            errors[REGISTER_TYPE.PARTICIPANT_TYPE]?.message
          }
          placeholder="기술 구분"
        />
        <ReactHookInput
          id={REGISTER_TYPE.INTEREST_DISEASE}
          title="타겟 질환 / 범위"
          type={INPUT_TYPE.TEXT}
          register={register}
          errorMessage={
            errors[REGISTER_TYPE.INTEREST_DISEASE]?.message
          }
          placeholder="타겟 질환 / 범위"
        />
        <Button
          isvalid={!Object.keys(errors)[0]}
          disabled={isSubmitting}
        >
          제출하기
        </Button>
      </Form>
    </>
  );
};

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0;
`;

const Button = styled.button<{ isvalid: boolean }>`
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
